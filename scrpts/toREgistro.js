/* ============================================
   REGISTRO.JS
   Lógica del formulario de registro de personas.

   Regla actual: el formulario solo se puede enviar una vez por
   sesión. Al enviarlo, se muestran los datos capturados en un
   panel de resultado y se deshabilita todo el formulario para
   impedir un segundo envío.

   No hay conexión a base de datos todavía: los datos viven solo
   en memoria/DOM mientras la pestaña está abierta. La función
   mostrarResultado() es el punto donde, más adelante, se
   reemplazará la simple visualización por un envío real (fetch)
   hacia el backend.
   ============================================ */

const form = document.getElementById('registroForm');
const resultado = document.getElementById('registroResultado');
const botonRegistrar = document.getElementById('btn-registro');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const datos = leerDatosFormulario();
  mostrarResultado(datos);
  bloquearFormulario();
});

/**
 * Lee los valores actuales de los campos del formulario y los
 * devuelve como un objeto simple.
 */
function leerDatosFormulario() {
  return {
    nombre: document.getElementById('nombre').value,
    apellidos: document.getElementById('apellidos').value,
    edad: document.getElementById('edad').value,
    sexo: document.getElementById('sexo').value,
    descripcion: document.getElementById('descripcion').value
  };
}

/**
 * Pinta los datos capturados en el panel de resultado y lo hace visible.
 */
function mostrarResultado(datos) {
  document.getElementById('rrNombre').textContent = datos.nombre;
  document.getElementById('rrApellidos').textContent = datos.apellidos;
  document.getElementById('rrEdad').textContent = datos.edad;
  document.getElementById('rrSexo').textContent = datos.sexo;
  document.getElementById('rrDescripcion').textContent = datos.descripcion;

  resultado.hidden = false;
}

/**
 * Deshabilita todos los campos y el botón para impedir un segundo registro.
 */
function bloquearFormulario() {
  Array.from(form.elements).forEach(function (campo) {
    campo.disabled = true;
  });
  botonRegistrar.textContent = 'Datos registrados';
}