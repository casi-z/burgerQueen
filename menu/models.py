from django.db import models

class DishesModel(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()

class CategoriesModel(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='img/categories/', default='img/categories/category-default.webp')

class ProductsModel(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='img/products/', default='img/products/product-default.webp')
    price = models.IntegerField()
    calories = models.IntegerField(default=100)
    weight = models.IntegerField(default=100)
    description = models.TextField()
    ingredients = models.TextField(default=None)
    category = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)

class OrderModel(models.Model):
    userId = models.CharField(max_length=100, default=None)
    type = models.CharField(max_length=100, default=None)
    restaurantId = models.IntegerField(default=0)
    status = models.IntegerField(default=None)
    price = models.IntegerField(default=1)
    products = models.CharField(max_length=100)

