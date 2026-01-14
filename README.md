# Django + React Workshops


Este proyecto combina un backend en **Django** con un frontend en **React.js** y **TypeScript**, utilizando **Hero UI** para la interfaz de usuario.

## Tecnologías utilizadas

* **Frontend:** React, TypeScript, Hero UI, React Hook Form
* **Backend / API:** Django, python

## 🐍 Instalación del Backend (Django)

1. **Clonar el repositorio:**

```bash
git clone https://github.com/BenjhyEA/django-react-workshops.git
cd django-react-workshops/backend
```

2. **Crear un entorno virtual:**

```bash
python -m venv venv
```

3. **Activar el entorno virtual:**

* En Windows:

```bash
venv\Scripts\activate
```


4. **Instalar dependencias:**

```bash
pip install -r requirements.txt
```

5. **Aplicar migraciones y crear superusuario:**
Solo si deseas restablecer la bd, borra el archivo `db.sqlite3` luego ejecutas lo siguiente. El repositorio contiene con una bd por defecto

```bash
python manage.py migrate
python manage.py createsuperuser
```

6. **Ejecutar el servidor:**

```bash
python manage.py runserver
```

El backend estará disponible en: [http://localhost:8000](http://localhost:8000)

## ⚛️ Instalación del Frontend (React)

1. **Moverse al directorio frontend:**

```bash
cd ../frontend
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar la aplicación en modo desarrollo:**

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)
