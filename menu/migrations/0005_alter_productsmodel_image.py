# Generated by Django 5.0.4 on 2024-06-19 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0004_alter_ordermodel_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsmodel',
            name='image',
            field=models.ImageField(default='img/products/product-default.webp', upload_to='img/categories/'),
        ),
    ]
