# INSTRUCTIONS.md

## Descripción General
Este documento describe cómo construir y ejecutar el proyecto utilizando **solo Docker**, sin necesidad de un IDE. 
Todos los pasos están orientados a un entorno **pre productivo**, usando únicamente terminal/consola.

Stack del proyecto:
- Frontend: React 19 + Vite
- Backend: Spring Boot 3.4.2 (Java 17)
- Base de datos: H2 (memoria/archivo)
- Contenedorización: Docker + Docker Compose

---

## 1. Prerrequisitos

Asegúrese de tener instaladas las siguientes herramientas:

- Docker Desktop (Windows/Mac) o Docker Engine (Linux)
- Docker Compose v2
- Git

Verificar instalación:

```bash
docker --version
docker compose version
git --version
```

Docker debe estar en ejecución antes de continuar.

---

## 2. Clonar el Repositorio

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_ROOT>
```

Estructura esperada del proyecto:

```text
project-root/
├── docker-compose.yml
├── backend/
│   └── Dockerfile
└── frontend/
    └── Dockerfile
```

---

## 3. Variables de Entorno (Frontend)

Crear el siguiente archivo dentro del directorio frontend:

```bash
frontend/.env
```

Agregar:

```env
VITE_API_URL=http://localhost:8080
```

Este valor permite que el navegador se comunique correctamente con el contenedor del backend.

---

## 4. Configuración Backend (CORS)

Asegúrese de que Spring Boot permita solicitudes desde el frontend.

Ejemplo (a nivel de Controller):

```java
@CrossOrigin(origins = "http://localhost:5173")
```

También puede configurarse de forma global si se prefiere.

---

## 5. Construir y Levantar Contenedores

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Este comando realizará:
1. Construcción de la imagen del backend
2. Construcción de la imagen del frontend
3. Creación de la red Docker
4. Inicio de todos los contenedores

---

## 6. Acceso a la Aplicación

Frontend:

```text
http://localhost:5173
```

API Backend:

```text
http://localhost:8080/api
```

Consola H2 (si está habilitada):

```text
http://localhost:8080/h2-console
```

---

## 7. Detener Contenedores

```bash
docker compose down
```

---

## 8. Reconstruir Después de Cambios

Si se modifica código o variables de entorno:

```bash
docker compose down
docker compose up --build
```

---

## 9. Comandos Docker Útiles

Ver contenedores en ejecución:

```bash
docker ps
```

Ver logs generales:

```bash
docker compose logs -f
```

Logs solo del backend:

```bash
docker compose logs -f backend
```

Logs solo del frontend:

```bash
docker compose logs -f frontend
```

---

## 10. Problemas Comunes

### Docker Engine no está en ejecución
Error de ejemplo:

```
open //./pipe/dockerDesktopLinuxEngine
```

Solución:
- Iniciar Docker Desktop
- Esperar hasta que Docker Engine esté activo

---

### Errores CORS

Verificar que:
- El backend permita el origen `http://localhost:5173`
- El frontend utilice `http://localhost:8080` como URL de API

---

### Puerto ya en uso

Verificar procesos en conflicto:

```bash
netstat -ano | findstr 8080
netstat -ano | findstr 5173
```

Detener aplicaciones en conflicto o cambiar los puertos.

---

## 11. Limpieza del Entorno Docker (Opcional)

Si los contenedores presentan comportamientos inesperados:

```bash
docker compose down -v
docker system prune -a
```

---

## 12. Arquitectura de Ejecución Esperada

```text
Navegador
   ↓
React (localhost:5173)
   ↓
Spring Boot API (localhost:8080)
   ↓
Base de Datos H2
```

---

## 13. Notas para Desarrolladores

- No se requiere IDE.
- Todas las operaciones se realizan mediante terminal.
- Docker gestiona dependencias de Java, Node y runtime.
- Reconstruir contenedores después de cambios en dependencias o variables de entorno.

---

Fin de instrucciones.

