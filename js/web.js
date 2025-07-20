// Web tools for CTF Toolkit

// JWT Decoder
function decodeJWT() {
    const jwtInput = document.getElementById('jwtInput').value.trim();
    
    if (!jwtInput) {
        alert('Please enter a JWT token');
        return;
    }
    
    try {
        // Split JWT into parts
        const parts = jwtInput.split('.');
        
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format. JWT should have 3 parts separated by dots.');
        }
        
        // Decode header and payload
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        const signature = parts[2];
        
        // Format and display results
        ctfToolkit.formatOutput(document.getElementById('jwtHeader'), JSON.stringify(header, null, 2));
        ctfToolkit.formatOutput(document.getElementById('jwtPayload'), JSON.stringify(payload, null, 2));
        ctfToolkit.formatOutput(document.getElementById('jwtSignature'), signature);
        
        ctfToolkit.toggleOutput('jwtOutputSection', true);
        
        // Check for common vulnerabilities
        checkJWTVulnerabilities(header, payload);
        
    } catch (error) {
        alert('Error decoding JWT: ' + error.message);
    }
}

function checkJWTVulnerabilities(header, payload) {
    const warnings = [];
    
    // Check for 'none' algorithm
    if (header.alg && header.alg.toLowerCase() === 'none') {
        warnings.push('⚠️ WARNING: JWT uses "none" algorithm - potentially vulnerable!');
    }
    
    // Check for weak algorithms
    if (header.alg && ['HS256', 'HS384', 'HS512'].includes(header.alg)) {
        warnings.push('ℹ️ INFO: JWT uses HMAC algorithm - vulnerable to key confusion attacks if RSA is also accepted');
    }
    
    // Check expiration
    if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const now = new Date();
        if (expDate < now) {
            warnings.push('⚠️ WARNING: JWT has expired on ' + expDate.toLocaleString());
        }
    }
    
    if (warnings.length > 0) {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'jwt-warnings';
        warningDiv.innerHTML = '<h4>Security Analysis:</h4>' + warnings.join('<br>');
        document.getElementById('jwtOutputSection').appendChild(warningDiv);
    }
}

// Cookie Parser
function parseCookies() {
    const cookieInput = document.getElementById('cookieInput').value.trim();
    
    if (!cookieInput) {
        alert('Please enter a cookie string');
        return;
    }
    
    try {
        const cookies = {};
        const pairs = cookieInput.split(/;\s*/);
        
        pairs.forEach(pair => {
            const [name, ...valueParts] = pair.split('=');
            if (name) {
                cookies[name.trim()] = valueParts.join('=').trim();
            }
        });
        
        // Format output
        let output = 'Parsed Cookies:\n\n';
        for (const [name, value] of Object.entries(cookies)) {
            output += `${name}: ${value}\n`;
            
            // Try to decode common encoded values
            if (value) {
                // Check if Base64
                try {
                    const decoded = atob(value);
                    if (isPrintable(decoded)) {
                        output += `  → Base64 decoded: ${decoded}\n`;
                    }
                } catch (e) {}
                
                // Check if URL encoded
                if (value.includes('%')) {
                    try {
                        const decoded = decodeURIComponent(value);
                        if (decoded !== value) {
                            output += `  → URL decoded: ${decoded}\n`;
                        }
                    } catch (e) {}
                }
            }
            output += '\n';
        }
        
        ctfToolkit.formatOutput(document.getElementById('cookieOutput'), output);
        ctfToolkit.toggleOutput('cookieOutputSection', true);
        
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('cookieOutput'), 'Error parsing cookies: ' + error.message, true);
        ctfToolkit.toggleOutput('cookieOutputSection', true);
    }
}

// HTTP Headers Analyzer
function analyzeHeaders() {
    const headersInput = document.getElementById('headersInput').value.trim();
    
    if (!headersInput) {
        alert('Please enter HTTP headers');
        return;
    }
    
    try {
        const headers = {};
        const lines = headersInput.split('\n');
        let analysis = '';
        
        // Parse headers
        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const name = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                headers[name.toLowerCase()] = { name, value };
            }
        });
        
        analysis += 'Parsed Headers:\n\n';
        
        // Display headers with security analysis
        for (const [key, { name, value }] of Object.entries(headers)) {
            analysis += `${name}: ${value}\n`;
            
            // Security checks
            const securityNotes = analyzeHeaderSecurity(key, value);
            if (securityNotes.length > 0) {
                securityNotes.forEach(note => {
                    analysis += `  → ${note}\n`;
                });
            }
            analysis += '\n';
        }
        
        // Check for missing security headers
        analysis += '\nMissing Security Headers:\n';
        const securityHeaders = [
            'x-frame-options',
            'x-content-type-options',
            'x-xss-protection',
            'strict-transport-security',
            'content-security-policy',
            'referrer-policy'
        ];
        
        securityHeaders.forEach(header => {
            if (!headers[header]) {
                analysis += `⚠️ Missing: ${header}\n`;
            }
        });
        
        ctfToolkit.formatOutput(document.getElementById('headersOutput'), analysis);
        ctfToolkit.toggleOutput('headersOutputSection', true);
        
    } catch (error) {
        ctfToolkit.formatOutput(document.getElementById('headersOutput'), 'Error analyzing headers: ' + error.message, true);
        ctfToolkit.toggleOutput('headersOutputSection', true);
    }
}

function analyzeHeaderSecurity(headerName, headerValue) {
    const notes = [];
    
    switch (headerName) {
        case 'server':
            notes.push(`ℹ️ Server information exposed: ${headerValue}`);
            break;
        case 'x-powered-by':
            notes.push(`⚠️ Technology stack exposed: ${headerValue}`);
            break;
        case 'set-cookie':
            if (!headerValue.toLowerCase().includes('httponly')) {
                notes.push('⚠️ Cookie missing HttpOnly flag');
            }
            if (!headerValue.toLowerCase().includes('secure')) {
                notes.push('⚠️ Cookie missing Secure flag');
            }
            if (!headerValue.toLowerCase().includes('samesite')) {
                notes.push('⚠️ Cookie missing SameSite attribute');
            }
            break;
        case 'access-control-allow-origin':
            if (headerValue === '*') {
                notes.push('⚠️ CORS allows all origins (*)');
            }
            break;
        case 'x-frame-options':
            notes.push(`✓ Clickjacking protection: ${headerValue}`);
            break;
        case 'content-security-policy':
            notes.push('✓ CSP header present');
            if (headerValue.includes('unsafe-inline') || headerValue.includes('unsafe-eval')) {
                notes.push('⚠️ CSP contains unsafe directives');
            }
            break;
    }
    
    return notes;
}

// Utility function to check if string contains only printable characters
function isPrintable(str) {
    return /^[\x20-\x7E\s]*$/.test(str);
}

// Add styles for JWT warnings
const style = document.createElement('style');
style.textContent = `
    .jwt-parts {
        display: grid;
        gap: 1rem;
    }
    
    .jwt-part {
        background-color: var(--bg-card);
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid var(--border);
    }
    
    .jwt-part h4 {
        color: var(--accent);
        margin-bottom: 0.5rem;
    }
    
    .jwt-warnings {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--bg-card);
        border-radius: 6px;
        border: 1px solid var(--error);
    }
    
    .jwt-warnings h4 {
        color: var(--error);
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);
