from django.contrib import admin

from users.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
    list_display = ["username", "date_joined", "is_staff"]


admin.site.register(User, UserAdmin)
