# CAiSMD Backend (Django + PostgreSQL on Vercel)

This is a production-ready Django REST Framework backend designed to be deployed on Vercel using a Neon PostgreSQL database.

## Architecture

- **Language & Framework:** Python 3.12+, Django 5.x, Django REST Framework
- **Database:** Neon PostgreSQL (via `psycopg` and `dj_database_url`)
- **Authentication:** JWT (JSON Web Tokens) using `djangorestframework-simplejwt`
- **Deployment:** Vercel serverless functions with `WhiteNoise` for static files.

## Local Setup

### 1. Virtual Environment

Create and activate a virtual environment:

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### 2. Install Packages

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file inside the `backend` folder and configure it as follows:

```env
SECRET_KEY=your-secure-secret-key
DEBUG=True
DATABASE_URL=postgresql://neondb_owner:npg_4bRjnQ3akGOl@ep-curly-rain-attl09es.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
ALLOWED_HOSTS=*
CORS_ALLOWED_ORIGINS=*
JWT_SECRET=your-jwt-secret
MEDIA_URL=/media/
MEDIA_ROOT=media
```

### 4. Migration Commands

Run the database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser

Create an admin account to access the dashboard:

```bash
python manage.py createsuperuser
```
(Follow the prompts to enter an email, name, and password)

### 6. Run Server

Start the local development server:

```bash
python manage.py runserver
```
The server will start at `http://127.0.0.1:8000/`.

---

## API Documentation

### Authentication

- **POST /api/auth/register**
  - **Body:** `{ "name": "Test User", "email": "test@example.com", "phone": "1234567890", "password": "securepassword" }`
  - **Response:** Access & Refresh Tokens + User Object
- **POST /api/auth/login**
  - **Body:** `{ "email": "test@example.com", "password": "securepassword" }`
  - **Response:** Access & Refresh Tokens
- **POST /api/auth/logout**
  - **Body:** `{ "refresh": "refresh_token_here" }`
- **GET /api/auth/profile**
  - **Headers:** `Authorization: Bearer <access_token>`

### Events (Admin only for POST/PUT/DELETE)

- **GET /api/events** - List all events
- **POST /api/events** - Create event
- **GET /api/events/{id}** - Retrieve event details
- **PUT /api/events/{id}** - Update event
- **DELETE /api/events/{id}** - Delete event

### Registrations

- **POST /api/register-event**
  - **Body (Multipart/form-data):** `event` (ID), `full_name`, `email`, `phone`, `university`, `department`, `year`, `registration_number`, `gender`, `resume` (File, max 5MB, PDF/DOC/DOCX).
  - **Headers:** `Authorization: Bearer <access_token>`
- **GET /api/my-registrations**
  - **Headers:** `Authorization: Bearer <access_token>`

---

## Vercel Deployment

This project is fully configured for Vercel using serverless functions. 

1. Connect your GitHub repository to Vercel.
2. Set the **Framework Preset** to `Other` or `Django`.
3. Override the **Build Command** to `bash build.sh` (or let Vercel auto-detect it from `vercel.json`).
4. Set the **Root Directory** to `backend`.
5. Add the necessary **Environment Variables** in Vercel:
   - `DATABASE_URL`
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=.vercel.app,yourdomain.com`
   - `CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app`
   - `JWT_SECRET`

**Vercel will automatically:**
- Install `requirements.txt`.
- Run migrations (`migrate`).
- Collect static files (`collectstatic`).
- Start the app using `index.py`.

## Troubleshooting Guide

- **CORS Errors:** Ensure your frontend URL is exactly matched in `CORS_ALLOWED_ORIGINS` (without trailing slashes).
- **500 Server Error on Vercel:** Check the Vercel Function logs. It's usually a missing environment variable or database connection timeout.
- **Admin CSS missing:** Ensure `WhiteNoiseMiddleware` is active and `python manage.py collectstatic` successfully ran. This is handled automatically by `build.sh`.
- **Database timeout (Neon):** Neon instances may sleep. Connection pools via `psycopg` handle wake-ups, but the first request might take a few seconds.
