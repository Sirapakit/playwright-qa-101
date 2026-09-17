# Playwright Demo — สำหรับสอน Manual QA

โปรเจกต์นี้เตรียมไว้ใช้สอนใน workshop "Playwright for Manual QA" (17 ก.ย. 2569, QA 3 สาว)
เว็บที่ใช้ทดสอบเป็นเว็บ demo เล็กๆ ในโฟลเดอร์ `demo-site/` เอง — **ไม่ต้องพึ่งอินเทอร์เน็ต**
เหมาะกับห้องสอนที่ wifi ไม่นิ่ง และรันซ้ำได้ผลเหมือนเดิมทุกครั้ง

บัญชีทดสอบ: `qa_user` / `test1234`

> ฉบับภาษาอังกฤษสำหรับผู้เรียน: [README.en.md](README.en.md)

## เตรียมก่อนวันสอน (ทำครั้งเดียว)

1. ติดตั้ง Node.js (18 ขึ้นไป) ถ้ายังไม่มี
2. เปิด terminal ที่โฟลเดอร์นี้ แล้วรัน
   ```
   npm install
   npx playwright install chromium
   ```
3. ลองรันเทสต์ดูว่าผ่านทั้งหมด
   ```
   npm test
   ```
   ควรเห็น `7 passed, 1 skipped` (ตัวที่ skip คือแบบฝึกหัดที่ยังไม่ได้ทำ)

## ลำดับที่จะโชว์สดในห้อง (ไล่ตาม agenda บนสไลด์)

**ขั้น 1 — Setup + UI Mode**
```
npm run start        # เปิดเว็บ demo ไว้ที่ http://localhost:5173 (เปิด terminal ทิ้งไว้)
npm run test:ui       # อีก terminal หนึ่ง เปิด UI mode ให้เห็นสเต็ปแบบ visual
```

**ขั้น 2 — แนวคิดหลัก / คำสั่งพื้นฐาน**
เปิดไฟล์ `tests/00-commands-tour.spec.js` (ใช้คู่กับ UI mode จากขั้น 1) มี 4 เทสต์เรียงตามลำดับที่ต้องสอน
ให้รันทีละอันแล้วอธิบาย:
1. `page.goto(...)` — เปิดหน้าเว็บ
2. `page.getByRole(...)`, `getByPlaceholder(...)`, `getByText(...)` — locator หลายแบบ (เน้น role-based)
3. `.fill(...)`, `.click()` — action พื้นฐาน
4. `toBeVisible()`, `toHaveText()`, `toHaveCount()` — assertion ที่ใช้บ่อย

ไฟล์ `tests/login.spec.js` เป็นตัวอย่างที่ผสมทุกอย่างเป็น scenario เดียว ใช้เปิดต่อท้ายเพื่อโยงว่า
คำสั่งที่เพิ่งเห็นแยกๆ กันเอามาต่อเป็นเทสต์จริงยังไง

**ขั้น 3 — Codegen demo**
ต้องเปิดเว็บ demo ไว้ก่อน (terminal จากขั้น 1 ที่รัน `npm run start`) แล้วรัน
```
npm run codegen
```
จะเปิดเบราว์เซอร์ให้คลิกจริง แล้ว Playwright เจนโค้ดให้ดูสดๆ — ลอง login + add to cart ให้ดู

**ขั้น 4 — Hands-on**
เปิดไฟล์ `tests/exercise.spec.js` ให้แต่ละคนทำเอง (โจทย์+คำใบ้อยู่ในคอมเมนต์บนสุดของไฟล์)
เฉลยอยู่ในคอมเมนต์บล็อกท้ายไฟล์เดียวกัน (เปิดโชว์ตอนท้ายคาบพอ)

**ขั้น 5 — AI-assisted test writing**
โชว์ตัวอย่างการอธิบาย scenario เป็นภาษาคนให้ Claude ช่วยเขียน/แก้ test case

## โครงสร้างไฟล์
```
playwright-demo/
├── demo-site/          เว็บ demo local (login.html, products.html)
├── tests/
│   ├── 00-commands-tour.spec.js   ทัวร์คำสั่งพื้นฐานทีละอัน (สอนก่อนอันแรก)
│   ├── login.spec.js              ตัวอย่าง scenario เต็ม (ผ่านทั้งหมด)
│   └── exercise.spec.js           โจทย์ hands-on + เฉลย (คอมเมนต์ท้ายไฟล์)
├── playwright.config.js
└── package.json
```
