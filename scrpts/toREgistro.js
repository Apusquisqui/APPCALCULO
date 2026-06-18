

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


function mostrarResultado(datos) {
  document.getElementById('rrNombre').textContent = datos.nombre;
  document.getElementById('rrApellidos').textContent = datos.apellidos;
  document.getElementById('rrEdad').textContent = datos.edad;
  document.getElementById('rrSexo').textContent = datos.sexo;
  document.getElementById('rrDescripcion').textContent = datos.descripcion;

  resultado.hidden = false;
}

function bloquearFormulario() {
  Array.from(form.elements).forEach(function (campo) {
    campo.disabled = true;
  });
  botonRegistrar.textContent = 'Datos registrados';
}