from django.db import models

class DishesModel(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()

class CategoriesModel(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='img/categories/', default='img/categories/category-default.webp')

class ProductsModel(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField()
    price = models.IntegerField()
    calories = models.IntegerField(default=100)
    weight = models.IntegerField(default=100)
    description = models.TextField()
    ingredients = models.TextField(default=None)
    category = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)

