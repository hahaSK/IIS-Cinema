from django.test import TestCase
from user.models import NotRegistered, Registered, Cashier, Redactor
from address.models import Address


# TODO test CASCADE on Address when deleting user


def get_test_address():
    return Address.objects.create(street1="Slavocskeho",
                                  street2="Brno-stred",
                                  houseNumber="304/2",
                                  city="Brno",
                                  psc="61200")


class NotRegisteredTestCase(TestCase):
    def setUp(self):
        NotRegistered.objects.create(name='Peter', surname='Scastny', email="scastny@manbearpig.com")

    def test_user_creation(self):
        user = NotRegistered.objects.get(name='Peter')
        self.assertEqual(user.surname, "Scastny")
        self.assertEqual(user.email, "scastny@manbearpig.com")


class RegisteredTestCase(TestCase):
    def setUp(self):
        Registered.objects.create(name='Anca', surname='Zarku', email="fightingspirit@1420.bc",
                                  address=get_test_address(), date_of_birth="1944-09-28")

    def test_user_creation(self):
        user = Registered.objects.get(name='Anca')
        self.assertEqual(user.surname, 'Zarku')
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())


class CashierTestCase(TestCase):
    def setUp(self):
        Cashier.objects.create(name='Zdeno', surname='Zpopradu', email="kaufland@akcia.pp",
                               address=get_test_address(), date_of_birth="1944-09-28")

    def test_user_creation(self):
        user = Cashier.objects.get(name='Zdeno')
        self.assertEqual(user.surname, 'Zpopradu')
        self.assertEqual(user.email, "kaufland@akcia.pp")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())
