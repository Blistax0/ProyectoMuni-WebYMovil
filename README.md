# Proyecto Final: Ingeniería Web y Móvil - Seguridad Municipal Santo Domingo

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

# Sistema de Gestión de Patrullaje Preventivo - Santo Domingo

Este proyecto consiste en una plataforma integral diseñada para optimizar la seguridad pública mediante la digitalización del patrullaje, permitiendo una respuesta coordinada y basada en datos tácticos.

---

## 3. Justificación del Problema (EP 1.2)

El municipio de Santo Domingo enfrenta desafíos de seguridad en sectores residenciales y costeros con baja organización vecinal y focos de incivilidades. Actualmente, la gestión depende de bitácoras físicas o planillas Excel, lo que genera:

- **Invisibilidad operativa:** Falta de control sobre la ubicación de las unidades.
- **Pérdida de información:** Reportes manuales propensos a errores.
- **Respuesta lenta:** Dificultad para coordinar recursos en tiempo real.

La digitalización permite una respuesta basada en **georreferenciación táctica inmediata**, mejorando la eficiencia y la percepción de seguridad ciudadana.

---

## 4. Requerimientos del Sistema (EP 1.1)

### 4.1 Requerimientos Funcionales (RF)

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

### 4.2 Requerimientos No Funcionales (RNF)

- **Rendimiento:** Latencia GPS < 2s para un seguimiento fluido en emergencias.
- **Seguridad:** Autenticación mediante **JWT (JSON Web Tokens)** para proteger la integridad de datos sensibles de seguridad pública.
- **Usabilidad (UI/UX Situacional):** Interfaz de alto contraste y componentes de gran escala para uso óptimo bajo luz solar y en movimiento.

---

## 5. Gestión del Proyecto

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
