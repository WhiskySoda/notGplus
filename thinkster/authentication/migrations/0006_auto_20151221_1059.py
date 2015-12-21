# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_auto_20151124_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='first_name',
            field=models.CharField(max_length=40, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(max_length=40, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='account',
            name='tagline',
            field=models.CharField(max_length=140, blank=True),
            preserve_default=True,
        ),
    ]
