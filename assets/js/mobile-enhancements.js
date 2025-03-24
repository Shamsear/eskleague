/**
 * Mobile Enhancements for ESKIMOS_R2G Website
 * This file contains JavaScript functions to improve mobile UI/UX
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // Apply mobile enhancements
        enhanceMobileNavigation();
        addSwipeGestures();
        improveTouchFeedback();
        optimizeImagesForMobile();
        addPullToRefresh();
        addFloatingActionButton();
        addMobileSearch();
    }
});

/**
 * Enhance mobile navigation with icons and better touch targets
 */
function enhanceMobileNavigation() {
    // Get all menu items
    const menuItems = document.querySelectorAll('#menu > ul > li > a');
    
    // Add icons to menu items based on their text content
    menuItems.forEach(item => {
        const text = item.textContent.trim().toLowerCase();
        let iconClass = 'fa-home'; // Default icon
        
        // Assign appropriate icons based on menu item text
        if (text.includes('home')) iconClass = 'fa-home';
        else if (text.includes('player')) iconClass = 'fa-user';
        else if (text.includes('auction')) iconClass = 'fa-gavel';
        else if (text.includes('trophy')) iconClass = 'fa-trophy';
        else if (text.includes('ranking')) iconClass = 'fa-list-ol';
        else if (text.includes('career')) iconClass = 'fa-briefcase';
        else if (text.includes('mode')) iconClass = 'fa-gamepad';
        else if (text.includes('manager')) iconClass = 'fa-users-cog';
        
        // Add icon before text
        const originalText = item.innerHTML;
        item.innerHTML = `<i class="fas ${iconClass}"></i><span>${originalText}</span>`;
    });
    
    // Make header sticky on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (!header) return;
        
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
}

/**
 * Add swipe gestures for better mobile navigation
 */
function addSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Add touch event listeners to the document
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    // Handle swipe left/right
    function handleSwipe() {
        const swipeThreshold = 100; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next page if available
            const nextLinks = document.querySelectorAll('.next-page, .next, [data-action="next"]');
            if (nextLinks.length > 0) nextLinks[0].click();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous page if available
            const prevLinks = document.querySelectorAll('.prev-page, .prev, [data-action="prev"]');
            if (prevLinks.length > 0) prevLinks[0].click();
        }
    }
}

/**
 * Improve touch feedback for better user experience
 */
function improveTouchFeedback() {
    // Add touch feedback to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .button, [role="button"]');
    
    interactiveElements.forEach(element => {
        // Add active state class on touch
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        // Remove active state class after touch
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
    
    // Add CSS for touch feedback if not already in stylesheet
    if (!document.getElementById('touch-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'touch-feedback-styles';
        style.textContent = `
            .touch-active {
                opacity: 0.7;
                transform: scale(0.98);
                transition: all 0.1s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Optimize images for mobile without removing them
 */
function optimizeImagesForMobile() {
    // Add lazy loading to all images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Store original dimensions for proper sizing
        if (!img.getAttribute('data-original-width') && img.width > 0) {
            img.setAttribute('data-original-width', img.width);
            img.setAttribute('data-original-height', img.height);
        }
        
        // Ensure images don't overflow their containers
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
    
    // Add fade-in effect to lazy-loaded images
    if (!document.getElementById('lazy-image-styles')) {
        const style = document.createElement('style');
        style.id = 'lazy-image-styles';
        style.textContent = `
            img[loading="lazy"] {
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
            }
            img.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add load event to images
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

/**
 * Add pull-to-refresh functionality for a native app feel
 */
function addPullToRefresh() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    // Create pull-to-refresh indicator
    const refreshIndicator = document.createElement('div');
    refreshIndicator.className = 'pull-to-refresh';
    refreshIndicator.innerHTML = '<div class="loading-spinner"></div><span>Pull down to refresh</span>';
    refreshIndicator.style.display = 'none';
    
    // Add indicator to the top of the body
    document.body.insertBefore(refreshIndicator, document.body.firstChild);
    
    // Add touch event listeners
    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', e => {
        if (window.scrollY === 0) {
            touchEndY = e.touches[0].clientY;
            const pullDistance = touchEndY - touchStartY;
            
            if (pullDistance > 0 && pullDistance < 100) {
                refreshIndicator.style.display = 'flex';
                refreshIndicator.style.height = `${pullDistance}px`;
            }
        }
    }, { passive: true });
    
    document.addEventListener('touchend', e => {
        if (window.scrollY === 0) {
            const pullDistance = touchEndY - touchStartY;
            
            if (pullDistance > 70) {
                // Show loading state
                refreshIndicator.innerHTML = '<div class="loading-spinner"></div><span>Refreshing...</span>';
                
                // Reload the page after a short delay
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                // Hide the indicator
                refreshIndicator.style.display = 'none';
            }
        }
    }, { passive: true });
}

/**
 * Add a floating action button for quick actions
 */
function addFloatingActionButton() {
    // Create FAB element
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Add FAB to the body
    document.body.appendChild(fab);
    
    // Add click event to scroll to top
    fab.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            fab.style.display = 'flex';
            fab.style.opacity = '1';
        } else {
            fab.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    fab.style.display = 'none';
                }
            }, 300);
        }
    });
}

/**
 * Add mobile-optimized search functionality
 */
function addMobileSearch() {
    // Check if search already exists
    if (document.querySelector('.search-container')) return;
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search..." id="mobile-search">
        <button type="button"><i class="fas fa-search"></i></button>
    `;
    
    // Add search container after header
    const header = document.getElementById('header');
    if (header && header.nextSibling) {
        header.parentNode.insertBefore(searchContainer, header.nextSibling);
    } else {
        document.body.insertBefore(searchContainer, document.body.firstChild);
    }
    
    // Add search functionality
    const searchInput = document.getElementById('mobile-search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Search in content
        const contentElements = document.querySelectorAll('.mz_wysiwyg, .moze-wysiwyg-editor, p, h1, h2, h3, h4, h5, h6, li, td, th');
        
        contentElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            const parent = findParentContainer(element);
            
            if (text.includes(searchTerm) && searchTerm.length > 2) {
                // Highlight matching text
                if (parent) {
                    parent.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
                    parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Remove highlight
                if (parent) {
                    parent.style.backgroundColor = '';
                }
            }
        });
    });
    
    // Helper function to find parent container
    function findParentContainer(element) {
        let parent = element.parentElement;
        const maxLevels = 3;
        let level = 0;
        
        while (parent && level < maxLevels) {
            if (parent.classList.contains('card') || 
                parent.classList.contains('player-card') || 
                parent.classList.contains('auction-item') || 
                parent.classList.contains('trophy-item') || 
                parent.tagName === 'SECTION' || 
                parent.tagName === 'ARTICLE' || 
                parent.tagName === 'DIV' && parent.className.includes('container')) {
                return parent;
            }
            
            parent = parent.parentElement;
            level++;
        }
        
        return element.parentElement;
    }
} 