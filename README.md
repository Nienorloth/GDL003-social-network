# Comunidad escolar
![comunidad escolar](https://cdn140.picsart.com/302118120020201.png?r1024x1024)

## Índice
- [Introducción](#introducción)
- [¿Qué necesidades satisface Comunidad escolar?](#¿qué-necesidades-satisface-comunidad-escolar?)
- [Historias de usuario](#historias-de-usuario)
- [Encuestas Usuario](#encuestas-usuario)
- [Prototipo de Baja Fidelidad](#prototipo-de-baja-fidelidad)
- [Prototipo de Alta Fidelidad](#prototipo-de-alta-fidelidad)
- [Documentación y herramientas utilizadas](#documentación-y-herramientas-utilizadas)
---

## Introducción
  Red social para la comunidad de una escuela/colegio ([Nivel básico](http://www.sems.gob.mx/en_mx/sems/ems_sistema_educativo_nacional)), donde los padres de familia pueden mantenerse enterados sobre eventos, reuniones, dar seguimiento al desempeño de sus hij@s y mantenerse en contacto con el personal de la escuela, profesores y otros padres de familia de una manera organizada y oportuna.

---

## ¿Qué necesidades satisface Comunidad escolar?
- Registro privado solo para padres de familia autorizados mediante validación de correo electrónico.
- Consulta de manera rápida y oportuna a través de cualquier dispositivo electrónico.
- Contacto directo con los profesores, personal docente y padres de familia.
- Plataforma intuitiva para consultar, organizar, comunicar y planear actividades/asuntos escolares.
- Proporciona mayor flexibilidad a los padres/tutores que trabajan para estar al pendiente de los asuntos escolares de sus hij@s.

---

## Historias de usuario
### Historia de usuario 1
  El usuario requiere poder crear una cuenta con su e-mail, una contraseña y un código de verificación para posteriormente iniciar sesión.
  - DoD:
    - Pantalla de registro con campos para ingresar correo, nombre de usuario, contraseña, confirmación de contraseña, código de verificación y botón de enviar.
    - Función para registrar los datos en Firebase.
    - Notificación/Alerta de cuenta creada exitosamente.
    - Validaciones de error de todos los campos.

### Historia de usuario 2
  El usuario requiere poder iniciar sesión en la aplicación con su correo y contraseña para poder ver la información para padres de familia.
  - DoD:
    - Pantalla de inicio de sesión con campos para ingresar correo, contraseña y botón de ingresar.
    - Función para ingresar a la pantalla principal.
    - Validaciones de error de todos los campos.

### Historia de usuario 3
El usuario requiere editar su información personal en el perfil de usuario para poder establecer su identidad.
  - DoD:
    - Pantalla/modal de perfil de usuario.
    - Función para subir una imagen a Firebase.
    - Función para mostrar su correo y nombre de usuario.
    - Validaciones de error de todos los campos.

### Historia de usuario 4
El usuario requiere poder hacer publicaciones y que se muestren en un muro para compartir información con otros padres de familia.
  - DoD:
    - Pantalla/muro donde se mostraran las publicaciones.
    - Campo para ingresar texto con botón de publicar.
    - Función para ingresar publicaciones en Firebase.
    - Función para traer las publicaciones de Firebase e imprimirlas en html.
    - Ordenar las publicaciones por fecha.
    - Añadir nombre de usuario en cada publicación.
    - Añadir fecha/hora en cada publicación.
    - Validación de error del campo de texto (que no este vacío).

### Historia de usuario 5
El usuario requiere poder eliminar publicaciones de su muro.
  - DoD:
    - Función para eliminar publicaciones de Firebase.
    - Función para eliminar publicaciones solo del usuario activo.
    - Mensajes de confirmación antes de eliminar.
    - Botones de aceptar y cancelar.

### Historia de usuario 6
El usuario requiere editar publicaciones.
  - DoD:
    - Función para editar/actualizar publicaciones en Firebase.
    - Función para editar publicaciones en el mismo sitio del texto.
    - Botón de editar.
    - Mensaje de confirmación.

### Historia de usuario 7
El usuario requiere poder reaccionar a cada publicación.
  - DoD:
    - Botón/emoji de reacción hacia las publicaciones.
    - Función para contar las reacciones e imprimirlas en html.
    - Función para agregar el conteo en Firebase y ligarlo con el usuario y con la publicación.

### Historia de usuario 8
El usuario requiere poder definir la privacidad de sus publicaciones.
  - DoD:
    - Lista desplegable con opción de privado y amigos.
    - Función para ocultar o desocultar publicaciones.

### Historia de usuario 9
El usuario requiere poder buscar otros usarios para poder enviar mensajes directos a través de un chat.
  - DoD:
    - Pantalla para ver y agregar amigos.
    - Función para almacenar amigos/contactos en Firebase según el ID de usuario.
    - Botón de agregar amigos.
    - Botón de eliminar amigos.
    - Función para enviar por correo electrónico solicitudes de amistad.
    - Función para borrar contactos.
    - Mensaje de confirmación para eliminar amigos.

---

## Encuestas Usuario
La encuesta fue aplicada a 18 padres de familia.
Los [Resultados](https://es.surveymonkey.com/results/SM-7RTXL22L7/) fueron los siguientes:
- El 47% de los encuestados reciben notificaciones por parte de la escuela mediante notas en el cuaderno de recados de sus hij@s, y el 41% por avisos impresos.
- La mayoría de los encuestados trabaja y requieren pedir permiso o pedir ayuda a algún familiar para poder cumplir con los requerimientos de la escuela.
- La mayoría de los encuestados monitorea el desempeño de sus hij@s mediante las tareas, calificaciones o hasta que hay juntas escolares y pueden preguntarle a los maestr@s.
- El 64% de los encuestados acude en persona para platicar o solicitar espacios con profesores y/o personal docente, mientras que el 17% utiliza el WhatsApp.
- Los encuestados consideran como esenciales las siguientes herramientas  para una red social interna de la escuela de sus hij@s:
  - Calendario con avisos y notificaciones de las diversas actividades escolares (juntas, exámenes, eventos, pago de colegiaturas, etc.).
  - Opción para mensajes directos (chat).
  - Apartado para consultar documentación de juntas y/o reuniones.
  - Sección para consultar las calificaciones de los alumnos de manera privada.
  - Publicación de fotos y videos de eventos escolares.
  - Espacio para comentar sobre diversos temas en relación a la escuela.
- El 100% de los encuestados considera importante la participación de los padres de familia en asuntos escolares para el desarrollo óptimo de los alumnos.

---

## Prototipo de Baja Fidelidad

- [Prototipo de Baja Fidelidad](https://cdn130.picsart.com/302124679107201.png?r1024x1024)

![](https://cdn130.picsart.com/302124679107201.png?r1024x1024)

---

## Prototipo de Alta Fidelidad
- [Prototipo de Alta Fidelidad](https://www.figma.com/file/FMXR18pm5ukpbqfQpw1NIAsO/Red-social?node-id=0%3A1)

---

## Documentación y herramientas utilizadas
- Prototipos: Mypaint y Figma.
- Encuestas: Survey Monkey.
- Base de datos: Firebase.
- Inicio en Firebase: [Documentacion de Firebase](https://firebase.google.com/docs/web/setup/?authuser=0#configure-to-use-firebase) y [Video tutorial de YouTube](https://www.youtube.com/watch?v=e6aoUnLQBAw&t=2512s).
- Registro de usuarios: [Documentacion de Firebase](https://firebase.google.com/docs/auth/web/start?authuser=0) y [Video tutorial de YouTube](https://www.youtube.com/watch?v=wkdCpktUfGg&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=5).
- Ingreso de usuarios: [Documentacion de Firebase](https://firebase.google.com/docs/auth/web/start?authuser=0) y [Video tutorial de YouTube](https://www.youtube.com/watch?v=JWeoQn6KB0o&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=7).
- Cierre de sesión: [Video tutorial de YouTube](https://www.youtube.com/watch?v=eS-yU_6aKEE&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=6).
- Perfil de usuario: [Documentacion de Firebase](https://firebase.google.com/docs/storage/web/upload-files?hl=es-419#full_example) y [Video tutorial de YouTube](https://www.youtube.com/watch?v=i3WdUCvCQSU).
- Publicación de posts/comentarios: [Video tutorial de YouTube](https://www.youtube.com/watch?v=cb8H_hp10rc&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=7).
- Eliminar publicaciones: [Documentacion de Firebase](https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=es-419) y [Video tutorial de YouTube](https://www.youtube.com/watch?v=UZqXcoqC95E&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=5).
- Creación de perfil de usuario: [Video tutorial de YouTube](https://www.youtube.com/watch?v=qWy9ylc3f9U&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=15).
- Creación de reglas de seguridad: [Documentacion de Firebase](https://firebase.google.com/docs/firestore/security/rules-structure), [Video tutorial de YouTube](https://www.youtube.com/watch?v=d0RK2bpRVgo&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=10), [Video tutorial de YouTube](https://www.youtube.com/watch?v=rgBDotX_65Q&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=12), [Video tutorial de YouTube](https://www.youtube.com/watch?v=B2E30lXp5EI&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=16).
