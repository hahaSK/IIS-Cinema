from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from django.contrib.auth.models import BaseUserManager

from django.contrib.auth import get_user_model


class UserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames.
    """

    def create_user(self, email, **extra_fields):
        """
        Creates and saves a User with the given email and without
        username and password. (password is, just in case, randomly generated).
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(super().make_random_password())
        user.save()
        return user

    def create_user_with_username(self, username, email, password, **extra_fields):
        """
        Create and save a User with the given email, username and password.
        The username and email are both unique, but need to explicitly check
        uniqueness of username.
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
        return self.create_user_with_username(username, email, password, **extra_fields)


class AbstractUser(AbstractBaseUser, PermissionsMixin):
    """
    Abstract User, where only email is unique and username has to be explicitly checked
    for uniqueness
    """
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    email = models.EmailField(_('email address'), unique=True, null=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    has_username = True  # Attribute to set if user should also have username

    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=150,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()  # Basic user manager for handling users with just email

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        abstract = True

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def save(self, *args, **kwargs):
        # If the save user without username, we don't have to check for duplicity
        # and can just save.
        if not self.has_username:
            super().save()

        user = get_user_model()._default_manager.filter(email=self.email)
        if not user:
            # We are adding new user so need to check for username duplicity.
            if len(list(get_user_model()._default_manager.filter(username=self.username))) > 0:
                raise Exception("Username already exists")
            super().save()
            return
        elif user.first().username == self.username:    # If the user exists and is not changing username just save.
            # (Is updating user for example is changing password or last login).
            super().save()
            return

        # Now we know that the user exist and is changing username so we need to check for username duplicity.
        if len(list(get_user_model()._default_manager.filter(username=self.username))) > 0:
            raise Exception("Username already exists")

        super().save()
