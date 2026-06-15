/* sidebar.js — shared navigation logic */

(function () {
  const sb = document.getElementById('sidebar');
  if (!sb) return;

  /* toggle open/close */
  document.getElementById('sb-toggle').addEventListener('click', function () {
    sb.classList.toggle('open');
    document.body.classList.toggle('sb-open');
  });

  /* mark active link based on current filename */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sb-item[data-page]').forEach(function (el) {
    if (el.dataset.page === page) el.classList.add('active');
  });
})();

// Función para colapsar/desplegar unidades en PAG. lecciones
    function toggleUnit(unitId) {
      const unit = document.getElementById(unitId);
      if (unit) {
        unit.classList.toggle('collapsed');
      }
    }