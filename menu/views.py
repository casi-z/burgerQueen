from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from menu.models import ProductsModel, CategoriesModel


def index(request):
    productArray = ProductsModel.objects.values()
    categoryArray = CategoriesModel.objects.values()
    data = {"productArray": productArray, "categoryArray": categoryArray}
    return render(request, "index.html", context=data)
    
def order(request):
    method = request.method
    if method == "POST":
        data = json.loads(request.body)
        print(data)