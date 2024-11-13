from django import forms

class ImageUploadForm(forms.Form):
    email = forms.EmailField()
    img = forms.ImageField()