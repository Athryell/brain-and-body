# Generated by Django 4.0.4 on 2022-06-06 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brain', '0005_alter_card_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='card',
            name='image',
        ),
        migrations.AddField(
            model_name='card',
            name='image_name',
            field=models.CharField(default='empty', max_length=32),
        ),
    ]
