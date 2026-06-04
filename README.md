# Proyecto Ingeniería Web y Móvil - Seguridad Municipal Santo Domingo

## 1. Información del Proyecto

- **Asignatura:** Ingeniería Web y Móvil (ICI 4247)
- **Institución:** Pontificia Universidad Católica de Valparaíso (PUCV)
- **Paralelo:** 01
- **Integrantes:**
  - Renato Valentín Mujica Vergara
  - Sofia Belén Mena Cortés
  - Yamil Alejando Soleman Fernández
  - Felipe Joaquín Chávez González

---

## 2. Instrucciones de Instalación y Ejecución

Para desplegar el entorno de desarrollo y visualizar la aplicación navegable, siga estos pasos técnicos:

### Pre-requisitos

- **Node.js**: v16 o superior.
- **Ionic CLI**: Instalación global mediante `npm install -g @ionic/cli`.

### Pasos para la ejecución local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Blistax0/ProyectoMuni-WebYMovil.git
   cd ...\ProyectoMuni-WebYMovil\frontend
   ```
2. **Instalar dependencias: (En caso de que no se tengan o se genere algun error)**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   o tambien:
   npm run build
   ```

4. **Entrar al servidor web:**
   Por ejemplo, podria salir un link asi en la consola al momento de ejecutar el comando anterior:

   ```bash
   http://localhost:8100
   ```

---

## 3. Entrega Parcial 1: Frontend, UI/UX y Requerimientos (EP1.X)

Este proyecto consiste en una plataforma integral diseñada para optimizar la seguridad pública mediante la digitalización del patrullaje, permitiendo una respuesta coordinada y basada en datos tácticos.

---

### 3.1 Requerimientos del Sistema (EP 1.1)

#### Requerimientos Funcionales (RF)

Se han definido 7 requerimientos críticos bajo estándares de prevención situacional:

| Requerimiento                                 | Justificación Técnica y Operativa                                                                                                |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Registro de Incidentes Georreferenciados**  | Captura evidencia multimedia (fotos) vinculada automáticamente a coordenadas GPS exactas, eliminando ambigüedad en los reportes. |
| **Monitoreo de Flota en Tiempo Real**         | Dashboard web para visualizar ubicación y estado de unidades, fundamental para la asignación de la patrulla más cercana.         |
| **Gestión de Geo-cercas**                     | Límites de vigilancia virtuales para asegurar la cobertura en zonas residenciales y costeras críticas.                           |
| **Alertas Operativas Automáticas**            | Notificaciones inmediatas por exceso de velocidad o abandono de perímetro asignado.                                              |
| **Historial y Reproducción de Rutas**         | Auditoría y análisis de recorridos pasados para evaluar la efectividad del servicio.                                             |
| **Protocolo de Emergencia (Botón de Pánico)** | Alerta sonora y de ubicación inmediata a la central con un solo toque para la seguridad del personal.                            |
| **Trazabilidad y Derivación de Casos**        | Seguimiento de incidentes hasta su resolución, facilitando la derivación a departamentos como luminarias o aseo.                 |

#### Requerimientos No Funcionales (RNF)

- **Rendimiento:** Latencia GPS < 2s para un seguimiento fluido en emergencias.
- **Seguridad:** Autenticación mediante **JWT (JSON Web Tokens)** para proteger la integridad de datos sensibles de seguridad pública.
- **Usabilidad (UI/UX Situacional):** Interfaz de alto contraste y componentes de gran escala para uso óptimo bajo luz solar y en movimiento.

---

### 3.2 Justificación del Problema (EP 1.2)

El municipio de Santo Domingo enfrenta desafíos de seguridad en sectores residenciales y costeros con baja organización vecinal y focos de incivilidades. Actualmente, la gestión depende de bitácoras físicas o planillas Excel, lo que genera:

- **Invisibilidad operativa:** Falta de control sobre la ubicación de las unidades.
- **Pérdida de información:** Reportes manuales propensos a errores.
- **Respuesta lenta:** Dificultad para coordinar recursos en tiempo real.

La digitalización permite una respuesta basada en georreferenciación táctica inmediata, mejorando la eficiencia y la percepción de seguridad ciudadana.

---

### 3.3 Diseño de Interfaces (EP 1.3)

Se diseñaron 7 mockups clave (5 Web y 2 Móvil) abordando la vista del Administrador (Web) y del Patrullero (Móvil), asegurando consistencia visual y cumplimiento de los flujos operativos.

* Enlace al prototipo interactivo **Web** en Figma: https://www.figma.com/proto/nOHPZ6g961u6kdAUyUV8fe/Proyecto-Webwebweb?node-id=168-627&p=f&t=r16ndPMlnBqEBdHg-1&scaling=scale-down&content-scaling=fixed&page-id=12%3A56&starting-point-node-id=168%3A627
* Enlace al prototipo interactivo **Móvil** en Figma: https://www.figma.com/proto/nOHPZ6g961u6kdAUyUV8fe/Proyecto-Webwebweb?node-id=379-1211&p=f&t=fRTF9xQfLmM2owrm-1&scaling=scale-down&content-scaling=fixed&page-id=173%3A2517&starting-point-node-id=379%3A1211

---

### 3.4 Arquitectura de Navegación (EP 1.4)

#### Diferenciación de Acceso según Roles

El sistema SIGEP establece una separación estricta de interfaces basada en el rol del usuario para garantizar la seguridad y eficiencia operativa:

* **Rol Patrullero (Plataforma Móvil):** Orientado a la acción rápida en terreno. Su acceso está restringido a la aplicación móvil, donde prima la visualización de datos esenciales y la emisión ágil de alertas.
* **Rol Administrador (Plataforma Web):** Orientado a la gestión, análisis y monitoreo panorámico. Accede al Dashboard Web (Central de Operaciones), el cual cuenta con herramientas avanzadas de configuración espacial (mapa) y gestión de casos.

#### Estructura de Rutas y Jerarquía de Vistas

La arquitectura de navegación sigue un modelo de árbol con protección de rutas (Auth Guards).

**Nivel 0: Rutas Públicas (autenticación):**
* `/login` (Web y Móvil): Pantalla de ingreso. Es el punto de entrada obligatorio.
* `/register` (Web y Móvil): Flujo de dos pasos (Datos Generales y Seguridad).

**Nivel 1: Rutas Privadas Principales (Dashboard Web):**

El administrador navega a través de un Menú Lateral Persistente que cambia el contexto sin desmontar el componente base del mapa.

* `/dashboard`: Vista raíz. Máxima jerarquía visual para alertas en tiempo real.
* `/geofencing`: Vista de configuración territorial.
* `/history`: Vista de auditoría de rutas pesadas.

**Nivel 2: Vistas Sobrepuestas (Modales y Popups):**

Jerárquicamente el sistema utiliza "Overlays" (capas flotantes) para interacciones que no requieren abandonar el contexto del mapa.

* **Perfil de Usuario:** Modal de solo lectura accesible desde el menú inferior.
* **Detalle de Alerta/Incidente:** Popus dinámicos (Rojos, Amarillos, Azules) que se activan sobre el mapa para gesti+on inmediata de emergencias.

#### Coherencia de Experiencia entre Dispositivos

Para asegurar que la curva de aprendizaje sea mínima, ambas plataformas (Web y Móvil) mantienen una fuerte coherencia UX/UI:

* **Identidad Visual:** Uso consistente de la paleta de colores institucionales y tipografía legible (*Inter*).
* **Estructura de Formularios:** Los inputs de texto (ejemplo: Correo, RUT, Contraseña) comparten el mismo diseño (bordes redondeados, *placeholders* descriptivos) tanto en el celular del patrullero como en la web del administrador.
* **Prograsión de Tareas:** El registro en ambas plataformas utiliza el mismo patrón de "Paso 1 y Paso 2" con barras de progreso o indicadores visuales de avance.

#### Flujo de Principales Tareas (Task Flow) y Puntos Críticos

Se definen los siguientes flujos críticos de interacción en la plataforma Web:

**Task Flow 1: Trazado de Geo-cercas:**
* Flujo: Usuario entra a "Geo-cercas" -> Clic en "+ Trazar Nuevo Perímetro" -> Aparece la barra de herramientas espaciales -> El usuario dibuja el polígono -> El polígono se guarda y la patrulla queda asignada.
* Punto Crítico: El cambio de estado del botón principal (de "Trazar" a "Cancelar" en color naranja), otorgando control al usuario para abortar la acción.

**Task Flow 2: Reproducción de Historial:**
* Flujo: Usuario entra a "Historial de Rutas" -> El mapa muestra patrullas en color celeste (indicador de interactividad) -> Usuario hace clic en una patrulla -> Aparece el panel derecho con el reproductor de tiempo y se dibuja la ruta histórica en el mapa.
* Punto Crítico: La barra de reproducción de la ruta, que permite avanzar o retroceder temporalmente simulando el trayecto del vehículo.

#### Justificación Técnica de la Arquitectura Frontend

La decisión de utilizar un componente de mapa de fondo persistente y un menú lateral de navegación lateral (en Web) responde a criterios de eficiencia y rendimiento. Al cambiar entre "Monitoreo", "Geo-cercas" e "Historial", el sistema no recarga la instancia del mapa, sino que únicamente actualiza las capas de datos (pines, polígonos o líneas). El uso intensivo de modales (popups de alertas y perfil) protege el flujo de trabajo del operador, permitiéndole atender una emergencia (ej. Despachar Apoyo) en menos de 3 clics sin perder de vista la ubicación de las demás unidades, maximizando la usabilidad y la claridad estructural en momentos de estrés.

---

### 4. Gestión del Proyecto

### Metodología de Trabajo

Para asegurar la entrega y calidad del software, se utilizan las siguientes herramientas de gestión:

- **Gestión de Requerimientos:** Uso activo de **GitHub Issues** para la trazabilidad de cada funcionalidad.
- **Control de Tareas:** Seguimiento de avances mediante tablero **GitHub Projects** bajo metodología **Kanban**.

### Arquitectura de Software y Estructura del Proyecto

El sistema está desarrollado con el stack **Ionic + React**, manteniendo una arquitectura modular basada en componentes para asegurar escalabilidad, separando claramente las vistas, la lógica de estado y los elementos reutilizables:

<img width="871" height="686" alt="image" src="https://github.com/user-attachments/assets/2db0a3b6-ee7e-4e4b-a1e2-067ecc19a854" />



---

## 5. Entrega Parcial 2: Documentación de Backend y API REST (EP2.X)

Esta sección detalla la implementación del servidor, la base de datos relacional y los endpoints de la API construidos en Node.js con Express y Sequelize.

---

### 5.1 Instrucciones de Ejecución del Backend (EP 2.1)

Para levantar el servidor localmente, siga estos pasos dentro de la carpeta `backend`:

1. **Instalar las dependencias de Node:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:** Cree un archivo llamado .env en la raíz de la carpeta backend con las credenciales de su conexión a MySQL local:
   ```bash
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=su_contraseña
   DB_NAME=sigep_db
   ```

3. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

   El servidor confirmará la conexión a la base de datos y la sincronización de las tablas.
   
---

### 5.2 Modelo Relacional de Base de Datos (EP 2.2)

El sistema utiliza MySQL como motor relacional, administrado a través del ORM Sequelize para garantizar la validación de integridad de los datos. La estructura cuenta con 4 entidades principales: Usuarios (Patrulleros/Admin), Incidentes, Geocercas y PosicionesGPS.

<img width="928" height="713" alt="image" src="https://github.com/user-attachments/assets/0f87a2dd-edc2-4e46-94d3-53c8afe972d0" />

---

5.3 Documentación Técnica de Consumo de API (EP 2.3 y EP 2.7)


# Documentación Técnica de Consumo de API (SIGEP)

Este documento detalla los endpoints expuestos por el backend para el correcto consumo desde el frontend (Ionic + React).

## Base URL
`http://localhost:3000/api`

---

## 1. Módulo de Incidentes 

### A. Registrar nuevo incidente
* **Ruta:** `/incidentes`
* **Método:** `POST`
* **Formato del Cuerpo (JSON):**

```json
{
  "tipo_incidente": "string",
  "nivel_gravedad": "string",
  "latitud": "number",
  "longitud": "number",
  "descripcion": "string",
  "patrullero_id": "number"
}
```
#### Evidencia de Prueba Funcional (POST):
<img width="1279" height="793" alt="image" src="https://github.com/user-attachments/assets/a24e7af9-871f-48ba-865d-998a9e5f27fe" />



---

### B. Listar todos los incidentes
* **Ruta:** `/incidentes`
* **Método:** `GET`
* **Respuesta Exitosa (200 OK):** Retorna un arreglo con todos los objetos de incidentes almacenados en MySQL, vinculados al patrullero correspondiente.
```json

  {
    "id": 5,
    "tipo_incidente": "Falta de luminaria costera",
    "nivel_gravedad": "Alta",
    "latitud": -33.6361,
    "longitud": -71.6214,
    "descripcion": "Sector costero sur sin iluminación pública",
    "estado_resolucion": "PENDIENTE",
    "patrullero_id": 1,
    "createdAt": "2026-06-04T03:06:05.627Z",
    "updatedAt": "2026-06-04T03:06:05.627Z"
  }
```
#### Evidencia de Prueba Funcional (GET):
<img width="1268" height="785" alt="image" src="https://github.com/user-attachments/assets/8653c1fb-dedf-43aa-8668-52cf7e9274f0" />


---

### C. Actualizar estado de un incidente 
* **Ruta:** `/incidentes/:id`
* **Método:** `PUT`
* **Formato del Cuerpo:** Recibe el nuevo estado de resolución del caso (ej: "EN_PROCESO" o "RESUELTO").
* **Respuesta Exitosa (200 OK):** Retorna un mensaje confirmando la actualización del incidente en la base de datos.

---

### D. Eliminar o archivar un incidente 
* **Ruta:** `/incidentes/:id`
* **Método:** `DELETE`
* **Respuesta Exitosa (200 OK):** Retorna un mensaje confirmando la eliminación correcta del registro.

---

## 2. Módulo de Geocercas 

### A. Crear zona de vigilancia
* **Ruta:** `/geocercas`
* **Método:** `POST`
* **Formato del Cuerpo:** Requiere el nombre de la zona, un arreglo de coordenadas geográficas en formato de texto adaptado para polígonos, el color de borde asignado y el estado de activación en formato numérico/booleano.
```json
  {
  "nombre_zona": "Sector Norte - Plaza",
  "coordenadas_poligono": [
    [-33.6310, -71.6310],
    [-33.6310, -71.6350],
    [-33.6350, -71.6350],
    [-33.6350, -71.6310]
  ],
  "color_borde": "#00FF00"
}
```
---

### B. Listar geocercas
* **Ruta:** `/geocercas`
* **Método:** `GET`
* **Respuesta Exitosa (200 OK):** Retorna el listado completo de los perímetros activos controlados actualmente por el sistema municipal.

---

### C. Modificar perímetro de geocerca
* **Ruta:** `/geocercas/:id`
* **Método:** `PUT`
* **Formato del Cuerpo:** Permite actualizar las coordenadas, cambiar el nombre de la zona o modificar su estado de activación.

---
```json
{
  "nombre_zona": "Sector Norte - Plaza Actualizada",
  "color_borde": "#FF0000"
}
```

### D. Eliminar geocerca 
* **Ruta:** `/geocercas/:id`
* **Método:** `DELETE`
* **Respuesta Exitosa (200 OK):** Retorna la confirmación de que la geocerca ha sido dada de baja del sistema correctamente.

---



## 3. Módulo de Usuarios 

### A. Gestión de Usuarios y Accesos
* **Rutas disponibles:**
  * `GET /`: Endpoints dedicados para listar de forma ordenada a todos los patrulleros que se encuentran activos en el sistema municipal.
  * `POST /`: Permite registrar nuevos usuarios en el sistema enviando los datos personales requeridos (rut, nombre completo, correo, teléfono, región, comuna, hash de contraseña, rol asignado y estado).
  * `PUT /:id`: Diseñado para actualizar el rango, contraseñas de seguridad o los datos de contacto del personal municipal (Exigencia Rúbrica).
  * `DELETE /:id`: Permite dar de baja o desactivar las cuentas del personal desvinculado de las rutas (Exigencia Rúbrica).

---

## 4. Módulo de Posiciones GPS 

### A. Envío de ubicación en tiempo real
* **Rutas disponibles:**
  * `POST /`: Recibe de forma continua y asíncrona las coordenadas geográficas (latitud, longitud, velocidad estimada en km/h y el ID del patrullero) enviadas directamente por el dispositivo móvil del operario que se encuentra en ruta activa.
---

