# Generated by Django 4.1.5 on 2023-01-27 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_customusermodel_last_login"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentmodel",
            name="registered_at",
            field=models.DateTimeField(
                blank=True, null=True, verbose_name="Terdaftar Sejak"
            ),
        ),
    ]