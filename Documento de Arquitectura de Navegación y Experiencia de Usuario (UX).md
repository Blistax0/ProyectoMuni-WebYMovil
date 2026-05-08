# Documento de Arquitectura de Navegación y Experiencia de Usuario (UX) - SIGEP

### 1. Diferenciación de Acceso según Roles

El sistema SIGEP establece una separación estricta de interfaces basada en el rol del usuario para garantizar la seguridad y eficiencia operativa:

* **Rol Patrullero (Plataforma Móvil):** Orientado a la acción rápida en terreno. Su acceso está restringido a la aplicación móvil, donde prima la visualización de datos esenciales y la emisión ágil de alertas.
* **Rol Administrador (Plataforma Web):** Orientado a la gestión, análisis y monitoreo panorámico. Accede al Dashboard Web (Central de Operaciones), el cual cuenta con herramientas avanzadas de configuración espacial (mapa) y gestión de casos.

### 2. Estructura de Rutas y Jerarquía de Vistas

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

### 3. Coherencia de Experiencia entre Dispositivos

Para asegurar que la curva de aprendizaje sea mínima, ambas plataformas (Web y Móvil) mantienen una fuerte coherencia UX/UI:

* **Identidad Visual:** Uso consistente de la paleta de colores institucionales y tipografía legible (*Inter*).
* **Estructura de Formularios:** Los inputs de texto (ejemplo: Correo, RUT, Contraseña) comparten el mismo diseño (bordes redondeados, *placeholders* descriptivos) tanto en el celular del patrullero como en la web del administrador.
* **Prograsión de Tareas:** El registro en ambas plataformas utiliza el mismo patrón de "Paso 1 y Paso 2" con barras de progreso o indicadores visuales de avance.

### 4. Flujo de Principales Tareas (Task Flow) y Puntos Críticos

Se definen los siguientes flujos críticos de interacción en la plataforma Web:

**Task Flow 1: Trazado de Geo-cercas:**
* Flujo: Usuario entra a "Geo-cercas" -> Clic en "+ Trazar Nuevo Perímetro" -> Aparece la barra de herramientas espaciales -> El usuario dibuja el polígono -> El polígono se guarda y la patrulla queda asignada.
* Punto Crítico: El cambio de estado del botón principal (de "Trazar" a "Cancelar" en color naranja), otorgando control al usuario para abortar la acción.

**Task Flow 2: Reproducción de Historial:**
* Flujo: Usuario entra a "Historial de Rutas" -> El mapa muestra patrullas en color celeste (indicador de interactividad) -> Usuario hace clic en una patrulla -> Aparece el panel derecho con el reproductor de tiempo y se dibuja la ruta histórica en el mapa.
* Punto Crítico: La barra de reproducción de la ruta, que permite avanzar o retroceder temporalmente simulando el trayecto del vehículo.

### 5. Justificación Técnica de la Arquitectura Frontend

La decisión de utilizar un componente de mapa de fondo persistente y un menú lateral de navegación lateral (en Web) responde a criterios de eficiencia y rendimiento. Al cambiar entre "Monitoreo", "Geo-cercas" e "Historial", el sistema no recarga la instancia del mapa, sino que únicamente actualiza las capas de datos (pines, polígonos o líneas). El uso intensivo de modales (popups de alertas y perfil) protege el flujo de trabajo del operador, permitiéndole atender una emergencia (ej. Despachar Apoyo) en menos de 3 clics sin perder de vista la ubicación de las demás unidades, maximizando la usabilidad y la claridad estructural en momentos de estrés.
