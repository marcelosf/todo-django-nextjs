from django.shortcuts import resolve_url as r
from rest_framework.test import APITestCase

from . import faker


class TestTaskView(APITestCase):
    def setUp(self):
        faker.make_task()
        self.resp = self.client.get(r('task:task-list'))

    def test_status_code(self):
        '''
        Status code should be 200
        '''
        self.assertEqual(200, self.resp.status_code)

    def test_response_data(self):
        '''
        Response data should be equal expected data
        '''
        expected = faker.make_task_data()
        actual = self.resp.json()
        actual[0].pop('id')
        self.assertEqual(actual[0], expected)
