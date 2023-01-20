from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            return ValueError("Nama Tidak ada")

        user = self.model(
            username=username
        )

        user.set_password(password)
        user.save(using=self.db)

        return user


    def create_superuser(self, username, password):
        user = self.create_user(username, password=password)

        user.is_teacher = True
        user.save(using=self.db)

        return user



class CustomUserModel(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True, verbose_name='name')
    is_blocked = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'


    @property
    def is_blocked(self):
        return self.is_blocked

    @property
    def is_teacher(self):
        return self.is_teacher


class StudentModel(models.Model):

    fullName = models.CharField(max_length=255, unique=True, verbose_name="Nama Lengkap")
    nik = models.BigIntegerField(blank=True, null=True, verbose_name="NIK")
    gender = models.CharField(blank=True, null=True, max_length=15, verbose_name="Jenis Kelamin")
    placeBirth = models.CharField(blank=True, null=True, max_length=255, verbose_name="Tempat Lahir")
    dateBirth = models.CharField(blank=True, null=True, max_length=255, verbose_name="Tanggal Lahir")
    monthBirth = models.CharField(blank=True, null=True, max_length=255, verbose_name="Bulan Lahir")
    yearBirth = models.CharField(blank=True, null=True, max_length=255, verbose_name="Tahun Lahir")
    religion = models.CharField(blank=True, null=True, max_length=255, verbose_name="Agama")
    email = models.EmailField(verbose_name="email", null=True, blank=True)
    phoneNumber = models.BigIntegerField(blank=True, null=True, verbose_name="No HP")
    addr = models.CharField(blank=True, null=True, max_length=255, verbose_name="address")
    postalCode = models.BigIntegerField(blank=True, null=True, verbose_name="Postal Code")
    province = models.CharField(blank=True, null=True, verbose_name="province", max_length=255)
    districts = models.CharField(blank=True, null=True, verbose_name="districts", max_length=255)
    subDistricts = models.CharField(blank=True, null=True, verbose_name="sub_districts", max_length=255)
    lastEdu = models.CharField(blank=True, null=True, verbose_name="last_education", max_length=255)
    schoolName = models.CharField(blank=True, null=True, verbose_name="school_name", max_length=255)
    schoolAddr = models.CharField(blank=True, null=True, verbose_name="school_address", max_length=255)
    firstOpt = models.CharField(blank=True, null=True, verbose_name="Pilihan Pertama", max_length=50)
    secondOpt = models.CharField(blank=True, null=True, verbose_name="Pilihan Kedua", max_length=50)
    lastOpt = models.CharField(blank=True, null=True, verbose_name="Pilihan Terakhir", max_length=50)
    user_object = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
