# Generated by Django 4.1.3 on 2022-12-03 07:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_rename_productimages_productimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productimage',
            name='image',
        ),
    ]
