

const msgs = {
  '1': { ok: '¡Bien! d/dx[x⁵] = 5x⁴ → baja el 5 y resta 1 al exponente.', err: 'Recuerda: d/dx[xⁿ] = n·xⁿ⁻¹. Para x⁵ → 5·x⁴, no olvides el coeficiente.' },
  '2': { ok: '¡Correcto! Derivas término a término: 3·4x³ = 12x³, −2·1 = −2, constante 7 → 0.', err: 'Aplica linealidad: deriva cada término por separado. La constante 7 desaparece.' },
  '3': { ok: '¡Exacto! Cadena: 4(2x+1)³ · d/dx[2x+1] = 4(2x+1)³ · 2 = 8(2x+1)³.', err: 'Falta multiplicar por la derivada interior. d/dx[2x+1] = 2, no olvides ese factor.' }
};

// Estructuras de estado global para controlar las elecciones de usuario y ejercicios resueltos
const picks = {};
const done = {};

// ── GESTIÓN INTERACTIVA DE EJERCICIOS (CARDS) ──
// Controlamos la selección visual de las alternativas dentro de cada tarjeta
function ecPick(el, id, type) {
  if (done[id]) return; // Si el ejercicio ya está resuelto con éxito, bloqueamos nuevas interacciones

  // Limpiamos las clases de selección previa en el contenedor del ejercicio actual
  el.closest('.ex-card-body').querySelectorAll('.ec-choice').forEach(c => c.classList.remove('sel'));

  // Marcamos de forma plana la opción elegida y registramos sus propiedades temporalmente
  el.classList.add('sel');
  picks[id] = { el, type };
}

// Evaluamos la respuesta seleccionada por el usuario y actualizamos dinámicamente la interfaz
function ecCheck(id) {
  if (!picks[id]) return; // Forzamos el flujo para asegurar que exista una opción marcada antes de evaluar

  done[id] = true;
  const p = picks[id];
  const fb = document.getElementById('fb' + id);
  const btn = document.getElementById('btn' + id);

  p.el.classList.remove('sel');

  // Evaluamos el estado interactivo del ejercicio (Correcto / Incorrecto)
  if (p.type === 'correct') {
    p.el.classList.add('correct');
    fb.className = 'ec-feedback ok';
    fb.textContent = msgs[id].ok;

    // Configuramos el botón con un diseño plano de éxito y removemos sus eventos
    btn.textContent = '✓ Correcto';
    btn.style.background = 'var(--accent)';
    btn.style.cursor = 'default';
    btn.onclick = null;
  } else {
    p.el.classList.add('wrong');
    fb.className = 'ec-feedback err';
    fb.textContent = msgs[id].err;

    // Modificamos el botón a un estado de alerta/error para permitir el reintento
    btn.textContent = 'Intentar otra vez';
    btn.className = 'ec-btn red';

    // Reestablecemos las banderas locales para desbloquear la tarjeta
    done[id] = false;
    picks[id] = null;

    // Sobrescribimos el evento de clic para reiniciar el flujo del ejercicio
    btn.onclick = function () {
      p.el.classList.remove('wrong');
      fb.className = 'ec-feedback';
      btn.textContent = 'Comprobar';
      btn.className = 'ec-btn';
      btn.onclick = () => ecCheck(id);
    };
  }
}

// ── SISTEMA DE FILTRADO COMBINADO (MÓDULO DE PRÁCTICA) ──
// Declaramos las variables de control de filtrado por defecto (Muestran todo al inicio)
let ruleFilter = 'all', diffFilter = 'all';

// Gestionamos el cambio de filtro según la regla matemática seleccionada
function filterRule(btn, val) {
  ruleFilter = val;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active'); // Evaluamos visualmente el estado del botón seleccionado
  applyFilters();
}

// Gestionamos el cambio de filtro según el nivel de dificultad conceptual
function filterDiff(btn, val) {
  diffFilter = val;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active'); // Evaluamos visualmente el estado del botón seleccionado
  applyFilters();
}

// Evaluamos y aplicamos de forma limpia los criterios cruzados sobre las tarjetas del DOM
function applyFilters() {
  document.querySelectorAll('.ex-card').forEach(card => {
    // Comprobamos la coincidencia de metadatos dataset de cada tarjeta
    const rOk = ruleFilter === 'all' || card.dataset.rule === ruleFilter;
    const dOk = diffFilter === 'all' || card.dataset.diff === diffFilter;

    // Actualizamos la visibilidad en pantalla aplicando o removiendo el despliegue plano
    card.style.display = (rOk && dOk) ? '' : 'none';
  });
}

