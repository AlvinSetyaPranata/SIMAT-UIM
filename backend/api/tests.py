from django.test import TestCase
from django.contrib.auth import get_user_model

# Create your tests here.
class StudentTest(TestCase):
    def test_create_user(self):
        user = get_user_model()


        user = user.objects.create(username="testing_username")
        user.set_password("admin123456")


        self.assertEqual(user.username, 'testing_username')