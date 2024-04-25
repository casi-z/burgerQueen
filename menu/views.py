from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from menu.models import DishesModel
def index(request):
    dishes = DishesModel.objects.values()
    print(dishes)
    return render(request, "index.html")

