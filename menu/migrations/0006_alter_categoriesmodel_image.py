# Generated by Django 5.0.4 on 2024-04-26 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0005_categoriesmodel_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categoriesmodel',
            name='image',
            field=models.ImageField(default='img/categories/category-default.webp', upload_to='img/categories'),
        ),
    ]
