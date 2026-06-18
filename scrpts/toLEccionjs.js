document.addEventListener('DOMContentLoaded', () => {
    // Manejar el desplazamiento suave a la sección anclada
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement && targetElement.tagName === 'DETAILS') {
            // Asegurar que la sección objetivo esté abierta
            targetElement.setAttribute('open', '');

            // Desplazamiento suave
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Efecto visual temporal (opcional)
                targetElement.style.borderColor = 'var(--success)';
                setTimeout(() => {
                    targetElement.style.borderColor = 'transparent';
                }, 2000);
            }, 100);
        }
    }


}); //Sirver para manejar el desplazamiento suave a la sección anclada cuando se carga la página. Si la sección es un elemento <details>, se asegura de que esté       
//  abierto antes de desplazarse hacia ella. Además, se agrega un efecto visual temporal para resaltar la sección objetivo.