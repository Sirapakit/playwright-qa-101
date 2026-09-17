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

**ขั้น 6 — Playwright MCP (ให้ AI คุมเบราว์เซอร์เองได้)**

ต่างกับขั้น 5 ตรงที่ขั้น 5 Claude *เดา* จากโค้ดที่เราให้ดู แต่ MCP ทำให้ Claude **เปิดเบราว์เซอร์จริง
แล้วไปดูหน้าเว็บเองได้** ก่อนเขียนเทสต์ — locator ที่ได้เลยตรงกับของจริง ไม่มั่ว

โปรเจกต์นี้ใส่ `.mcp.json` ไว้ให้แล้ว เปิดโปรเจกต์ใน Claude Code มันจะถามว่าจะเปิดใช้ server ไหม
ตอบ yes ครั้งเดียวจบ (ถ้าอยากสั่งเองใช้ `claude mcp add playwright npx @playwright/mcp@latest`)

เช็คว่าติดแล้วด้วย `/mcp` ต้องเห็น `playwright` เป็น connected

สคริปต์ที่แนะนำให้โชว์สด (เปิด `npm run start` ค้างไว้ก่อน):

1. *"เปิด http://localhost:5173/login.html แล้วบอกหน่อยว่าหน้านี้มี element อะไรบ้าง"*
   → Claude เปิด browser จริงแล้วสรุป accessibility tree ให้ดู ชี้ให้เห็นว่ามันอ่านเป็น **role + name**
   แบบเดียวกับที่เราสอน `getByRole` ไปตอนขั้น 2 เป๊ะๆ
2. *"login ด้วย qa_user / test1234 แล้วเพิ่มสินค้าชิ้นแรกลงตะกร้า"*
   → ให้ห้องดูมันคลิกจริงทีละสเต็ป
3. *"เขียนเป็น Playwright test ลง tests/mcp-demo.spec.js แล้วรันให้ผ่าน"*
   → จบด้วยไฟล์เทสต์ที่รันผ่านจริง

**จุดที่ต้องย้ำกับผู้เรียน:** MCP ใช้ตอน*สำรวจ*กับ*ร่าง* แต่ของที่เอาขึ้น CI คือไฟล์ `.spec.js`
ที่เรารีวิวแล้ว — ไม่ใช่ปล่อยให้ AI คลิกเว็บทุกรอบที่ deploy (ช้า แพง และไม่ deterministic)
และอย่าชี้ MCP ไปที่ production ที่มีข้อมูลลูกค้าจริง

## โครงสร้างไฟล์
```
playwright-demo/
├── demo-site/          เว็บ demo local (login.html, products.html)
├── tests/
│   ├── 00-commands-tour.spec.js   ทัวร์คำสั่งพื้นฐานทีละอัน (สอนก่อนอันแรก)
│   ├── login.spec.js              ตัวอย่าง scenario เต็ม (ผ่านทั้งหมด)
│   └── exercise.spec.js           โจทย์ hands-on + เฉลย (คอมเมนต์ท้ายไฟล์)
├── playwright.config.js
├── .mcp.json          ตั้งค่า Playwright MCP ให้ Claude Code (ใช้ในขั้น 6)
└── package.json
```
