# Generated by Django 5.0.4 on 2024-04-26 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0006_alter_categoriesmodel_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='productsmodel',
            name='calories',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='productsmodel',
            name='weight',
            field=models.IntegerField(default=100),
        ),
        migrations.AlterField(
            model_name='categoriesmodel',
            name='image',
            field=models.ImageField(default='img/categories/category-default.webp', upload_to='img/categories/'),
        ),
    ]