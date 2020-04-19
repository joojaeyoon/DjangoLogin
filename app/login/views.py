from django.shortcuts import render


def LoginView(request):

    return render(request, "login.html")
