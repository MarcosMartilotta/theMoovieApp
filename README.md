# TheMoovieApp

Esta app fue construida integramente con JavaScript Vanilla, HTML y CSS. 
Permite visualizar las ultimas peliculas que salieron como así tambien las que son tendencia. Además se puede buscar por palabra clave y ver el detalle de cada una de ellas, como así también agregarlas a una lista de favoritos.

## Detalles técnicos
- Se utilizó git y github para manejar las versiones y alojar el sitio web.
- Está construida en un solo HTML para mejorar el tiempo de respuesta, implementando la paginación a travez del cambio de hash de cada petición a la API de TheMoovieDB. 
- Por el momento soporta inglés, español, francés y japonés en la respues de cada petición.
- Cada sección donde se cargan imágenes tienen implementado LazyLoading.
- Las películas favoritas son guardadas en el localStorage del navegador.
- Documentación de la API: https://developers.themoviedb.org/3/getting-started/introduction.


### Aclaraciones

Por el momento solo tiene soporte mobile.

Esta app fue propuesta en el Curso profesional de consumo de APIs REST impartido por Platzi.

