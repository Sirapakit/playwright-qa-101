// ตัวอย่างที่ใช้ demo สด: login แล้วเช็คว่าเข้าหน้า Products ได้
// เว็บ demo: QA Demo Shop (เว็บ local ในโปรเจกต์นี้ ไม่ต้องพึ่งอินเทอร์เน็ต ไม่ต้องสมัคร)
// บัญชีทดสอบ: qa_user / test1234
const { test, expect } = require('@playwright/test');

test('login ด้วย qa_user แล้วเห็นหน้า Products', async ({ page }) => {
  await page.goto('/login.html');

  await page.getByPlaceholder('Username').fill('qa_user');
  await page.getByPlaceholder('Password').fill('test1234');
  await page.getByRole('button', { name: 'Login' }).click();

  // Assertion: ตรวจว่าเข้าหน้า Products สำเร็จ
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
});

test('login ด้วย password ผิด แล้วเห็นข้อความ error', async ({ page }) => {
  await page.goto('/login.html');

  await page.getByPlaceholder('Username').fill('qa_user');
  await page.getByPlaceholder('Password').fill('wrong-password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Username หรือ Password ไม่ถูกต้อง')).toBeVisible();
});

test('เพิ่มสินค้าลงตะกร้า แล้วเห็นเลข badge เพิ่มขึ้น', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByPlaceholder('Username').fill('qa_user');
  await page.getByPlaceholder('Password').fill('test1234');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  await expect(page.locator('#cart-badge')).toHaveText('1');
});
