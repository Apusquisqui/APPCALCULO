const form = document.getElementById('registroForm');
const resultado = document.getElementById('registroResultado');
const botonRegistrar = document.getElementById('btn-registro');

// Controlar en tiempo real que no se metan números en el nombre ni apellidos (Opcional pero recomendado)
const inputNombre = document.getElementById('nombre');
const inputApellidos = document.getElementById('apellidos');

[inputNombre, inputApellidos].forEach(input => {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/[0-9]/g, '');
  });
});

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
    usuario: document.getElementById('usuario').value,
    contrasena: document.getElementById('contrasena').value
  };
}

function mostrarResultado(datos) {
  document.getElementById('rrNombre').textContent = datos.nombre;
  document.getElementById('rrApellidos').textContent = datos.apellidos;
  document.getElementById('rrEdad').textContent = datos.edad;
  document.getElementById('rrSexo').textContent = datos.sexo;
  document.getElementById('rrUsuario').textContent = datos.usuario;

  // Para no mostrar la contraseña real en el resumen, la cambiamos por asteriscos equitativos a su tamaño
  document.getElementById('rrContrasena').textContent = '•'.repeat(datos.contrasena.length);

  resultado.hidden = false;
}

function bloquearFormulario() {
  Array.from(form.elements).forEach(function (campo) {
    campo.disabled = true;
  });
  botonRegistrar.textContent = 'Datos registrados';
}