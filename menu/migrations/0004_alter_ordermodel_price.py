# Generated by Django 5.0.4 on 2024-06-19 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0003_ordermodel_restaurantid_ordermodel_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordermodel',
            name='price',
            field=models.IntegerField(default=1),
        ),
    ]
