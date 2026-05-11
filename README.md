# Proyecto Entrega Parcial 1: Ingeniería Web y Móvil - Seguridad Municipal Santo Domingo

## 1. Información del Proyecto

- **Asignatura:** Ingeniería Web y Móvil (ICI 4247)
- **Institución:** Pontificia Universidad Católica de Valparaíso (PUCV)
- **Paralelo:** 02
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

## 3. Documentación y Entragas Parciales (EP1.X)

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

### 3.3 Mockups y UI/UX (EP 1.3)

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
* `/registro` (Web y Móvil): Flujo de dos pasos (Datos Generales y Seguridad).

**Nivel 1: Rutas Privadas Principales (Dashboard Web):**

El administrador navega a través de un Menú Lateral Persistente que cambia el contexto sin desmontar el componente base del mapa.

* `/dashboard/monitoreo`: Vista raíz. Máxima jerarquía visual para alertas en tiempo real.
* `/dashboard/geocercas`: Vista de configuración territorial.
* `/dashboard/historial`: Vista de auditoría de rutas pesadas.

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

### Arquitectura de Software

El sistema está desarrollado con el stack **Ionic + React**, manteniendo una estructura modular para asegurar escalabilidad:

- `pages/`: Vistas principales de la aplicación.
- `components/`: Unidades de interfaz reutilizables.
- `services/`: Lógica de consumo de APIs y servicios externos.

---
