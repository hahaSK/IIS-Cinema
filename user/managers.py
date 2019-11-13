from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManagerWithUserName(BaseUserManager):
    """
    Custom user model manager for users with email and username.
    The unique identifier is email.
    """

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a User with the given email, username and password.
        """
        if not username:
            raise ValueError(_('The Username must be set'))
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email, username and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self._create_user(username, email, password, **extra_fields)
