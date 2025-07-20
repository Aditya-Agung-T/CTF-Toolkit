// Encoding/Decoding tools for CTF Toolkit

// Base64 Encoding/Decoding
function base64Encode() {
    const input = document.getElementById('base64Input').value;
    
    if (!input) {
        alert('Please enter some text to encode');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        ctfToolkit.formatOutput(document.getElementById('base64Output'), encoded);
        ctfToolkit.toggleOutput('base64OutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('base64Output'), 'Error encoding: ' + error.message, true);
        ctfToolkit.toggleOutput('base64OutputSection', true);
    }
}

function base64Decode() {
    const input = document.getElementById('base64Input').value;
    
    if (!input) {
        alert('Please enter a Base64 string to decode');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        ctfToolkit.formatOutput(document.getElementById('base64Output'), decoded);
        ctfToolkit.toggleOutput('base64OutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('base64Output'), 'Error decoding: Invalid Base64 string', true);
        ctfToolkit.toggleOutput('base64OutputSection', true);
    }
}

// URL Encoding/Decoding
function urlEncode() {
    const input = document.getElementById('urlInput').value;
    
    if (!input) {
        alert('Please enter some text to encode');
        return;
    }
    
    try {
        const encoded = encodeURIComponent(input);
        ctfToolkit.formatOutput(document.getElementById('urlOutput'), encoded);
        ctfToolkit.toggleOutput('urlOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('urlOutput'), 'Error encoding: ' + error.message, true);
        ctfToolkit.toggleOutput('urlOutputSection', true);
    }
}

function urlDecode() {
    const input = document.getElementById('urlInput').value;
    
    if (!input) {
        alert('Please enter a URL-encoded string to decode');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input);
        ctfToolkit.formatOutput(document.getElementById('urlOutput'), decoded);
        ctfToolkit.toggleOutput('urlOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('urlOutput'), 'Error decoding: Invalid URL-encoded string', true);
        ctfToolkit.toggleOutput('urlOutputSection', true);
    }
}

// Hex to ASCII and vice versa
function hexToAscii() {
    const input = document.getElementById('hexInput').value.trim();
    
    if (!input) {
        alert('Please enter a hex string');
        return;
    }
    
    try {
        // Remove spaces and common hex prefixes
        const cleanHex = input.replace(/\s/g, '').replace(/^0x/i, '');
        
        // Check if valid hex
        if (!/^[0-9A-Fa-f]*$/.test(cleanHex)) {
            throw new Error('Invalid hex string');
        }
        
        // Convert hex to ASCII
        let ascii = '';
        for (let i = 0; i < cleanHex.length; i += 2) {
            const hex = cleanHex.substr(i, 2);
            ascii += String.fromCharCode(parseInt(hex, 16));
        }
        
        ctfToolkit.formatOutput(document.getElementById('hexOutput'), ascii);
        ctfToolkit.toggleOutput('hexOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('hexOutput'), 'Error converting: ' + error.message, true);
        ctfToolkit.toggleOutput('hexOutputSection', true);
    }
}

function asciiToHex() {
    const input = document.getElementById('hexInput').value;
    
    if (!input) {
        alert('Please enter some text');
        return;
    }
    
    try {
        let hex = '';
        for (let i = 0; i < input.length; i++) {
            const hexChar = input.charCodeAt(i).toString(16).padStart(2, '0');
            hex += hexChar;
        }
        
        // Format with spaces for readability
        const formattedHex = hex.match(/.{1,2}/g).join(' ');
        
        ctfToolkit.formatOutput(document.getElementById('hexOutput'), formattedHex);
        ctfToolkit.toggleOutput('hexOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('hexOutput'), 'Error converting: ' + error.message, true);
        ctfToolkit.toggleOutput('hexOutputSection', true);
    }
}

// Binary to Text and vice versa
function binaryToText() {
    const input = document.getElementById('binaryInput').value.trim();
    
    if (!input) {
        alert('Please enter a binary string');
        return;
    }
    
    try {
        // Remove spaces
        const cleanBinary = input.replace(/\s/g, '');
        
        // Check if valid binary
        if (!/^[01]*$/.test(cleanBinary)) {
            throw new Error('Invalid binary string');
        }
        
        // Convert binary to text
        let text = '';
        for (let i = 0; i < cleanBinary.length; i += 8) {
            const byte = cleanBinary.substr(i, 8);
            if (byte.length === 8) {
                text += String.fromCharCode(parseInt(byte, 2));
            }
        }
        
        ctfToolkit.formatOutput(document.getElementById('binaryOutput'), text);
        ctfToolkit.toggleOutput('binaryOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('binaryOutput'), 'Error converting: ' + error.message, true);
        ctfToolkit.toggleOutput('binaryOutputSection', true);
    }
}

function textToBinary() {
    const input = document.getElementById('binaryInput').value;
    
    if (!input) {
        alert('Please enter some text');
        return;
    }
    
    try {
        let binary = '';
        for (let i = 0; i < input.length; i++) {
            const binaryChar = input.charCodeAt(i).toString(2).padStart(8, '0');
            binary += binaryChar + ' ';
        }
        
        ctfToolkit.formatOutput(document.getElementById('binaryOutput'), binary.trim());
        ctfToolkit.toggleOutput('binaryOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('binaryOutput'), 'Error converting: ' + error.message, true);
        ctfToolkit.toggleOutput('binaryOutputSection', true);
    }
}

// HTML Entity Encoding/Decoding
function htmlEncode() {
    const input = document.getElementById('htmlInput').value;
    
    if (!input) {
        alert('Please enter some text to encode');
        return;
    }
    
    try {
        const encoded = input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\//g, '&#x2F;');
        
        ctfToolkit.formatOutput(document.getElementById('htmlOutput'), encoded);
        ctfToolkit.toggleOutput('htmlOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('htmlOutput'), 'Error encoding: ' + error.message, true);
        ctfToolkit.toggleOutput('htmlOutputSection', true);
    }
}

function htmlDecode() {
    const input = document.getElementById('htmlInput').value;
    
    if (!input) {
        alert('Please enter HTML-encoded text to decode');
        return;
    }
    
    try {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = input;
        const decoded = textarea.value;
        
        ctfToolkit.formatOutput(document.getElementById('htmlOutput'), decoded);
        ctfToolkit.toggleOutput('htmlOutputSection', true);
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('htmlOutput'), 'Error decoding: ' + error.message, true);
        ctfToolkit.toggleOutput('htmlOutputSection', true);
    }
}
