from django.test import TestCase
from user.models import NotRegistered, Registered, Cashier, Redactor
from address.models import Address


# TODO test CASCADE on Address when deleting user


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


class NotRegisteredTestCase(TestCase):
    def setUp(self):
        NotRegistered.objects.create(first_name='Peter', last_name='Scastny', email="scastny@manbearpig.com")

    def test_user_creation(self):
        user = NotRegistered.objects.get(first_name='Peter')
        self.assertEqual(user.last_name, "Scastny")
        self.assertEqual(user.email, "scastny@manbearpig.com")


class NotRegisteredUpdateTestCase(TestCase):
    def setUp(self):
        NotRegistered.objects.create(first_name='Peter', last_name='Scastny', email="scastny@manbearpig.com")

    def test_user_creation(self):
        user = NotRegistered.objects.get(first_name='Peter')
        self.assertEqual(user.last_name, "Scastny")
        self.assertEqual(user.email, "scastny@manbearpig.com")
        # update
        user.first_name = "Tom"
        user.save()
        # test updated
        updated_user = NotRegistered.objects.get(first_name="Tom")
        self.assertEqual(updated_user.first_name, "Tom")
        self.assertEqual(user.last_name, "Scastny")
        self.assertEqual(user.email, "scastny@manbearpig.com")

        # NotRegistered.objects.create(first_name='Stefan', last_name='Scastny', email="scastny@manbearpig.com")


class RegisteredTestCase(TestCase):
    def setUp(self):
        Registered.objects.create(first_name='Anca', last_name='Zarku', email="fightingspirit@1420.bc",
                                  address=get_test_address(), date_of_birth="1944-09-28")

    def test_user_creation(self):
        user = Registered.objects.get(first_name='Anca')
        self.assertEqual(user.last_name, 'Zarku')
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())


class CashierTestCase(TestCase):
    def setUp(self):
        Cashier.objects.create(first_name='Zdeno', last_name='Zpopradu', email="kaufland@akcia.pp",
                               address=get_test_address(), date_of_birth="1944-09-28")

    def test_user_creation(self):
        user = Cashier.objects.get(first_name='Zdeno')
        self.assertEqual(user.last_name, 'Zpopradu')
        self.assertEqual(user.email, "kaufland@akcia.pp")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())
