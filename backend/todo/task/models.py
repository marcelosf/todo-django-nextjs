from django.db import models
from django.utils.translation import gettext as _


class Tasks(models.Model):
    name = models.CharField(_("Task"), max_length=100)
    date = models.DateField(_("Date"), auto_now=False, auto_now_add=False)
    status = models.BooleanField(_("Status"))
