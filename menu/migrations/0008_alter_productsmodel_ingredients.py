# Generated by Django 5.0.4 on 2024-04-26 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0007_productsmodel_calories_productsmodel_weight_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsmodel',
            name='ingredients',
            field=models.TextField(default=None),
        ),
    ]