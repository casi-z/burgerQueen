import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from menu.models import ProductsModel, CategoriesModel, OrderModel
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from burgerQueen.settings import MEDIA_ROOT


def index(request):
    product_array = ProductsModel.objects.values()
    category_array = CategoriesModel.objects.values()
    print(product_array[0]['image'])
    data = {"productArray": product_array, "categoryArray": category_array}
    return render(request, "index.html", context=data)


def change_status(id):
    time.sleep(5000)
    norder = OrderModel.objects.get(id=id)
    norder.status = 1
    time.sleep(10000)


@csrf_exempt
def order(request):
    method = request.method
    if method == "POST":
        data = json.loads(request.body)
        new_order = OrderModel.objects.create(userId="1111", type='restaurant', restaurantId=data['restaurantId'], price=100,
                                  status=0, products=data['products'])
        change_status(new_order.id)
        return JsonResponse({'id': new_order.id})

def order_status(request):
    method = request.method
    if method == "POST":
        data = json.loads(request.body)
        id = data['id']
        order_data = OrderModel.objects.get(id=id)
        return JsonResponse({'status': order_data.status})
def order_page(request):
    return render(request, "layouts/order.html")


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})
