# PyPlatformer: Python Learning Project

Este proyecto consiste en el desarrollo de un juego de plataformas utilizando Python y la libreria Pygame. El objetivo principal es la transicion de conceptos de programacion desde Java hacia la sintaxis y modismos de Python.

OBJETIVOS DEL PROYECTO
- Implementacion de un Game Loop (Ciclo de Vida del Juego).
- Gestion de Sprites y Grupos de Sprites para optimizar el renderizado.
- Simulacion de fisica basica: gravedad, aceleracion lateral y deteccion de colisiones.
- Arquitectura basada en Programacion Orientada a Objetos (POO).

ARQUITECTURA DEL CODIGO
El proyecto se divide en los siguientes modulos para mantener la escalabilidad:

- main.py: Punto de entrada del programa. Contiene la inicializacion de Pygame y el bucle principal de eventos.
- player.py: Definicion de la clase Player. Hereda de pygame.sprite.Sprite y gestiona el estado del personaje.
- settings.py: Almacena constantes de configuracion como dimensiones de resolucion, valores de fisica y paletas de colores.
- level.py: Gestiona la instancia de las plataformas y el entorno del juego.

REQUERIMIENTOS TECNICOS
- Python 3.x
- Pygame 2.x

CONTROLES
- Movimiento: Flechas de direccion (Izquierda / Derecha) o teclas A / D.
- Salto: Barra espaciadora o Flecha Arriba.
- Salir: Tecla ESC o cierre de ventana.

IMPLEMENTACION DE FISICA
La gravedad se calcula mediante la modificacion del vector de velocidad en el eje Y de forma incremental en cada frame, aplicando el limite de colision con el objeto suelo para resetear la aceleracion vertical.
