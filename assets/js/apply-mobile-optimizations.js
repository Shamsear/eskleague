/**
 * This script automatically adds mobile optimizations to all HTML pages
 * It injects the necessary CSS and JavaScript references
 */

// Function to add mobile optimizations to all pages
function applyMobileOptimizations() {
    // Check if we're on a mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        console.log('Applying mobile optimizations...');
        
        // Add mobile-optimized CSS if not already present
        if (!document.querySelector('link[href*="mobile-optimized.css"]')) {
            const mobileCssLink = document.createElement('link');
            mobileCssLink.rel = 'stylesheet';
            mobileCssLink.type = 'text/css';
            mobileCssLink.href = getRelativePath() + 'assets/css/mobile-optimized.css';
            document.head.appendChild(mobileCssLink);
        }
        
        // Add Font Awesome if not already present
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(fontAwesomeLink);
        }
        
        // Load mobile enhancements script if not already loaded
        if (!window.mobileEnhancementsLoaded) {
            const script = document.createElement('script');
            script.src = getRelativePath() + 'assets/js/mobile-enhancements.js';
            script.onload = function() {
                window.mobileEnhancementsLoaded = true;
            };
            document.body.appendChild(script);
        }
        
        // Update viewport meta tag for better mobile experience
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        } else {
            const newViewportMeta = document.createElement('meta');
            newViewportMeta.name = 'viewport';
            newViewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(newViewportMeta);
        }
        
        // Add theme-color meta tag for browser UI color
        if (!document.querySelector('meta[name="theme-color"]')) {
            const themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            themeColorMeta.content = '#000000';
            document.head.appendChild(themeColorMeta);
        }
    }
}

// Helper function to get the relative path to the root
function getRelativePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        return '../';
    }
    return '';
}

// Run the function when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMobileOptimizations);
} else {
    applyMobileOptimizations();
}

// Also run when the window is fully loaded (for any resources)
window.addEventListener('load', applyMobileOptimizations); 