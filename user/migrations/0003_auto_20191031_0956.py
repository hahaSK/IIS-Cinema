# Generated by Django 2.2.6 on 2019-10-31 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20191031_0954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notregistered',
            name='email',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='notregistered',
            name='surname',
            field=models.CharField(max_length=120),
        ),
    ]
