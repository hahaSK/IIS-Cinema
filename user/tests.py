from django.test import TestCase
from user.models import NotRegistered, Registered, Cashier, Redactor, USER_TYPE
from datetime import date


def get_test_address():
    return {
        'raw': '1 Somewhere Street, Northcote, Victoria 3070, VIC, AU',
        'street_number': '1',
        'route': 'Somewhere Street',
        'locality': 'Northcote',
        'postal_code': '3070',
        'state': 'Victoria',
        'state_code': 'VIC',
        'country': 'Australia',
        'country_code': 'AU'
    }


class NotRegisteredTestCase(TestCase):
    def setUp(self):
        NotRegistered.objects.create(name='Peter', surname='Scastny', email="scastny@manbearpig.com")

    def test_user_creation(self):
        user = NotRegistered.objects.get(name='Peter')
        self.assertEqual(user.surname, "Scastny")
        self.assertEqual(user.email, "scastny@manbearpig.com")
        self.assertEqual(user.type, USER_TYPE[0][0])


class RegisteredTestCase(TestCase):
    def setUp(self):
        Registered.objects.create(name='Anca', surname='Zarku', email="fightingspirit@1420.bc",
                                  address=get_test_address(), date_of_birth="28.9.1944")

    def test_user_creation(self):
        user = Registered.objects.get(name='Anca')
        self.assertEqual(user.surname, 'Zarku')
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.type, USER_TYPE[1][0])
        self.assertEqual(user.date_of_birth, "28.9.1944")
        self.assertEqual(user.address.raw, get_test_address()['raw'])


class CashierTestCase(TestCase):
    def setUp(self):
        Cashier.objects.create(name='Zdeno', surname='Zpopradu', email="kaufland@akcia.pp",
                               address=get_test_address(), date_of_birth="28.9.1944")

    def test_user_creation(self):
        user = Cashier.objects.get(name='Zdeno')
        self.assertEqual(user.surname, 'Zpopradu')
        self.assertEqual(user.email, "kaufland@akcia.pp")
        self.assertEqual(user.type, USER_TYPE[2][0])
        self.assertEqual(user.date_of_birth, "28.9.1944")
        self.assertEqual(user.address.raw, get_test_address()['raw'])


