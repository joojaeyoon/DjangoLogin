from django.contrib import admin
from django.urls import path, include
from login.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("rest-auth/", include("rest_auth.urls")),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path('accounts/', include('allauth.urls')),
    path('login/', LoginView)
]
