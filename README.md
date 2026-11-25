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

[INSTRUCTIONS.md](./INSTRUCTIONS.md)

## Autor

**Juan José Sierra Ortega**

Prueba técnica – Desarrollo de Software junior