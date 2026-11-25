# Mantenedor de Usuarios

Aplicación web para la administración de usuarios mediante operaciones CRUD (Crear, Consultar, Actualizar y Eliminar), desarrollada como parte de una prueba técnica.

El proyecto está compuesto por una API REST construida con Java y Spring Boot, y una interfaz web desarrollada con React, que permite gestionar la información de los usuarios.

## Tecnologías utilizadas

### Backend
- **Java 17:** Lenguaje de programación.
- **Spring Boot 3.4.x:** Framework para el desarrollo de la API REST.
- **Spring Data JPA:** Persistencia y acceso a datos.
- **H2 Database:** Base de datos relacional en memoria.
- **Maven:** Gestión de dependencias y construcción del proyecto.
- **OpenAPI:** Diseño y documentación de los endpoints.

### Frontend
- **React 17+:** Biblioteca para la construcción de interfaces.
- **JavaScript / TypeScript:** Lenguajes de programación.
- **CSS:** Estilos y presentación de la interfaz.

## Funcionalidades

El sistema permite realizar las siguientes operaciones:

| Operación | Descripción |
|---|---|
| Crear usuario | Registrar nuevos usuarios en el sistema. |
| Listar usuarios | Consultar todos los usuarios registrados. |
| Consultar usuario | Obtener la información de un usuario por su identificador. |
| Editar usuario | Actualizar la información de un usuario existente. |
| Eliminar usuario | Eliminar un usuario del sistema. |

### Modelo de usuario

Cada usuario contiene los siguientes atributos:

| Campo | Tipo |
|---|---|
| nombres | String |
| apellidos | String |
| rut | Long |
| dv | String |
| fechaNacimiento | Date |
| correoElectronico | String |
| contrasena | String |

## Arquitectura

El proyecto implementa una separación de responsabilidades entre las diferentes capas, buscando mantener un código organizado, mantenible y escalable.

**Backend:**
- **Controller:** Gestiona las solicitudes HTTP y expone los endpoints de la API.
- **Service:** Contiene la lógica de negocio.
- **Repository:** Gestiona el acceso y la persistencia de los datos mediante Spring Data JPA.
- **Entity:** Representa las entidades del modelo de datos.
- **DTO:** Define los objetos utilizados para transferir información entre las capas.

**Frontend:**
- **Components:** Componentes reutilizables de la interfaz.
- **Services:** Encargados de la comunicación con la API REST.
- **Pages:** Vistas principales de la aplicación.
- **Types / Interfaces:** Definición de estructuras y tipos de datos.
- **State:** Gestión del estado de la aplicación.

## Documentación de la API

El diseño de la API se encuentra documentado mediante el estándar OpenAPI.

Archivo de especificación:

`openapi.yaml`

La documentación permite consultar los endpoints disponibles, parámetros, estructuras de datos y respuestas de la API.

## Ejecución del proyecto

Para conocer los requisitos previos y los pasos necesarios para ejecutar la aplicación, consulta el siguiente archivo:
Requisitos previos

Antes de ejecutar el proyecto, necesitas tener instalado:

Git

Docker Desktop

Asegúrate de que Docker Desktop esté iniciado.

1. Clonar el repositorio

Abre una terminal y ejecuta:

git clone https://github.com/juanjose999/usuariosAdmin.git

Ingresa a la carpeta del proyecto:

cd usuariosAdmin

2. Construir y ejecutar los contenedores

Desde la raíz del proyecto, donde se encuentra el archivo docker-compose.yml, ejecuta:

docker compose up --build

Este comando construye las imágenes y levanta los dos servicios:

Backend: Java + Spring Boot.

Frontend: React + TypeScript.

La primera ejecución puede tardar unos minutos mientras Docker descarga las imágenes y construye los proyectos.

3. Acceder a la aplicación

Una vez que los contenedores estén ejecutándose, puedes acceder a:

Servicio

URL

Frontend

http://localhost:5173

Backend

http://localhost:8080/usuario

4. Comandos útiles

Ejecutar los contenedores en segundo plano:

docker compose up -d --build

Verificar el estado de los contenedores:

docker compose ps

Consultar los logs:

docker compose logs -f

Consultar los logs de un servicio específico:

docker compose logs -f backend
docker compose logs -f frontend

Detener los contenedores:

docker compose down

Reconstruir las imágenes después de realizar cambios:

docker compose up --build

5. Estructura del proyecto

usuariosAdmin/
├── backend/
│   ├── src/
│   ├── build.gradle
│   └── Dockerfile
│
├── fronted/
│   └── p0/
│       ├── src/
│       ├── package.json
│       └── Dockerfile
│
├── docker-compose.yml
└── README.md

Consideraciones

No es necesario instalar Java, Gradle o Node.js localmente para ejecutar la aplicación mediante Docker Compose.

Docker se encarga de construir y ejecutar ambos servicios utilizando sus respectivos Dockerfile.

Los comandos deben ejecutarse desde la carpeta raíz del proyecto.

## Autor

**Juan José Sierra Ortega**

Prueba técnica – Desarrollo de Software junior