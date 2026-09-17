// ===== แบบฝึกหัด (hands-on) =====
// ให้ผู้เรียนลบ .fixme(...) ออก แล้วเติมโค้ดให้ test นี้ผ่าน
// โจทย์: เพิ่มสินค้า 2 ชิ้นลงตะกร้า แล้วเช็คว่าเลข badge เป็น "2"
//
// ใบ้:
// 1. ไปที่ /login.html แล้ว login ด้วย qa_user / test1234 (ดูตัวอย่างใน login.spec.js)
// 2. กด "Add to cart" 2 ครั้ง (สินค้าแต่ละชิ้นมีปุ่มของตัวเอง ลองใช้ .nth(0) กับ .nth(1))
// 3. ใช้ expect(...).toHaveText('2') เช็คที่ #cart-badge

const { test, expect } = require('@playwright/test');

test.fixme('เพิ่มสินค้า 2 ชิ้น แล้ว badge ต้องเป็น 2', async ({ page }) => {
  // เขียนโค้ดของคุณตรงนี้
});

/* ===== เฉลย (สอนเปิดตอนท้ายคาบ — copy ไปแทนที่ตัว test ด้านบนแล้วลบ .fixme ออก) =====

test('เพิ่มสินค้า 2 ชิ้น แล้ว badge ต้องเป็น 2', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByPlaceholder('Username').fill('qa_user');
  await page.getByPlaceholder('Password').fill('test1234');
  await page.getByRole('button', { name: 'Login' }).click();

  const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
  await addToCartButtons.nth(0).click();
  await addToCartButtons.nth(1).click();

  await expect(page.locator('#cart-badge')).toHaveText('2');
});

*/
