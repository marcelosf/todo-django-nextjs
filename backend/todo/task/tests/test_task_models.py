from django.test import TestCase
from django.db.models import Model

from ..models import Tasks


class TaskModelTest(TestCase):
    def setUp(self):
        self.model = Tasks()

    def test_instance(self):
        '''
        It should be an instance of django.db.model.Model
        '''
        self.assertIsInstance(self.model, Model)

    def test_model_has_fields(self):
        '''
        Model should have fields
        '''
        fields = ('name', 'date', 'status')

        for item in fields:
            message = f'{item} not found'
            with self.subTest():
                self.assertTrue(hasattr(self.model, item), msg=message)

    def test_task_exists(self):
        '''
        Task should exists
        '''
        task = {'name': 'Buy some snacks',
                'date': '2021-10-31', 'status': 'False'}
        Tasks.objects.create(**task)
        self.assertTrue(Tasks.objects.exists())
