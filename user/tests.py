from django.db import IntegrityError, transaction
from django.test import TestCase
from user.models import User
from address.models import Address


def get_test_address():
    _address = Address.objects.first()
    if _address:
        return _address
    else:
        return Address.objects.create(street1="Slavocskeho",
                                      street2="Brno-stred",
                                      houseNumber="304/2",
                                      city="Brno",
                                      psc="61200")


class UserTestCase(TestCase):
    def setUp(self):
        User.create(first_name='Anca', last_name='Zarku',
                    email="fightingspirit@1420.bc",
                    date_of_birth="1944-09-28",
                    password="1234", username="Anicka", role=User.REDACTOR)
        User.create(first_name='Peter', last_name='Saigu',
                    email="saigu@gmail.com",
                    date_of_birth="1944-09-28",
                    password="1234", username="Saigu", role=User.VIEWER)

    def test_user_creation(self):
        user = User.objects.get(first_name="Anca")
        self.assertEqual(user.last_name, "Zarku")
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.username, "Anicka")
        self.assertEqual(user.role, User.REDACTOR)

        user = User.objects.get(email="saigu@gmail.com")
        self.assertEqual(user.first_name, "Peter")
        self.assertEqual(user.last_name, "Saigu")
        self.assertEqual(user.email, "saigu@gmail.com")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.username, "Saigu")
        self.assertEqual(user.role, User.VIEWER)

    def test_user_creation_exceptions(self):
        # first name value error
        self.assertRaises(ValueError, User.create, first_name=None, last_name='Zarku',
                          email="fightingspirit@1420.bc",
                          date_of_birth="1944-09-28",
                          password="1234", username="Anicka", role=User.REDACTOR)
        # last name value error
        self.assertRaises(ValueError, User.create, first_name="Anca", last_name=None,
                          email="fightingspirit@1420.bc",
                          date_of_birth="1944-09-28",
                          password="1234", username="Anicka", role=User.REDACTOR)
        # date of birth value error
        self.assertRaises(ValueError, User.create, first_name="Anca", last_name='Zarku',
                          email="fightingspirit@1420.bc",
                          date_of_birth=None,
                          password="1234", username="Anicka", role=User.REDACTOR)
        # email value error
        self.assertRaises(ValueError, User.create, first_name="Anca", last_name='Zarku',
                          email=None,
                          date_of_birth="1944-09-28",
                          password="1234", username="Anicka", role=User.REDACTOR)
        # username value error
        self.assertRaises(ValueError, User.create, first_name="Anca", last_name='Zarku',
                          email="fightingspirit@1420.bc",
                          date_of_birth="1944-09-28",
                          password="1234", username=None, role=User.REDACTOR)
        # email unique error
        try:
            with transaction.atomic():
                User.create(first_name="Anca", last_name='Zarku',
                            email="fightingspirit@1420.bc",
                            date_of_birth="1944-09-28",
                            password="1234", username="Anicka", role=User.REDACTOR)
        except Exception as e:
            if e.__str__().__contains__("already exists"):
                self.assertEqual(e.__str__().__contains__("email"), True)
            else:
                # Correct exception not caught => fail
                self.assertEqual(True, False)

        # username unique error
        try:
            with transaction.atomic():
                User.create(first_name="Anca", last_name='Zarku',
                            email="kindlespirit@1420.bc",
                            date_of_birth="1944-09-28",
                            password="1234", username="Anicka", role=User.REDACTOR)
        except Exception as e:
            if e.__str__().__contains__("already exists"):
                self.assertEqual(e.__str__().__contains__("username"), True)
            else:
                # Correct exception not caught => fail
                self.assertEqual(True, False)

    def test_user_modification_exceptions(self):
        user = User.objects.get(email="fightingspirit@1420.bc")
        self.assertEqual(user.last_name, "Zarku")
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.username, "Anicka")
        self.assertEqual(user.role, User.REDACTOR)

        user.email = "saigu@gmail.com"
        try:
            with transaction.atomic():
                user.save()
        except Exception as e:
            if e.__str__().__contains__("already exists"):
                self.assertEqual(e.__str__().__contains__("email"), True)
            else:
                # Correct exception not caught => fail
                self.assertEqual(True, False)

        # return to previous value
        user.email = "fightingspirit@1420.bc"
        user.username = "Saigu"
        try:
            with transaction.atomic():
                user.save()
        except Exception as e:
            if e.__str__().__contains__("already exists"):
                self.assertEqual(e.__str__().__contains__("username"), True)
            else:
                # Correct exception not caught => fail
                self.assertEqual(True, False)

    def test_user_modification(self):
        user = User.objects.get(email="fightingspirit@1420.bc")
        self.assertEqual(user.last_name, "Zarku")
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.username, "Anicka")
        self.assertEqual(user.role, User.REDACTOR)

        user.role = User.ADMIN
        user.last_name = "Okruhla"
        user.save()

        user = User.objects.get(email="fightingspirit@1420.bc")
        self.assertEqual(user.last_name, "Okruhla")
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.username, "Anicka")
        self.assertEqual(user.role, User.ADMIN)
