# Generated by Django 5.0.1 on 2024-02-08 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('healthModel', '0003_rename_userid_backgrounddata_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='backgrounddata',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='healthdata',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
