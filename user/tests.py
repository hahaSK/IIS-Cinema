from django.test import TestCase
from user.models import NotRegistered, Registered, Cashier, Redactor
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


class NotRegisteredTestCase(TestCase):
    def setUp(self):
        NotRegistered.objects.create_user(first_name='Peter', last_name='Scastny', email="scastny@manbearpig.com")

    def test_user_creation(self):
        user = NotRegistered.objects.get(first_name='Peter')
        self.assertEqual(user.last_name, "Scastny")
        self.assertEqual(user.email, "scastny@manbearpig.com")

    def test_user_update(self):
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

    def test_create_with_same_email(self):
        self.assertRaises(Exception, NotRegistered.objects.create_user, email="scastny@manbearpig.com")


class RegisteredTestCase(TestCase):
    def setUp(self):
        Registered.objects.create_user_with_username(first_name='Anca', last_name='Zarku',
                                                     email="fightingspirit@1420.bc",
                                                     address=get_test_address(), date_of_birth="1944-09-28",
                                                     password="1234", username="Anicka")
        Registered.objects.create_user_with_username(first_name='Peter', last_name='Kral',
                                                     email="kral@sveta.sk",
                                                     address=get_test_address(), date_of_birth="1944-09-28",
                                                     password="1234", username="King")

    def test_user_creation(self):
        user = Registered.objects.get(first_name='Anca')
        self.assertEqual(user.last_name, 'Zarku')
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())
        self.assertEqual(user.username, "Anicka")

    def test_user_update(self):
        user = Registered.objects.get(first_name='Anca')
        self.assertEqual(user.last_name, 'Zarku')
        self.assertEqual(user.username, "Anicka")
        # updating last name
        user.last_name = "Zpopradu"
        user.save()
        # testing
        self.assertEqual(user.last_name, 'Zpopradu')
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())
        self.assertEqual(user.username, "Anicka")
        # updating username
        user.username = "Pomaranca"
        user.save()
        # testing
        self.assertEqual(user.last_name, 'Zpopradu')
        self.assertEqual(user.email, "fightingspirit@1420.bc")
        self.assertEqual(user.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(user.address, get_test_address())
        self.assertEqual(user.username, "Pomaranca")

    def test_create_with_same_email(self):
        self.assertRaises(Exception, Registered.objects.create_user_with_username, email="fightingspirit@1420.bc",
                          address=get_test_address(), date_of_birth="1944-09-28", username="Strela")

    def test_create_with_same_username(self):
        self.assertRaises(Exception, Registered.objects.create_user_with_username, email="pomaranca@1420.bc",
                          address=get_test_address(), date_of_birth="1944-09-28", username="Pomaranca")

    def test_update_username_exception(self):
        peter = Registered.objects.get(first_name='Peter')
        self.assertEqual(peter.last_name, 'Kral')
        self.assertEqual(peter.email, "kral@sveta.sk")
        self.assertEqual(peter.date_of_birth.__format__('%Y-%m-%d'), "1944-09-28")
        self.assertEqual(peter.address, get_test_address())
        self.assertEqual(peter.username, "King")

        anca = Registered.objects.get(first_name="Anca")
        self.assertEqual(anca.email, "fightingspirit@1420.bc")
        self.assertEqual(anca.address, get_test_address())
        # update
        peter.username = anca.username
        self.assertRaises(Exception, peter.save)
