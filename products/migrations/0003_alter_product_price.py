# Generated by Django 4.1.3 on 2022-11-27 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_order_alter_product_options_shippingaddress_review_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.PositiveIntegerField(),
        ),
    ]
