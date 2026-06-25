#!/usr/bin/env bash

set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --noinput

python manage.py migrate

python manage.py shell -c "
from accounts.models import User

if not User.objects.filter(email='admin@example.com').exists():
    User.objects.create_superuser(
        first_name='Admin',
        last_name='User',
        email='admin@example.com',
        phone='9999999999',
        password='Admin@123'
    )
    print('Superuser created')
else:
    print('Superuser already exists')
"