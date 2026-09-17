// ===== ทัวร์คำสั่งพื้นฐาน (สอนก่อนไปแตะ login.spec.js) =====
// แบ่งเป็น test เล็กๆ ทีละคำสั่ง เปิดไฟล์นี้ค้างไว้ แล้วรันทีละอันด้วย UI mode
// (npm run test:ui แล้วคลิกเลือกเทสต์ทีละตัวในลิสต์ซ้ายมือ) หรือกด "Show trace" หลังรันจบ
// เพื่อย้อนดูว่าคลิกอะไรไปบ้าง

const { test, expect } = require('@playwright/test');

// ---------- 1. เปิดหน้าเว็บ (Navigation) ----------
test('1. เปิดหน้าเว็บ', async ({ page }) => {
  await page.goto('/login.html');

  // เช็คแบบง่ายที่สุดว่ามาถึงหน้าที่ถูกต้องจริง
  await expect(page).toHaveTitle('QA Demo Shop - Login');
});

// ---------- 2. หา element ด้วย Locator (แนะนำ role-based ก่อนเสมอ) ----------
test('2. หา element ด้วย locator หลายแบบ', async ({ page }) => {
  await page.goto('/login.html');

  // แบบที่ 1: role-based — แนะนำที่สุด อ่านง่าย ทนทานต่อการเปลี่ยน CSS/HTML
  const loginButton = page.getByRole('button', { name: 'Login' });

  // แบบที่ 2: placeholder — ใช้ได้ดีกับฟอร์มที่ไม่มี label ชัดเจน
  const usernameInput = page.getByPlaceholder('Username');

  // แบบที่ 3: text — หา element จากข้อความที่มองเห็น
  const heading = page.getByText('QA Demo Shop');

  // locator แค่ "ชี้เป้า" ยังไม่ทำอะไร ต้องมาคู่กับ action/assertion ด้านล่าง
  await expect(loginButton).toBeVisible();
  await expect(usernameInput).toBeVisible();
  await expect(heading).toBeVisible();
});

// ---------- 3. Action: กรอกข้อมูลและคลิก ----------
test('3. action พื้นฐาน: fill กับ click', async ({ page }) => {
  await page.goto('/login.html');

  await page.getByPlaceholder('Username').fill('qa_user');   // fill = กรอกข้อความ
  await page.getByPlaceholder('Password').fill('test1234');
  await page.getByRole('button', { name: 'Login' }).click(); // click = กดปุ่ม/ลิงก์

  // เดินทางไปหน้า products.html แล้วจริง ถือเป็น action ที่ถูกต้อง
  await expect(page).toHaveURL(/products\.html/);
});

// ---------- 4. Assertion: ตรวจผลลัพธ์ ----------
test('4. assertion ที่ใช้บ่อย', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByPlaceholder('Username').fill('qa_user');
  await page.getByPlaceholder('Password').fill('test1234');
  await page.getByRole('button', { name: 'Login' }).click();

  // toBeVisible — element ต้องมองเห็นอยู่บนหน้าจอ
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

  // toHaveText — ข้อความต้องตรงเป๊ะ
  await expect(page.locator('#cart-badge')).toHaveText('0');

  // toHaveCount — จำนวน element ที่เจอต้องตรงตามที่คาด (ที่นี่มีสินค้า 3 ชิ้น)
  await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(3);

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // เช็คอีกครั้งหลัง action ว่าค่าที่เปลี่ยนไปถูกต้อง
  await expect(page.locator('#cart-badge')).toHaveText('1');
});

/*
  ===== คำสั่งที่รันใน terminal (ตรงกับ cheat sheet บนสไลด์เป๊ะๆ) =====
  npx playwright test               รันทุกเทสต์ครั้งเดียว เห็นผลใน terminal
  npx playwright test --ui          เปิด UI mode ดูทีละสเต็ปแบบ visual (ใช้ตอนสอนไฟล์นี้)
  npx playwright codegen <url>      เปิดเบราว์เซอร์ให้คลิกจริง แล้วเจนโค้ดให้อัตโนมัติ

  ในโปรเจกต์นี้มี shortcut ให้แล้วใน package.json (ผลลัพธ์เหมือนกันทุกอย่าง):
  npm test  =  npx playwright test
  npm run test:ui  =  npx playwright test --ui
  npm run codegen  =  npx playwright codegen http://localhost:5173/login.html
*/
