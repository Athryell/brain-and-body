# Generated by Django 4.0.4 on 2022-06-06 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brain', '0007_alter_card_image_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='image_name',
            field=models.CharField(default=models.CharField(max_length=64), max_length=32),
        ),
    ]