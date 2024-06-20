# Generated by Django 5.0.4 on 2024-06-19 06:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoriesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(default='img/categories/category-default.webp', upload_to='img/categories/')),
            ],
        ),
        migrations.CreateModel(
            name='OrderModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('products', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ProductsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='')),
                ('price', models.IntegerField()),
                ('calories', models.IntegerField(default=100)),
                ('weight', models.IntegerField(default=100)),
                ('description', models.TextField()),
                ('ingredients', models.TextField(default=None)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.categoriesmodel')),
            ],
        ),
    ]
