// Main JavaScript file for CTF Toolkit

// Utility function to copy text to clipboard
async function copyToClipboard(text, buttonElement) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Show feedback
        const feedback = buttonElement.querySelector('.copy-feedback') || createCopyFeedback(buttonElement);
        feedback.classList.add('show');
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
        
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
}

// Create copy feedback element
function createCopyFeedback(buttonElement) {
    const feedback = document.createElement('span');
    feedback.className = 'copy-feedback';
    feedback.textContent = 'Copied!';
    buttonElement.appendChild(feedback);
    return feedback;
}

// Clear input and output fields
function clearFields(...fieldIds) {
    fieldIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
            if (element.tagName === 'DIV') {
                element.textContent = '';
            }
        }
    });
}

// Show/hide output section
function toggleOutput(outputId, show = true) {
    const outputSection = document.getElementById(outputId);
    if (outputSection) {
        if (show) {
            outputSection.classList.remove('hidden');
        } else {
            outputSection.classList.add('hidden');
        }
    }
}

// Format output with proper styling
function formatOutput(outputElement, content, isError = false) {
    if (outputElement) {
        outputElement.textContent = content;
        outputElement.className = isError ? 'output-content error' : 'output-content';
    }
}

// Add event listener for navigation active state
document.addEventListener('DOMContentLoaded', () => {
    // Update active navigation item based on current page
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.includes(href) || (currentPath.endsWith('/') && href.includes('index.html'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Add copy functionality to all copy buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
            const targetId = e.target.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const textToCopy = targetElement.textContent || targetElement.value;
                copyToClipboard(textToCopy, e.target);
            }
        }
    });
});

// Export utility functions for use in other modules
window.ctfToolkit = {
    copyToClipboard,
    clearFields,
    toggleOutput,
    formatOutput
};
