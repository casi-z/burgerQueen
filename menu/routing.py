# Пример routing.py для приложения

from django.urls import re_path
from .consumers import MyConsumer
websocket_urlpatterns = [
   re_path(r'ws/burger-queen/$', MyConsumer.as_asgi()),
]