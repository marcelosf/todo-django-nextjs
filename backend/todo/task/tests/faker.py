from ..models import Tasks


def make_task_data(**kwargs: dict) -> dict:
    '''
    Make some tasks fake data
    '''
    default = {
        'name': 'By some snacks',
        'date': '2021-10-31',
        'status': False
    }

    default.update(**kwargs)
    return default


def make_task(**kwargs: dict) -> Tasks:
    '''
    Create a task Object
    '''
    task = make_task_data(**kwargs)
    obj = Tasks.objects.create(**task)

    return obj
