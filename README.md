# DOCUMENTACION TECNICA: ALPHA
## SISTEMA DE SIMULACION DE PRODUCCION DE SOFTWARE

### 1. RESUMEN EJECUTIVO
**ALPHA** es un entorno de simulación incremental diseñado para modelar el ciclo de vida de la producción de software, desde la generación manual de código hasta la implementación de infraestructuras autónomas de alta disponibilidad.

### 2. ARQUITECTURA DEL MOTOR
El sistema opera mediante un bucle de eventos asíncrono que procesa dos flujos de datos principales:

* **Input Manual (Click Power):** Procesamiento de interacciones directas del usuario para la generación inmediata de unidades de código (LoC).
* **Producción Pasiva (PPS):** Cálculo de rendimiento por segundo basado en la agregación de activos de infraestructura adquiridos.
* **Control de Densidad:** Sistema de renderizado dinámico ajustable para optimizar el consumo de recursos en el cliente.

### 3. ESPECIFICACIONES DE INFRAESTRUCTURA
El escalado de la producción en **ALPHA** se gestiona a través de seis niveles de activos técnicos:

* **Specialty Coffee:** Optimización metabólica para el incremento marginal de la tasa de producción base.
* **Mechanical Keyboards:** Mejora de hardware orientada a maximizar el rendimiento de la potencia por clic.
* **Junior Developers:** Escalado horizontal de recursos humanos para la generación continua de lógica.
* **AWS Nodes:** Instancias virtuales en la nube para el procesamiento masivo de datos y generación de LoC.
* **Bash Scripts:** Automatización lógica de procesos de sistema para la reducción de la intervención manual.
* **AI Auto-Coder:** Integración de redes neuronales para la generación autónoma de código de alto nivel.

### 4. PROTOCOLO DE DESPLIEGUE (PRESTIGIO)
La mecánica de "Deploy" permite la transición del entorno de desarrollo de **ALPHA** a una instancia de producción global.

* **Requisito de Activación:** El sistema debe haber generado un mínimo acumulado de 1,000,000 LoC.
* **Efecto de Reset:** La ejecución del despliegue liquida todos los activos actuales y el balance de LoC.
* **Puntos de Prestigio (PP):** Se otorgan puntos basados en el progreso, donde cada punto añade un bono permanente del 5% a la producción futura.

### 5. COMPONENTES DE TELEMETRIA Y UI
* **Consola de Sistema:** Registro de eventos en tiempo real con una pila de 5 líneas. Implementa un degradado de opacidad para priorizar la telemetría reciente.
* **Stream de Código:** Sistema de partículas visuales independiente que simula la actividad de la terminal mediante sintaxis Monokai.
* **Registro de Hitos:** Módulo de monitoreo de logros técnicos basados en volumen de producción y densidad de infraestructura.

### 6. INSTALACIÓN Y SETUP
Para ejecutar una instancia local del proyecto, siga estos pasos:

1. **Clonación:** Clonar este repositorio en su máquina local.
2. **Estructura:** Asegurar que los archivos `index.html`, `style.css`, `main.js` y `state.js` se encuentren en la misma raíz.
3. **Despliegue:** Abrir el archivo `index.html` en cualquier navegador moderno. 
4. **Recomendación:** Se recomienda el uso de extensiones como *Live Server* para una gestión óptima de la persistencia de datos en el `localStorage`.

### 7. MODELO MATEMATICO DE PROGRESIÓN
El incremento del coste de adquisición sigue una curva exponencial para garantizar el equilibrio del sistema a largo plazo:

$$Cost = BaseCost \times 1.4^{n}$$

**Donde:**
* **BaseCost:** Valor de entrada inicial del activo.
* **n:** Cantidad total de unidades de dicha infraestructura en el estado actual.