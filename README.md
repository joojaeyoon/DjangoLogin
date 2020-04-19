# DjangoLogin

Google, Github social login example

## To Use

1. Get your OAuth App Client ID, Secet Key from [Github Developer](https://github.com/settings/developers), [Google Developer Console](https://console.developers.google.com/)
   **Set Authorization callback URL to http://localhost:8000/accounts/github_or_google/login/callback/**

2. Run server

```sh
~# pip install -r requirements.txt
~# python manage.py migrate

~# python manage.py runserver
```

3. Add Google, Github Social Application in Django Admin

![django-admin](https://raw.githubusercontent.com/joojaeyoon/joojaeyoon.github.io/master/assets/images/2020/04/django-admin.png)

![social-login](https://raw.githubusercontent.com/joojaeyoon/joojaeyoon.github.io/master/assets/images/2020/04/social-application.png)

4. Login with social accounts

![login](https://raw.githubusercontent.com/joojaeyoon/joojaeyoon.github.io/master/assets/images/2020/04/login_after.png)
