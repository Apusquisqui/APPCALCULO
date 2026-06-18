

document.getElementById('registroForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const edad = document.getElementById('edad').value;
  const sexo = document.getElementById('sexo').value;
  const descripcion = document.getElementById('descripcion').value;

  agregarFila(nombre, apellidos, edad, sexo, descripcion);

  this.reset();
});

/**
 * Inserta una nueva fila en la tabla de registros con los datos
 * capturados del formulario.
 */
function agregarFila(nombre, apellidos, edad, sexo, descripcion) {
  const tabla = document.getElementById('tablaRegistro').getElementsByTagName('tbody')[0];
  const nuevaFila = tabla.insertRow();

  nuevaFila.innerHTML = `
    <td>${nombre}</td>
    <td>${apellidos}</td>
    <td>${edad}</td>
    <td>${sexo}</td>
    <td>${descripcion}</td>
  `;
}