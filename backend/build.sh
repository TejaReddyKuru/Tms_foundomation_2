#!/bin/bash
# Install dependencies
python -m pip install -r requirements.txt --break-system-packages

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput
