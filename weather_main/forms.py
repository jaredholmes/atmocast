from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from .models import Product

class LogInForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    def clean(self):
        email = self.cleaned_data['email']
        password = self.cleaned_data['password']
        if User.objects.filter(username=email).exists() == False:
            raise forms.ValidationError('An account with this email address does not exist')
        else:
            user = authenticate(
                username=email,
                password=password
            )

            if user is None:
                raise forms.ValidationError('Incorrect password')

class SignUpForm(LogInForm):

    terms_label = format_html(
        '{} <a class="learn-more-link" href="/terms-of-use/">{}</a>',
        'I have read and agreed to Atmocast\'s ',
        'terms of use',
    )

    repeat_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )

    agreed_terms = forms.BooleanField(
        label=terms_label,
        required=True,
        widget=forms.CheckboxInput()
    )

    def clean(self):
        # Ensure the passwords match
        password = self.cleaned_data['password']
        r_password = self.cleaned_data['repeat_password']
        if password != r_password:
            raise forms.ValidationError('Passwords do not match')
        # Ensure the email address is not already in use
        if User.objects.filter(username=self.cleaned_data['email']).exists():
            raise forms.ValidationError('Email address already in use')
