const puppeteer = require('puppeteer');

(async () => {
  try {
    // Iniciar el navegador
    const browser = await puppeteer.launch({
      headless: false, // Permitir ver lo que hace Puppeteer
      slowMo: 100, // Simula tiempos humanos
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    // ✅ 1️⃣ Limpiar almacenamiento antes del login
    await page.goto('https://www.fisheriessupply.com/', { waitUntil: 'networkidle2' });
    
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    const cookies = await page.cookies();
    if (cookies.length) {
      await page.deleteCookie(...cookies);
    }
    console.log('✅ Almacenamiento borrado.');

    // ============================
    // 2️⃣ Simular movimiento al botón de login
    // ============================
    const loginButtonSelector = 'li.nav-item--user a.nav-link';
    await page.waitForSelector(loginButtonSelector, { timeout: 30000 });

    // Obtener la posición del botón de login y mover el cursor hacia él
    const loginButton = await page.$(loginButtonSelector);
    const loginBox = await loginButton.boundingBox();
    await page.mouse.move(loginBox.x + loginBox.width / 2, loginBox.y + loginBox.height / 2, { steps: 15 });
    await page.hover(loginButtonSelector);
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.click(loginButtonSelector, { delay: 150 });
    console.log('✅ Se hizo clic en el botón de login.');

    // ============================
    // 3️⃣ Esperar a que se abra el modal de login
    // ============================
    const modalSelector = 'modal-container.modal';
    await page.waitForSelector(modalSelector, { visible: true, timeout: 30000 });
    console.log('✅ Modal de login detectado.');

    // ============================
    // 4️⃣ Simular movimiento al input de email
    // ============================
    const emailInputSelector = 'modal-container.modal input[type="email"][name="email"]';
    await page.waitForSelector(emailInputSelector, { visible: true, timeout: 30000 });

    // Obtener la posición del input y mover el cursor hacia él
    const emailInput = await page.$(emailInputSelector);
    const emailBox = await emailInput.boundingBox();
    await page.mouse.move(emailBox.x + emailBox.width / 2, emailBox.y + emailBox.height / 2, { steps: 20 });
    await page.hover(emailInputSelector);
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.click(emailInputSelector, { delay: 200 });

    // Escribir el email con retraso humano
    await page.type(emailInputSelector, 'contreras.camilo@gmail.com', { delay: 150 });
    console.log('✅ Email ingresado correctamente.');

    // ============================
    // 5️⃣ Simular movimiento al botón "Continue"
    // ============================
    const continueButtonSelector = 'modal-container.modal button.fs-button-standard';
    await page.waitForSelector(continueButtonSelector, { visible: true, timeout: 30000 });

    // Obtener la posición del botón "Continue" y mover el cursor hacia él
    const continueButton = await page.$(continueButtonSelector);
    const continueBox = await continueButton.boundingBox();
    await page.mouse.move(continueBox.x + continueBox.width / 2, continueBox.y + continueBox.height / 2, { steps: 20 });
    await page.hover(continueButtonSelector);
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.click(continueButtonSelector, { delay: 200 });
    console.log('✅ Se hizo clic en el botón "Continue".');

    // ============================
    // 6️⃣ Esperar al input de contraseña
    // ============================
    const passwordInputSelector = 'modal-container.modal input[type="password"]#login-password';
    await page.waitForSelector(passwordInputSelector, { visible: true, timeout: 30000 });
    console.log('✅ Campo de contraseña detectado.');

    // Obtener la posición del input de contraseña y mover el cursor hacia él
    const passwordInput = await page.$(passwordInputSelector);
    const passwordBox = await passwordInput.boundingBox();
    await page.mouse.move(passwordBox.x + passwordBox.width / 2, passwordBox.y + passwordBox.height / 2, { steps: 20 });
    await page.hover(passwordInputSelector);
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.click(passwordInputSelector, { delay: 200 });

    // Escribir la contraseña con retraso humano
    await page.type(passwordInputSelector, 'Zxcv-2020++()', { delay: 150 });
    console.log('✅ Contraseña ingresada.');

    // Tomar una captura después de ingresar la contraseña
    await page.screenshot({ path: 'after_password_input.png' });
    console.log('✅ Captura tomada: after_password_input.png');

    // ============================
    // 7️⃣ Simular movimiento al botón "Login"
    // ============================
    const loginSubmitButtonSelector = 'modal-container.modal button[type="submit"].fs-button-standard';
    await page.waitForSelector(loginSubmitButtonSelector, { visible: true, timeout: 30000 });

    // Obtener la posición del botón "Login" y mover el cursor hacia él
    const loginButtonSubmit = await page.$(loginSubmitButtonSelector);
    const loginBoxSubmit = await loginButtonSubmit.boundingBox();
    await page.mouse.move(loginBoxSubmit.x + loginBoxSubmit.width / 2, loginBoxSubmit.y + loginBoxSubmit.height / 2, { steps: 20 });
    await page.hover(loginSubmitButtonSelector);
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.click(loginSubmitButtonSelector, { delay: 200 });
    console.log('✅ Se hizo clic en el botón "Login".');

    // ============================
    // 8️⃣ Esperar a que el login se complete
    // ============================
    await page.waitForSelector(modalSelector, { hidden: true, timeout: 60000 });
    console.log('✅ Login completado. El modal desapareció.');

    // Tomar captura final después de iniciar sesión
    await page.screenshot({ path: 'after_login_success.png' });
    console.log('✅ Captura tomada: after_login_success.png');

    // Cerrar el navegador
    //await browser.close();
    console.log('✅ Proceso de login finalizado con éxito.');

  } catch (error) {
    console.error('❌ Error en Puppeteer:', error);
    process.exit(1);
  }
})();
