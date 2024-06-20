import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from menu.models import ProductsModel, CategoriesModel, OrderModel
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from burgerQueen.settings import MEDIA_ROOT
from django.utils import timezone

delay = 10
def index(request):
    product_array = ProductsModel.objects.values()
    category_array = CategoriesModel.objects.values()
    print(product_array[0]['image'])
    data = {"productArray": product_array, "categoryArray": category_array}
    return render(request, "index.html", context=data)


def change_status(id):

    new_order = OrderModel.objects.get(id=id)

    # Получаем текущее время
    current_time = timezone.now()

    # Получаем разницу между текущим временем и timeStamp
    time_difference = current_time - new_order.timeStamp
    minutes = int(time_difference.total_seconds() / 60)
    if minutes > delay:
        new_order.status = 1
    if minutes >= delay + new_order.cookingTime:
        new_order.status = 2
    new_order.save()




@csrf_exempt
def order(request):
    method = request.method
    if method == "POST":
        data = json.loads(request.body)

        new_order = OrderModel.objects.create(
            userId="1111",
            type='restaurant',
            restaurantId=data['restaurantId'],
            cookingTime=data['cookingTime'],
            price=100,
            status=0,
            products=data['products']
        )
        change_status(new_order.id)
        return JsonResponse({'id': new_order.id, 'delay': delay})

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
