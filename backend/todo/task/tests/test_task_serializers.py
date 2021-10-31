from django.test import TestCase
from rest_framework import serializers

from . import faker
from ..serializers import TaskSerializer


class TaskSerializerTest(TestCase):
    def setUp(self):
        faker.make_task()
        self.data = faker.make_task_data()
        self.serializer = TaskSerializer(self.data)

    def test_instance(self):
        '''
        It should be an instance of rest_framework.serializers.ModelSerializer
        '''
        self.assertIsInstance(self.serializer, serializers.ModelSerializer)

    def test_serialized_task(self):
        '''
        It should return serialized task data
        '''
        actual = self.serializer.data
        expected = self.data
        self.assertEqual(actual, expected)
