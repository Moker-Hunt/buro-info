// Funcionalidad principal para buro-info.com - Versión mejorada

// Prevenir errores de promesas no capturadas
window.addEventListener('unhandledrejection', function(event) {
    console.log('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ')');
    event.preventDefault();
});

// Prevenir errores de mensajes asíncronos
window.addEventListener('error', function(event) {
    console.log('Error capturado:', event.error);
    // Prevenir que el error se propague
    event.preventDefault();
    return true;
});

document.addEventListener('DOMContentLoaded', function() {
    // Navegación responsiva mejorada
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const body = document.body;
    
    // Marcar la página actual como activa en la navegación
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinkAnchors = document.querySelectorAll('.nav-links a');
        if (navLinkAnchors && navLinkAnchors.length > 0) {
            navLinkAnchors.forEach(link => {
                try {
                    const href = link.getAttribute('href');
                    if (href === currentPage || (currentPage === 'index.html' && href === '/')) {
                        link.classList.add('active');
                    }
                } catch (e) {
                    console.log('Error al marcar página activa:', e);
                }
            });
        }
    } catch (e) {
        console.log('Error en navegación:', e);
    }
    
    // Mejorar la navegación móvil
    if (burger && nav) {
        burger.addEventListener('click', function() {
            try {
                // Toggle nav
                nav.classList.toggle('nav-active');
                
                // Toggle body scroll
                if (body) body.classList.toggle('menu-open');
                
                // Animate links
                if (navLinks && navLinks.length > 0) {
                    navLinks.forEach((link, index) => {
                        if (link) {
                            if (link.style.animation) {
                                link.style.animation = '';
                            } else {
                                link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7 + 0.2}s`;
                            }
                        }
                    });
                }
                
                // Burger animation
                this.classList.toggle('toggle');
            } catch (e) {
                console.log('Error en toggle de navegación:', e);
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        if (navLinks && navLinks.length > 0) {
            navLinks.forEach(link => {
                if (link) {
                    link.addEventListener('click', () => {
                        try {
                            if (nav && nav.classList.contains('nav-active')) {
                                nav.classList.remove('nav-active');
                                if (burger) burger.classList.remove('toggle');
                                if (body) body.classList.remove('menu-open');
                                
                                // Reset animations
                                navLinks.forEach(navLink => {
                                    if (navLink) navLink.style.animation = '';
                                });
                            }
                        } catch (e) {
                            console.log('Error al cerrar menú:', e);
                        }
                    });
                }
            });
        }
    }
    
    // Manejo mejorado del scroll para header
    let lastScrollTop = 0;
    let scrollTimer;
    let isScrolling = false;
    
    function handleScroll() {
        if (!header) return;
        
        try {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Aplicar clase scrolled al header cuando hay scroll
            if (scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Ocultar/mostrar header al hacer scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll hacia abajo
                header.classList.add('header-hidden');
            } else {
                // Scroll hacia arriba
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            
            // Mostrar/ocultar botón "volver arriba"
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                if (scrollTop > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
            
            // Animación de secciones al hacer scroll
            animateSections();
        } catch (e) {
            console.log('Error en handleScroll:', e);
        }
    }
    
    // Optimización de rendimiento para el scroll
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        // Usar requestAnimationFrame para mejor rendimiento
        window.requestAnimationFrame(() => {
            if (!scrollTimer) {
                scrollTimer = setTimeout(() => {
                    handleScroll();
                    scrollTimer = null;
                    isScrolling = false;
                }, 10);
            }
        });
    });
    
    // Animación de secciones al hacer scroll
    function animateSections() {
        const sections = document.querySelectorAll('.section');
        if (!sections || sections.length === 0) return;
        
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            try {
                if (!section) return;
                const sectionTop = section.getBoundingClientRect().top;
                const sectionPoint = 100;
                
                if (sectionTop < windowHeight - sectionPoint) {
                    section.classList.add('visible');
                }
            } catch (e) {
                console.log('Error en animación de sección:', e);
            }
        });
    }
    
    // Iniciar animaciones al cargar la página
    setTimeout(animateSections, 100);
    
    // Botón volver arriba mejorado
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Manejo de cookies mejorado
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieOverlay = document.querySelector('.cookie-overlay');
    const acceptCookiesBtn = document.querySelector('.accept-cookies');
    
    // Comprobar si ya se aceptaron las cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    function hideCookieBanner() {
        if (!cookieBanner || !cookieOverlay) return;
        
        cookieBanner.style.opacity = '0';
        cookieOverlay.style.opacity = '0';
        
        setTimeout(() => {
            if (cookieBanner) cookieBanner.style.display = 'none';
            if (cookieOverlay) cookieOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }
    
    if (cookieBanner && cookieOverlay) {
        if (cookiesAccepted) {
            // Si ya se aceptaron las cookies, no mostrar el banner
            cookieBanner.style.display = 'none';
            cookieOverlay.style.display = 'none';
        } else {
            // Mostrar banner de cookies con un pequeño retraso para mejor UX
            setTimeout(() => {
                if (cookieBanner && cookieOverlay) {
                    cookieBanner.style.display = 'flex';
                    cookieOverlay.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }, 1000);
            
            // Manejar aceptación de cookies
            if (acceptCookiesBtn) {
                acceptCookiesBtn.addEventListener('click', () => {
                    try {
                        localStorage.setItem('cookiesAccepted', 'true');
                    } catch (e) {
                        console.log('Error al guardar en localStorage:', e);
                    }
                    hideCookieBanner();
                });
            }
        }
    }
    
    // Iniciar animaciones al cargar la página
    handleScroll();
    
    // Funcionalidad para el acordeón
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon span');
        
        // Configurar estilos iniciales para animación
        content.style.maxHeight = null;
        
        header.addEventListener('click', () => {
            // Cerrar todos los demás elementos
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherIcon = otherItem.querySelector('.accordion-icon span');
                    otherContent.style.maxHeight = null;
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
            
            // Abrir/cerrar el elemento actual
            item.classList.toggle('active');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.textContent = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.textContent = '-';
            }
        });
    });
    
    // Funcionalidad para las pestañas de método
    const methodTabs = document.querySelectorAll('.method-tab');
    const methodContents = document.querySelectorAll('.method-content');
    
    if (methodTabs.length > 0 && methodContents.length > 0) {
        methodTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Desactivar todas las pestañas
                methodTabs.forEach(t => t.classList.remove('active'));
                methodContents.forEach(c => c.classList.remove('active'));
                
                // Activar la pestaña seleccionada
                tab.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Animación para las tarjetas de información
    const infoCards = document.querySelectorAll('.info-card, .benefit-card, .strategy-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Animación para los info-points
    const infoPoints = document.querySelectorAll('.info-point');
    infoPoints.forEach((point, index) => {
        // Añadir clase para animación con retraso
        point.classList.add('animate-on-scroll');
        point.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Animación para elementos con la clase animate-on-scroll
    function animateOnScrollElements() {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Ejecutar animación al cargar y al hacer scroll
    animateOnScrollElements();
    window.addEventListener('scroll', () => {
        if (!scrollTimer) {
            scrollTimer = setTimeout(() => {
                animateOnScrollElements();
                scrollTimer = null;
            }, 10);
        }
    });
});
