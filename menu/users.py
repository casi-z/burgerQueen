from django.contrib.auth.models import User

# Создайте пользователя и сохраните его в базе данных
user = User.objects.create_user('myusername', 'myemail@crazymail.com', 'mypassword')

# Обновите поля и сохраните их снова
user.first_name = 'John'
user.last_name = 'Citizen'
user.save()

