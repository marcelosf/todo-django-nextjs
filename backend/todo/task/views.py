from rest_framework import viewsets

from .models import Tasks
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
