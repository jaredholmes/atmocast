# Generated by Django 2.1.2 on 2018-10-23 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather_main', '0002_auto_20181023_1132'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='products',
        ),
        migrations.AddField(
            model_name='cart',
            name='products',
            field=models.ManyToManyField(default=1, to='weather_main.Product'),
        ),
    ]
