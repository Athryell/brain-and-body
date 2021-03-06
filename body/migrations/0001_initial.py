# Generated by Django 4.0.2 on 2022-02-16 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('category', models.CharField(choices=[('UB', 'Upper Body'), ('LB', 'Lower Body'), ('FB', 'Full Body')], max_length=2)),
                ('isCardio', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rounds', models.IntegerField(default=1)),
                ('district_upperbody', models.BooleanField()),
                ('district_lowerbody', models.BooleanField()),
            ],
        ),
    ]
