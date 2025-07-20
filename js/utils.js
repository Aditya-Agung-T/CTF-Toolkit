// Utility tools for CTF Toolkit

// Text Case Converter
function convertCase(caseType) {
    const input = document.getElementById('caseInput').value;
    
    if (!input) {
        alert('Please enter some text to convert');
        return;
    }
    
    let result = '';
    
    switch (caseType) {
        case 'upper':
            result = input.toUpperCase();
            break;
        case 'lower':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            break;
        case 'camel':
            result = input
                .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return index === 0 ? word.toLowerCase() : word.toUpperCase();
                })
                .replace(/\s+/g, '');
            break;
        case 'snake':
            result = input
                .replace(/\W+/g, ' ')
                .split(/ |\B(?=[A-Z])/)
                .map(word => word.toLowerCase())
                .join('_');
            break;
    }
    
    ctfToolkit.formatOutput(document.getElementById('caseOutput'), result);
    ctfToolkit.toggleOutput('caseOutputSection', true);
}

// Text Reversal Functions
function reverseText() {
    const input = document.getElementById('reverseInput').value;
    
    if (!input) {
        alert('Please enter some text to reverse');
        return;
    }
    
    const result = input.split('').reverse().join('');
    ctfToolkit.formatOutput(document.getElementById('reverseOutput'), result);
    ctfToolkit.toggleOutput('reverseOutputSection', true);
}

function reverseWords() {
    const input = document.getElementById('reverseInput').value;
    
    if (!input) {
        alert('Please enter some text to reverse');
        return;
    }
    
    const result = input.split(/\s+/).reverse().join(' ');
    ctfToolkit.formatOutput(document.getElementById('reverseOutput'), result);
    ctfToolkit.toggleOutput('reverseOutputSection', true);
}

function reverseLines() {
    const input = document.getElementById('reverseInput').value;
    
    if (!input) {
        alert('Please enter some text to reverse');
        return;
    }
    
    const result = input.split('\n').reverse().join('\n');
    ctfToolkit.formatOutput(document.getElementById('reverseOutput'), result);
    ctfToolkit.toggleOutput('reverseOutputSection', true);
}

// Character/Word Counter
function updateCounter() {
    const input = document.getElementById('counterInput').value;
    
    // Character count
    document.getElementById('charCount').textContent = input.length;
    
    // Character count without spaces
    document.getElementById('charCountNoSpace').textContent = input.replace(/\s/g, '').length;
    
    // Word count
    const words = input.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = words.length;
    
    // Line count
    const lines = input.split('\n');
    document.getElementById('lineCount').textContent = lines.length;
    
    // Paragraph count (separated by double newlines)
    const paragraphs = input.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    document.getElementById('paragraphCount').textContent = paragraphs.length;
}

function clearCounter() {
    document.getElementById('counterInput').value = '';
    updateCounter();
}

// ASCII Table
const asciiData = {
    control: [
        { dec: 0, hex: '00', oct: '000', char: 'NUL', desc: 'Null' },
        { dec: 1, hex: '01', oct: '001', char: 'SOH', desc: 'Start of Heading' },
        { dec: 2, hex: '02', oct: '002', char: 'STX', desc: 'Start of Text' },
        { dec: 3, hex: '03', oct: '003', char: 'ETX', desc: 'End of Text' },
        { dec: 4, hex: '04', oct: '004', char: 'EOT', desc: 'End of Transmission' },
        { dec: 5, hex: '05', oct: '005', char: 'ENQ', desc: 'Enquiry' },
        { dec: 6, hex: '06', oct: '006', char: 'ACK', desc: 'Acknowledge' },
        { dec: 7, hex: '07', oct: '007', char: 'BEL', desc: 'Bell' },
        { dec: 8, hex: '08', oct: '010', char: 'BS', desc: 'Backspace' },
        { dec: 9, hex: '09', oct: '011', char: 'TAB', desc: 'Horizontal Tab' },
        { dec: 10, hex: '0A', oct: '012', char: 'LF', desc: 'Line Feed' },
        { dec: 11, hex: '0B', oct: '013', char: 'VT', desc: 'Vertical Tab' },
        { dec: 12, hex: '0C', oct: '014', char: 'FF', desc: 'Form Feed' },
        { dec: 13, hex: '0D', oct: '015', char: 'CR', desc: 'Carriage Return' },
        { dec: 14, hex: '0E', oct: '016', char: 'SO', desc: 'Shift Out' },
        { dec: 15, hex: '0F', oct: '017', char: 'SI', desc: 'Shift In' },
        { dec: 16, hex: '10', oct: '020', char: 'DLE', desc: 'Data Link Escape' },
        { dec: 17, hex: '11', oct: '021', char: 'DC1', desc: 'Device Control 1' },
        { dec: 18, hex: '12', oct: '022', char: 'DC2', desc: 'Device Control 2' },
        { dec: 19, hex: '13', oct: '023', char: 'DC3', desc: 'Device Control 3' },
        { dec: 20, hex: '14', oct: '024', char: 'DC4', desc: 'Device Control 4' },
        { dec: 21, hex: '15', oct: '025', char: 'NAK', desc: 'Negative Acknowledge' },
        { dec: 22, hex: '16', oct: '026', char: 'SYN', desc: 'Synchronous Idle' },
        { dec: 23, hex: '17', oct: '027', char: 'ETB', desc: 'End of Trans. Block' },
        { dec: 24, hex: '18', oct: '030', char: 'CAN', desc: 'Cancel' },
        { dec: 25, hex: '19', oct: '031', char: 'EM', desc: 'End of Medium' },
        { dec: 26, hex: '1A', oct: '032', char: 'SUB', desc: 'Substitute' },
        { dec: 27, hex: '1B', oct: '033', char: 'ESC', desc: 'Escape' },
        { dec: 28, hex: '1C', oct: '034', char: 'FS', desc: 'File Separator' },
        { dec: 29, hex: '1D', oct: '035', char: 'GS', desc: 'Group Separator' },
        { dec: 30, hex: '1E', oct: '036', char: 'RS', desc: 'Record Separator' },
        { dec: 31, hex: '1F', oct: '037', char: 'US', desc: 'Unit Separator' },
        { dec: 127, hex: '7F', oct: '177', char: 'DEL', desc: 'Delete' }
    ]
};

// Generate printable ASCII characters
for (let i = 32; i <= 126; i++) {
    if (!asciiData.printable) asciiData.printable = [];
    asciiData.printable.push({
        dec: i,
        hex: i.toString(16).toUpperCase().padStart(2, '0'),
        oct: i.toString(8).padStart(3, '0'),
        char: String.fromCharCode(i),
        desc: getASCIIDescription(i)
    });
}

// Generate extended ASCII characters
for (let i = 128; i <= 255; i++) {
    if (!asciiData.extended) asciiData.extended = [];
    asciiData.extended.push({
        dec: i,
        hex: i.toString(16).toUpperCase().padStart(2, '0'),
        oct: i.toString(8).padStart(3, '0'),
        char: String.fromCharCode(i),
        desc: 'Extended ASCII'
    });
}

function getASCIIDescription(code) {
    const descriptions = {
        32: 'Space',
        33: 'Exclamation mark',
        34: 'Double quotes',
        35: 'Number sign',
        36: 'Dollar sign',
        37: 'Percent sign',
        38: 'Ampersand',
        39: 'Single quote',
        40: 'Opening parenthesis',
        41: 'Closing parenthesis',
        42: 'Asterisk',
        43: 'Plus sign',
        44: 'Comma',
        45: 'Hyphen',
        46: 'Period',
        47: 'Slash',
        58: 'Colon',
        59: 'Semicolon',
        60: 'Less than',
        61: 'Equal sign',
        62: 'Greater than',
        63: 'Question mark',
        64: 'At symbol',
        91: 'Opening bracket',
        92: 'Backslash',
        93: 'Closing bracket',
        94: 'Caret',
        95: 'Underscore',
        96: 'Grave accent',
        123: 'Opening brace',
        124: 'Vertical bar',
        125: 'Closing brace',
        126: 'Tilde'
    };
    
    if (descriptions[code]) return descriptions[code];
    if (code >= 48 && code <= 57) return 'Digit ' + String.fromCharCode(code);
    if (code >= 65 && code <= 90) return 'Uppercase ' + String.fromCharCode(code);
    if (code >= 97 && code <= 122) return 'Lowercase ' + String.fromCharCode(code);
    return '';
}

function showASCIIRange(range) {
    const tbody = document.getElementById('asciiTableBody');
    tbody.innerHTML = '';
    
    let data = [];
    
    switch (range) {
        case 'control':
            data = asciiData.control;
            break;
        case 'printable':
            data = asciiData.printable;
            break;
        case 'extended':
            data = asciiData.extended;
            break;
        case 'all':
            data = [...asciiData.control, ...asciiData.printable, ...asciiData.extended];
            data.sort((a, b) => a.dec - b.dec);
            break;
    }
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.dec}</td>
            <td>0x${item.hex}</td>
            <td>${item.oct}</td>
            <td>${item.char}</td>
            <td>${item.desc}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize with printable characters on page load
document.addEventListener('DOMContentLoaded', () => {
    showASCIIRange('printable');
});

// Add styles for counter stats
const style = document.createElement('style');
style.textContent = `
    .counter-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
        padding: 1rem;
        background-color: var(--bg-card);
        border-radius: 6px;
        border: 1px solid var(--border);
    }
    
    .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
    }
    
    .stat-label {
        color: var(--text-secondary);
    }
    
    .stat-value {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--accent);
    }
    
    .ascii-controls {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }
    
    #asciiTableContainer {
        overflow-x: auto;
        margin-top: 1rem;
    }
`;
document.head.appendChild(style);
