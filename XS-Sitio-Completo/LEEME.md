# Sitio completo de Xavier Serbia · GitHub Pages + Wix

Paquete preparado para el repositorio `xserbia/xavierserbia-site`, en una nueva carpeta `xs-2026/`.
La versión existente no se reemplaza. Este paquete todavía no está publicado en GitHub ni insertado en Wix.

## Contenido

- `xs-2026/index.html`: Home y los tres videos más recientes.
- `xs-2026/tu-dinero.html`: Fórmula Dinero, Cada Menudo y El Menudo Cuenta.
- `xs-2026/videos.html`: reproductor de YouTube y últimas 15 publicaciones.
- `xs-2026/contacto.html`: correos, WhatsApp sin número visible y redes.
- `xs-2026/descargo-de-responsabilidad.html`.
- `xs-2026/terminos-y-condiciones.html`: español e inglés.
- `xs-2026/politicas-de-privacidad.html`: español e inglés.
- Imágenes, código de los videos y copia inicial de las publicaciones en `xs-2026/assets/`.

## 1. Publicar en GitHub

1. Descomprime el ZIP.
2. Agrega la carpeta `xs-2026/` a la raíz de `xserbia/xavierserbia-site`, en la rama de publicación. No reemplaces el `index.html` actual del repositorio.
3. Para actualizar automáticamente los videos, agrega también el archivo `.github/workflows/xs-youtube.yml` a esa ruta exacta en la raíz del repositorio (la carpeta empieza por un punto).
4. El flujo incluido supone que GitHub Pages publica desde la rama predeterminada y la carpeta raíz (`/(root)`), mediante **Deploy from a branch**. Compruébalo en Settings → Pages. Si utilizas otro sistema de publicación, integra el paso `python3 xs-2026/scripts/update_youtube.py` en tu flujo existente, antes de publicar; no cambies la configuración sin revisar el resto del sitio.
5. Con la publicación de Pages completada, abre la dirección prevista:
   `https://xserbia.github.io/xavierserbia-site/xs-2026/`
   Esta es una dirección de destino; no estará disponible hasta subir y publicar los archivos.

## 2. Mostrar TODO el sitio dentro de Wix

Opción más sencilla: **Añadir elementos → Incrustar código → Incrustar un sitio**. Pega la dirección HTTPS de GitHub Pages cuando ya funcione.

También puedes elegir **Incrustar HTML** y pegar el contenido de `WIX-EMBED.html`. Ese archivo apunta a la misma dirección prevista.

- Utiliza una página Wix de ancho completo y, si corresponde a tu diseño, sin header/footer adicionales para evitar duplicarlos.
- Ajusta el elemento incrustado por separado en escritorio y móvil. Comienza con unos 900 px de alto en escritorio y 760 px en móvil; son puntos de partida, no altura automática.
- El sitio se desplaza **dentro del bloque**. Se eligió esta opción sencilla porque las páginas legales y los videos tienen longitudes muy distintas. Este paquete no ajusta automáticamente la altura del elemento externo de Wix.
- Los enlaces internos navegan dentro del sitio incrustado. YouTube, las redes y WhatsApp se abren en una pestaña aparte; los correos abren el programa de email.
- Prueba la web **publicada** en Wix, especialmente en móvil: Wix y el navegador controlan los permisos del iframe y los enlaces externos.

## 3. Actualización de videos sin servidor privado

El flujo de GitHub consulta cada hora el feed público de YouTube del canal `@xavierserbia`, actualiza `assets/youtube-videos.json` cuando hay cambios y solicita una reconstrucción de Pages.

- El Home muestra tres videos; Videos muestra los últimos 15 que entrega el feed, con acceso al canal completo.
- No necesita una clave de YouTube ni el sitio privado de ChatGPT.
- GitHub puede retrasar las ejecuciones programadas. En repositorios públicos sin actividad puede desactivar la programación después de 60 días. Revisa Actions si no aparecen novedades; también puedes ejecutar el flujo manualmente.
- El flujo requiere `contents: write` para guardar el archivo y `pages: write` para pedir la reconstrucción; ambas autorizaciones están declaradas en el archivo. Las políticas de tu repositorio pueden restringirlas.
- Si YouTube falla, el script conserva los videos existentes y marca la ejecución como fallida; no publica una lista vacía.
- No muestra automáticamente todos los videos históricos: el feed entrega las publicaciones recientes y el reproductor/enlace al canal permiten continuar en YouTube.

## Ediciones posteriores

Edita los archivos dentro de `xs-2026/` y vuelve a publicarlos en GitHub. Wix carga esa versión; no hace falta volver a pegar el diseño.

## Documentación

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
- https://support.wix.com/en/article/wix-editor-embedding-a-site-or-a-widget

## Versión móvil actualizada

Menú en acordeón, header fijo, fotografía antes de la biografía, bio breve y formación académica desplegable, redes con iconos y enlaces legales compactos. El reproductor se adapta al ancho del móvil. Revisado en anchos de 320, 375 y 430 px dentro de un iframe de prueba. La integración final debe comprobarse en Wix publicado.

## Ajuste de Tu Dinero

Se eliminó el bloque inicial «TU DINERO · TU SIGUIENTE PASO». Fórmula Dinero incluye el botón principal «Comienza tu evaluación» y el gráfico aparece antes del texto en móvil. El header permanece fijo también en escritorio.
