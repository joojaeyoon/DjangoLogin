from django import forms


class LoginForm(forms.Form):
    username=forms.CharField(max_length=32,min_length=2)
    password=forms.PasswordInput()
    