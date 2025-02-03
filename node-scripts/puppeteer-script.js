const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // Mantiene el navegador visible
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Ajusta según tu sistema
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setViewport({ width: 1366, height: 768 });

    try {
        // 🟢 Navegar al sitio
        await page.goto('https://www.fisheriessupply.com/', { waitUntil: 'networkidle2', timeout: 60000 });

        // 🔵 Esperar 10 segundos antes de interactuar
        await page.waitForTimeout(10000);

        // 🟢 Seleccionar y hacer clic en el botón de Login
        const loginButtonSelector = 'li.nav-item--user  a.nav-link';
        await page.waitForSelector(loginButtonSelector, { timeout: 30000 });
        await page.click(loginButtonSelector);

        console.log('✅ Se hizo clic en el botón de login.');

    } catch (error) {
        console.error('❌ Error:', error);
    }

    // 🟢 Mantener el navegador abierto
    console.log('🟢 El navegador sigue abierto. Listo para más tareas.');
})();
