# ⌨️ DevOps Tycoon: The Incremental Coder

**DevOps Tycoon** es un juego incremental (clicker) desarrollado íntegramente con **Vanilla JavaScript**. El proyecto simula la carrera de un desarrollador, desde escribir líneas de código manualmente hasta automatizar una infraestructura global de servidores e IAs.

Este proyecto ha sido creado por **IsaacJrzz** para demostrar habilidades en gestión de estados, lógica matemática de escalado y manipulación eficiente del DOM.

---

## 🕹️ Cómo jugar (Sin instalación)

Este proyecto es una aplicación web estática, por lo que **no requiere configurar ningún entorno ni instalar dependencias**.

1.  **Local:** Descarga los archivos del repositorio.
2.  **Ejecución:** Abre el archivo `index.html` en cualquier navegador (Chrome, Firefox, Brave, etc.).
3.  **Live Demo:** [¡Juega el Demo aquí!](https://IsaacJrzz.github.io/devops-tycoon/) *(Activa GitHub Pages en tu repo para que este link funcione)*

---

## 🛠️ Stack Tecnológico

* **JavaScript (ES6+):** Motor lógico, cálculos de producción y manejo de eventos.
* **HTML5:** Estructura de la interfaz y contenedores dinámicos.
* **CSS3:** Diseño estilo "Retro Terminal" con **CSS Grid** para una distribución limpia y profesional.

---

## 🚀 Desafíos Técnicos Resueltos

### 1. Motor de Cálculo (Game Loop)
Implementé un `setInterval` que procesa los ingresos pasivos cada 100ms. Esto asegura que la progresión de las líneas de código (`LoC`) sea fluida y visualmente atractiva para el usuario.

### 2. Algoritmo de Escalado Exponencial
Para balancear la economía del juego, utilicé la fórmula:
$$Precio = Base \times 1.15^{Cantidad}$$
Esto garantiza que el jugador siempre tenga un objetivo desafiante y evita que el juego se vuelva monótono rápidamente.

### 3. Persistencia de Datos (LocalStorage)
El juego incluye un sistema de guardado automático. Los datos del usuario (puntos, mejoras compradas y precios actuales) se almacenan en el navegador, permitiendo retomar la partida incluso después de cerrar la sesión.

---

## 📂 Estructura del Código

El código está organizado de forma modular para facilitar su lectura:

* **State Management:** Un objeto centralizado que actúa como única fuente de verdad.
* **UI Update System:** Funciones dedicadas a renderizar los cambios solo cuando es necesario, optimizando el rendimiento del navegador.

---

Desarrollado con ☕ por **IsaacJrzz**.