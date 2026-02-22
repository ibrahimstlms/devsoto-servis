const http = require('http');

function makeRequest(path, method, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: body });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

async function runTest() {
    try {
        const uniqueEmail = `test${Date.now()}@example.com`;
        const registerData = JSON.stringify({
            email: uniqueEmail,
            password: 'password123'
        });

        console.log(`Registering user: ${uniqueEmail}`);
        const regResponse = await makeRequest('/api/auth/register', 'POST', registerData);
        console.log('Register Response:', regResponse);

        if (regResponse.statusCode === 201) {
            console.log('Logging in...');
            const loginData = JSON.stringify({
                email: uniqueEmail,
                password: 'password123'
            });
            const loginResponse = await makeRequest('/api/auth/login', 'POST', loginData);
            console.log('Login Response:', loginResponse);
        }
    } catch (error) {
        console.error('Test Failed:', error);
    }
}

runTest();
