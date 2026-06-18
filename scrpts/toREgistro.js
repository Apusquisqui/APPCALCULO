const form = document.getElementById('registroForm');
const resultado = document.getElementById('registroResultado');
const botonRegistrar = document.getElementById('btn-registro');
const inputNombre = document.getElementById('nombre');
const inputApellidos = document.getElementById('apellidos');

// ── Bloquear números en nombre y apellidos ─────────────────────────────────
[inputNombre, inputApellidos].forEach(input => {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/[0-9]/g, '');
  });
});

// ── Envío del formulario ───────────────────────────────────────────────────
form.addEventListener('submit', async function (event) {
  event.preventDefault();

  botonRegistrar.disabled = true;
  botonRegistrar.textContent = 'Registrando…';

  const datos = leerDatosFormulario();

  try {
    const respuesta = await fetch('scrpts/registro.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const json = await respuesta.json();

    if (json.ok) {
      mostrarResultado(datos);
      bloquearFormulario();
    } else {
      // Mostrar el error devuelto por PHP sin bloquear el formulario
      mostrarError(json.msg);
      botonRegistrar.disabled = false;
      botonRegistrar.textContent = 'Registrar datos';
    }

  } catch (err) {
    mostrarError('No se pudo conectar con el servidor. Verifica que XAMPP esté activo.');
    botonRegistrar.disabled = false;
    botonRegistrar.textContent = 'Registrar datos';
  }
});

// ── Funciones auxiliares ───────────────────────────────────────────────────
function leerDatosFormulario() {
  return {
    nombre: document.getElementById('nombre').value.trim(),
    apellidos: document.getElementById('apellidos').value.trim(),
    edad: document.getElementById('edad').value,
    sexo: document.getElementById('sexo').value,
    usuario: document.getElementById('usuario').value.trim(),
    contrasena: document.getElementById('contrasena').value
  };
}

function mostrarResultado(datos) {
  document.getElementById('rrNombre').textContent = datos.nombre;
  document.getElementById('rrApellidos').textContent = datos.apellidos;
  document.getElementById('rrEdad').textContent = datos.edad;
  document.getElementById('rrSexo').textContent = datos.sexo;
  document.getElementById('rrUsuario').textContent = datos.usuario;
  document.getElementById('rrContrasena').textContent = '•'.repeat(datos.contrasena.length);

  // Quitar nota de "solo en sesión" ahora que hay BD real
  const nota = document.querySelector('.rr-nota');
  if (nota) nota.remove();

  resultado.hidden = false;
}

function bloquearFormulario() {
  Array.from(form.elements).forEach(campo => campo.disabled = true);
  botonRegistrar.textContent = 'Datos registrados';
}

function mostrarError(mensaje) {
  // Reutilizar o crear un párrafo de error debajo del botón
  let errEl = document.getElementById('registro-error');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = 'registro-error';
    errEl.style.cssText = 'color:var(--danger,#e05);font-size:13px;margin-top:10px;';
    botonRegistrar.insertAdjacentElement('afterend', errEl);
  }
  errEl.textContent = mensaje;
}