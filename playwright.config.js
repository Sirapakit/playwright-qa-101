// @ts-check
const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');

// ใช้เฉพาะตอนรันในแซนด์บ็อกซ์เตรียมงานนี้ (browser ติดตั้งไว้ที่ path นี้อยู่แล้ว)
// บนเครื่องจริงของคุณ ให้รัน `npx playwright install chromium` ครั้งเดียว แล้ว path นี้จะไม่ถูกใช้
const sandboxChromePath = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const useSandboxChrome = fs.existsSync(sandboxChromePath);

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    launchOptions: useSandboxChrome ? { executablePath: sandboxChromePath } : {},
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // เปิดเว็บ demo local อัตโนมัติก่อนรันเทสต์ ไม่ต้องพึ่งอินเทอร์เน็ตตอนสอน
  webServer: {
    command: 'python3 -m http.server 5173 --directory demo-site',
    url: 'http://localhost:5173/login.html',
    reuseExistingServer: true,
    timeout: 10_000,
  },
});
