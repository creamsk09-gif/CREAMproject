# Stock Logistics Sisaket

ต้นแบบเว็บแอปพลิเคชันบริหารคลังยา เวชภัณฑ์ อุปกรณ์การแพทย์ และสิ่งของบรรเทาทุกข์ สำหรับสำนักงานสาธารณสุขจังหวัดศรีสะเกษ ออกแบบจากสไลด์ `pitching.pdf` และข้อมูลใน `Stock logistics Sisaket.xlsx`

## สิ่งที่ใช้งานได้

- เข้าสู่ระบบด้วย session cookie และ CSRF token
- Dashboard พร้อม KPI, รายการเตือน, กิจกรรมล่าสุด และกราฟรับเข้า/เบิกจ่าย
- บันทึกรับเข้าแบบหลายรายการ พร้อมล็อตและวันหมดอายุ
- บันทึกเบิกจ่ายแบบหลายรายการ โดยป้องกันยอดติดลบและยกเลิกทั้งเอกสารเมื่อรายการใดไม่ผ่าน
- ค้นหาและกรองคงคลังตามสถานะ/หมวดหมู่
- เพิ่มรายการกลางใหม่ โดยยอดเริ่มต้นเป็น 0 แล้วรับเข้าผ่านเอกสาร
- ส่งออก UTF-8 CSV และ REST JSON API สำหรับ integration layer
- Audit log สำหรับกิจกรรมสำคัญ
- Responsive UI สำหรับ desktop, tablet และ mobile
- Provincial Command Center สำหรับดูสถานะ 22 โรงพยาบาล ความพร้อม การซิงก์ และจุดเสี่ยงทั้งจังหวัด
- Smart Rebalancing แสดงข้อเสนอโยกสต็อกระหว่างโรงพยาบาลก่อนสร้างใบโอนจริง
- AI Mapping Studio จับคู่ชื่อ/รหัส/หน่วยจาก HIS, HOSxP และ CSV กับ master item กลาง
- Human-in-the-loop approval: AI ให้คำแนะนำพร้อม confidence และเหตุผล แต่เภสัชกรต้องอนุมัติเองทุกครั้ง

## เริ่มใช้งาน

ต้องการ Node.js 20 ขึ้นไป

```powershell
npm start
```

เปิด `http://127.0.0.1:4173`

- ผู้ใช้ทดลอง: `admin`
- รหัสผ่านทดลอง: `stock2569`

ทดสอบระบบ:

```powershell
npm test
```

## Production บน Netlify

โปรเจกต์มี `netlify.toml` และ Netlify Function พร้อมใช้งาน โดยเก็บฐานข้อมูลและ session ใน Netlify Blobs แทนไฟล์ภายใน function ที่ไม่ถาวร

```powershell
npx netlify login
npx netlify init
npx netlify env:set STOCK_DEMO_USERNAME <username> --context production --secret
npx netlify env:set STOCK_DEMO_PASSWORD <strong-password> --context production --secret
npx netlify env:set STOCK_SESSION_SECRET <random-secret-at-least-32-bytes> --context production --secret
npx netlify env:set STOCK_STORAGE netlify-blobs --context production
npx netlify env:set NODE_ENV production --context production
npx netlify env:set OPENAI_MODEL gpt-5.4-mini --context production
npm run deploy:production
```

Netlify AI Gateway จะเติม `OPENAI_API_KEY` และ `OPENAI_BASE_URL` ให้ function บน production โดยไม่วาง key ใน frontend หรือ Git หาก AI ไม่พร้อม ระบบจะกลับไปใช้ deterministic mapping ภายในเครื่องโดยอัตโนมัติ และผลลัพธ์ทุกแบบต้องให้เจ้าหน้าที่อนุมัติ

หากมี key ขององค์กร ให้ตั้งเป็น secret ชื่อ `STOCK_AI_API_KEY` (ระบบจะเลือกค่านี้ก่อน key ที่ AI Gateway เติมให้) ระบบตรวจ key Google AI Studio ที่ขึ้นต้นด้วย `AQ.` หรือ `AIza` และเรียก Gemini API โดยตรง ส่วน key อื่นใช้ OpenAI-compatible Responses API และตั้ง `OPENAI_BASE_URL` เพิ่มเมื่อปลายทางไม่ใช่ `api.openai.com`

ตัวแปรที่ต้องตั้งเองใน production:

- `STOCK_DEMO_USERNAME` — ชื่อผู้ดูแลระบบ
- `STOCK_DEMO_PASSWORD` — รหัสผ่านแบบสุ่มที่คาดเดายาก
- `STOCK_SESSION_SECRET` — secret สุ่มอย่างน้อย 32 ไบต์
- `STOCK_STORAGE` — ตั้งเป็น `netlify-blobs` บน Netlify
- `NODE_ENV` — ตั้งเป็น `production`
- `OPENAI_MODEL` — ไม่บังคับ ค่าเริ่มต้น `gpt-5.4-mini`
- `GEMINI_MODEL` — ไม่บังคับ ค่าเริ่มต้น `gemini-3.1-flash-lite`
- `STOCK_AI_API_KEY` — ไม่บังคับ; key ขององค์กร เก็บเป็น Netlify secret เท่านั้น

ไม่ควรใส่ `OPENAI_API_KEY` ใน `public/`, source code หรือ Git ถ้าต้องการใช้ key ขององค์กร ให้ตั้งเป็น secret environment variable บน Netlify เท่านั้น

## แหล่งข้อมูลและสมมติฐาน

- นำเข้ารายการคงคลัง 23 รายการจากชีต `คงคลังปัจจุบัน`
- ชื่อรายการ ปริมาณ หน่วย บรรจุภัณฑ์ และวันหมดอายุมาจากไฟล์ต้นฉบับ
- ปีหมดอายุแบบสองหลักในชีต เช่น `70` ถูกตีความเป็น พ.ศ. 2570 และแปลงเป็น ค.ศ. 2027
- `minQty`, รหัสรายการ, ตำแหน่ง และล็อต `MIG-*` เป็นค่าเริ่มต้นสำหรับต้นแบบ เพราะไม่มี master data เหล่านี้ในไฟล์ต้นฉบับ ต้องให้เภสัชกรคลังยืนยันก่อนใช้จริง
- ไม่แก้ไขหรือเขียนทับไฟล์ Excel ต้นฉบับ

## ขอบเขตด้าน Integration

ต้นแบบมี REST endpoint แบบ versioned และ CSV export เพื่อเป็น interface กลาง แต่การเชื่อมกับ “ทุกโปรแกรมในโรงพยาบาล” ต้องมี mapping ของรหัสยา หน่วยนับ หน่วยบริการ และวิธี authentication ของแต่ละ HIS/HOSxP/ERP ก่อนนำขึ้นจริง ดู [docs/integration-guide.md](docs/integration-guide.md)

ข้อมูลสถานะ 22 โรงพยาบาลในหน้า Provincial Command Center เป็นข้อมูลจำลองสำหรับทดสอบ UX และ workflow จนกว่าจะได้รับ endpoint/ไฟล์ส่งออกจริงจากแต่ละโรงพยาบาล ส่วน AI Mapping ใช้ OpenAI-compatible Responses API เมื่อมี key และมี explainable deterministic fallback ภายในเครื่อง จึงทำให้ core workflow ไม่หยุดหากผู้ให้บริการ AI ภายนอกไม่พร้อม

## ก่อนใช้งานจริง

การ deploy ฟรีใช้ Netlify Blobs พร้อม conditional write เพื่อสาธิต pilot ขนาดเล็กเท่านั้น งาน production ที่เก็บข้อมูลผู้ป่วยหรือมีผู้ใช้พร้อมกันหลายคนควรเปลี่ยนเป็น PostgreSQL/SQL Server ที่มี transaction, backup, row-level permission และ high availability รวมถึง:

- เชื่อม SSO/LDAP/Entra ID ขององค์กรและบังคับ MFA
- กำหนด RBAC แยกผู้รับเข้า ผู้จ่าย ผู้อนุมัติ ผู้ตรวจสอบ และผู้ดูแล
- จัดการหลายล็อตต่อหนึ่งรายการด้วย FEFO และกักกันล็อต
- เพิ่ม approval workflow, e-signature, stock count, adjustment และ recall
- ใช้ TLS, secret manager, centralized audit/SIEM และทดสอบ disaster recovery
- ยืนยัน master item, หน่วยแปลง, lot/expiry และจุดสั่งซื้อโดยเภสัชกร

ข้อมูลทำงานขณะทดลองถูกเก็บใน `data/db.json` ซึ่งถูก ignore จาก Git หากต้องการเริ่มใหม่ ให้หยุดเซิร์ฟเวอร์แล้วคัดลอก `data/seed.json` ทับ `data/db.json`
