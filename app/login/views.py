from django.shortcuts import render


def LoginView(request):

    return render(request, "login.html")


def SuccessView(request):

    return render(request, "success.html")
