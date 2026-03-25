# PyPlatformer: El Exilio de la Sombra

Este proyecto consiste en el desarrollo de un juego de plataformas con interfaz grafica (GUI) utilizando Python y la libreria Pygame. El objetivo principal es la transicion de conceptos de programacion desde Java hacia la sintaxis y modismos de Python.

LORE DEL JUEGO
En un reino de fantasia epica inspirado en el folklore medieval, el protagonista es un joven marginado que habita en una villa donde es objeto del desprecio colectivo. Su unico vinculo con la humanidad es una joven, la unica habitante que le ofrece trato y palabra. Tras la misteriosa desaparicion de la joven, la villa señala al protagonista como culpable. 

Forzado al exilio y movido por la necesidad de redencion, el joven se adentra en territorios desconocidos para encontrarla. A lo largo de su viaje, debera formar alianzas inesperadas, enfrentar enemigos ancestrales y evolucionar sus habilidades para sobrevivir en un mundo que lo rechaza.

OBJETIVOS DEL PROYECTO
- Implementacion de un Game Loop (Ciclo de Vida del Juego) estable a 60 FPS.
- Gestion de Sprites y Grupos de Sprites para optimizar el renderizado grafico.
- Simulacion de fisica: gravedad, aceleracion lateral y deteccion de colisiones.
- Arquitectura basada en Programacion Orientada a Objetos (POO).

ESPECIFICACIONES DE LA INTERFAZ (UI)
El juego se ejecuta en una ventana grafica independiente con las siguientes caracteristicas:
- Resolucion nativa: 800x600 pixeles.
- Renderizado de superficies (Surfaces) para personajes y entornos.
- Sistema de coordenadas: Origen (0,0) en la esquina superior izquierda.

ARQUITECTURA DEL CODIGO
- main.py: Punto de entrada, inicializacion de Pygame y bucle principal.
- player.py: Clase Player. Gestiona movimiento, fisica de salto y estados del heroe.
- settings.py: Constantes globales (colores RGB, variables de fisica, rutas).
- level.py: Gestion de plataformas, enemigos y scroll de pantalla.

REQUERIMIENTOS TECNICOS
- Python 3.x
- Pygame 2.x

CONTROLES DE USUARIO
- Movimiento: Flechas de direccion o teclas A / D.
- Salto: Barra espaciadora o Flecha Arriba.
- Salir: Tecla ESC o cierre de ventana.

IMPLEMENTACION DE FISICA
La gravedad se aplica mediante la modificacion del vector de velocidad vertical en cada frame. Las colisiones se detectan mediante la interseccion de los rectangulos de colision (AABB) entre el jugador y los elementos del nivel.
