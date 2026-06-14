// Declaramos como objeto la variable para almacenar la opción que elija el usuario
let opcionSeleccionada = null;
// Declaramos como booleano el estado del ejercicio, iniciándolo en falso
let ejercicioTerminado = false;

// Esta función manejará la acción cuando el usuario haga clic en una respuesta
function seleccionarOpcion(elementoBoton, tipoRespuesta) {
    // Evaluamos si el ejercicio ya se resolvió para evitar que sigan seleccionando
    if (ejercicioTerminado) return;

    // Este bucle recorrerá todos los botones para quitarles la clase de "seleccionado"
    document.querySelectorAll('.choice-btn').forEach(botonActual => {
        botonActual.classList.remove('selected');
    });

    // Le agregamos la clase "selected" únicamente al botón que presionamos
    elementoBoton.classList.add('selected');

    // Actualizamos nuestra variable guardando qué botón se presionó y si es correcta o incorrecta
    opcionSeleccionada = { elementoBoton, tipoRespuesta };
}

// Esta función verificará si la opción que escogimos es correcta y actualizará la pantalla
function comprobarRespuesta() {
    // Declaramos como constantes los elementos HTML con los que vamos a interactuar
    const botonComprobar = document.getElementById('btn-check');
    const cajaComentarios = document.getElementById('fb');

    // Evaluamos si el usuario no ha seleccionado ninguna opción todavía
    if (!opcionSeleccionada) {
        // Hacemos que el botón destelle para indicarle que debe elegir algo primero
        botonComprobar.style.filter = 'brightness(1.3)';
        setTimeout(() => botonComprobar.style.filter = '', 400);
        return;
    }

    // Marcamos el ejercicio como terminado
    ejercicioTerminado = true;

    // Evaluamos si el tipo de respuesta que elegimos es la correcta
    if (opcionSeleccionada.tipoRespuesta === 'correct') {
        // Modificamos las clases CSS para pintar la interfaz de verde y mostrar éxito
        opcionSeleccionada.elementoBoton.classList.replace('selected', 'correct');
        cajaComentarios.className = 'feedback-box ok';
        document.getElementById('fb-icon').className = 'ti ti-check fb-icon ok';
        document.getElementById('fb-title').className = 'fb-title ok';

        // Mostramos el mensaje de felicitación y explicamos el procedimiento
        document.getElementById('fb-title').textContent = '¡Correcto!';
        document.getElementById('fb-body').textContent = 'd/dx[x²] = 2x por la regla de potencias. Ahora sustituyes: f\'(x) = cos(x²) · 2x.';

        // Actualizamos los pasos matemáticos en pantalla para mostrar los resultados
        document.getElementById('dot3').className = 'step-dot done'; document.getElementById('dot3').textContent = '3';
        document.getElementById('tag3').className = 'step-tag done';
        document.getElementById('expr3').className = 'step-expr done'; document.getElementById('expr3').textContent = "u' = 2x ✓";
        document.getElementById('dot4').className = 'step-dot now';
        document.getElementById('tag4').className = 'step-tag now';
        document.getElementById('expr4').className = 'step-expr now'; document.getElementById('expr4').textContent = "f'(x) = 2x·cos(x²)";

        // Actualizamos el botón para que nos permita avanzar a la siguiente sección
        botonComprobar.textContent = 'IR A LECCIONES →';
        botonComprobar.onclick = () => location.href = 'lecciones.html';

    } else {
        // Si nos equivocamos, modificamos las clases CSS para pintar la interfaz de rojo
        opcionSeleccionada.elementoBoton.classList.replace('selected', 'wrong');
        cajaComentarios.className = 'feedback-box err';
        document.getElementById('fb-icon').className = 'ti ti-alert-triangle fb-icon err';
        document.getElementById('fb-title').className = 'fb-title err';

        // Mostramos el mensaje de error y damos una pista matemática
        document.getElementById('fb-title').textContent = '¡Revisa la regla de potencias!';
        document.getElementById('fb-body').textContent = 'd/dx[xⁿ] = n·xⁿ⁻¹ → baja el exponente y resta 1: d/dx[x²] = 2·x¹ = 2x';

        // Cambiamos el texto del botón y lo pintamos de rojo
        botonComprobar.textContent = 'INTENTAR OTRA VEZ';
        botonComprobar.className = 'btn-check red';

        // Reiniciamos las variables a su estado original para permitir jugar de nuevo
        ejercicioTerminado = false;
        opcionSeleccionada = null;

        // Configuramos qué sucederá al presionar "Intentar otra vez"
        botonComprobar.onclick = () => {
            // Este bucle recorrerá todos los botones para quitar los colores de error
            document.querySelectorAll('.choice-btn').forEach(botonActual => botonActual.className = 'choice-btn');
            // Ocultamos la caja de retroalimentación
            cajaComentarios.className = 'feedback-box';
            // Devolvemos el botón a su texto y color original
            botonComprobar.textContent = 'Comprobar';
            botonComprobar.className = 'btn-check';
            // Restauramos la función original de comprobar respuesta
            botonComprobar.onclick = comprobarRespuesta;
        };
    }
}