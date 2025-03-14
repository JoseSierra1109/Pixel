/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Manejo de comentarios
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');
    
    // Cargar comentarios guardados en localStorage (si existen)
    loadComments();
    
    // Manejar envío de comentarios
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
            
            const name = document.getElementById('commentName').value;
            const text = document.getElementById('commentText').value;
            
            if (name && text) {
                // Crear nuevo comentario
                addComment(name, text);
                
                // Limpiar formulario
                commentForm.reset();
            }
        });
    }
    
    // Función para añadir un comentario
    function addComment(name, text) {
        // Crear elemento de comentario
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card card mb-3';
        
        // Fecha actual
        const now = new Date();
        const dateText = 'Justo ahora';
        
        // Contenido del comentario
        commentCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${text}</p>
                <p class="card-subtitle text-muted small">${dateText}</p>
            </div>
        `;
        
        // Añadir al inicio del contenedor
        if (commentsContainer.firstChild) {
            commentsContainer.insertBefore(commentCard, commentsContainer.firstChild);
        } else {
            commentsContainer.appendChild(commentCard);
        }
        
        // Guardar en localStorage
        saveComment(name, text, now);
    }
    
    // Guardar comentario en localStorage
    function saveComment(name, text, date) {
        // Obtener comentarios existentes
        let comments = JSON.parse(localStorage.getItem('siteComments')) || [];
        
        // Añadir nuevo comentario
        comments.unshift({
            name: name,
            text: text,
            date: date.toString()
        });
        
        // Limitar a 50 comentarios máximo
        if (comments.length > 50) {
            comments = comments.slice(0, 50);
        }
        
        // Guardar en localStorage
        localStorage.setItem('siteComments', JSON.stringify(comments));
    }
    
    // Cargar comentarios desde localStorage
    function loadComments() {
        if (!commentsContainer) return;
        
        // Obtener comentarios guardados
        const comments = JSON.parse(localStorage.getItem('siteComments')) || [];
        
        // Si hay comentarios guardados, limpiar los ejemplos
        if (comments.length > 0) {
            commentsContainer.innerHTML = '';
        }
        
        // Añadir cada comentario al contenedor
        comments.forEach(comment => {
            const commentDate = new Date(comment.date);
            const now = new Date();
            
            // Calcular tiempo transcurrido
            const diffTime = Math.abs(now - commentDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            
            let dateText;
            if (diffDays > 0) {
                dateText = `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
            } else if (diffHours > 0) {
                dateText = `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
            } else if (diffMinutes > 0) {
                dateText = `Hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
            } else {
                dateText = 'Justo ahora';
            }
            
            // Crear elemento de comentario
            const commentCard = document.createElement('div');
            commentCard.className = 'comment-card card mb-3';
            
            // Contenido del comentario
            commentCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${comment.name}</h5>
                    <p class="card-text">${comment.text}</p>
                    <p class="card-subtitle text-muted small">${dateText}</p>
                </div>
            `;
            
            // Añadir al contenedor
            commentsContainer.appendChild(commentCard);
        });
    }

    // Manejo de videos (código existente)
    const videoItems = document.querySelectorAll('.portfolio-item[data-media-type="video"]');
    videoItems.forEach(item => {
        const iconElement = item.querySelector('.portfolio-item-caption-content i');
        if (iconElement && iconElement.classList.contains('fa-plus')) {
            iconElement.classList.remove('fa-plus');
            iconElement.classList.add('fa-play');
        }
    });
    
    const portfolioModals = document.querySelectorAll('.portfolio-modal');
    portfolioModals.forEach(function(modal) {
        modal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const mediaType = button.getAttribute('data-media-type');
            
            if (mediaType === 'video') {
                const videoSrc = button.getAttribute('data-video-src');
                const videoContainer = modal.querySelector('.video-container');
                
                if (!videoContainer) {
                    const imgElement = modal.querySelector('.img-fluid.rounded.mb-5');
                    if (imgElement) {
                        const newVideoContainer = document.createElement('div');
                        newVideoContainer.className = 'video-container mb-5';
                        
                        const videoElement = document.createElement('video');
                        videoElement.className = 'img-fluid rounded';
                        videoElement.controls = true;
                        
                        const sourceElement = document.createElement('source');
                        sourceElement.src = videoSrc;
                        sourceElement.type = 'video/mp4';
                        
                        videoElement.appendChild(sourceElement);
                        videoElement.appendChild(document.createTextNode('Tu navegador no soporta videos HTML5.'));
                        newVideoContainer.appendChild(videoElement);
                        
                        imgElement.parentNode.replaceChild(newVideoContainer, imgElement);
                    }
                }
            }
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            const videoElements = modal.querySelectorAll('video');
            videoElements.forEach(video => {
                if (video) {
                    video.pause();
                }
            });
        });
    });
});
