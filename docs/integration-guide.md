# Integration guide

## หลักการ

ให้ Stock Logistics เป็นระบบย่อยที่สื่อสารผ่าน integration layer แทนการอ่าน/เขียนฐานข้อมูล HIS โดยตรง วิธีนี้ลดผลกระทบเมื่อโรงพยาบาลใช้โปรแกรมหรือเวอร์ชันต่างกัน และทำให้ตรวจสอบการแลกเปลี่ยนข้อมูลย้อนหลังได้

## Interface ที่มีในต้นแบบ

| Interface | Method | Purpose |
| --- | --- | --- |
| `/api/v1/stock` | GET | Snapshot คงคลังใน JSON envelope รุ่น 1.0 |
| `/api/export/inventory.csv` | GET | UTF-8 CSV สำหรับ Excel, staging หรือ ETL |
| `/api/items` | GET | ค้นหาและกรองรายการสำหรับ UI ภายใน |
| `/api/transactions` | GET/POST | อ่านและบันทึกรับเข้า/เบิกจ่าย |
| `/api/province/overview` | GET | ภาพรวมสถานะซิงก์และสุขภาพสต็อกทุกโรงพยาบาล |
| `/api/ai/mappings` | GET | คิว item mapping พร้อม confidence และเหตุผล |
| `/api/ai/mappings/suggest` | POST | วิเคราะห์รายการต้นทางและคืนตัวเลือก master item 3 อันดับ |
| `/api/ai/mappings/:id/decision` | POST | อนุมัติหรือปฏิเสธ mapping พร้อม audit event |

ทุก endpoint ยกเว้น health และ login ต้องมี session ที่ถูกต้อง ส่วน mutation ต้องส่ง `X-CSRF-Token`

ผลจาก mapping engine เป็นคำแนะนำเท่านั้น ทุกผลลัพธ์ระบุ `requiresHumanApproval: true` และไม่สามารถเปลี่ยน master mapping ได้จนกว่าผู้มีสิทธิ์จะเรียก decision endpoint โดยตรง การอนุมัติซ้ำจะตอบ `409 ALREADY_REVIEWED` เพื่อป้องกัน duplicate action

## Mapping ที่ต้องตกลงกับแต่ละโรงพยาบาล

1. รหัสกลางของรายการ: internal code, TMT, GPU/TPU หรือรหัสของโรงพยาบาล
2. หน่วยฐานและอัตราแปลง: ลัง, กล่อง, แพ็ก, แผง, ขวด, เม็ด
3. รหัสคลัง จุดเก็บ และหน่วยบริการ
4. รูปแบบ lot, expiry, manufacturer และ supplier
5. ชนิดเอกสารรับ/จ่าย, เลขอ้างอิง และสถานะอนุมัติ
6. ผู้รับผิดชอบ, สิทธิ์, idempotency key และ audit correlation ID

## Adapter ที่แนะนำ

- HIS/HOSxP: ใช้ vendor-supported API, replication/staging view หรือ scheduled export; ไม่เขียนตาราง production โดยตรง
- ERP/จัดซื้อ: ใช้ purchase order, goods receipt และ issue document ผ่าน REST หรือ message queue
- ระบบที่ไม่มี API: รับไฟล์ CSV/XLSX เข้า staging, validate, preview และให้เจ้าหน้าที่ยืนยันก่อน post
- HL7/FHIR: วาง gateway แปลง item master และ supply/medication events ตาม profile ที่องค์กรรับรอง ไม่ควรประกาศรองรับ FHIR จนผ่าน conformance test

## Production controls

- OAuth 2.0 client credentials หรือ mTLS สำหรับ system-to-system
- Idempotency key สำหรับ POST และ unique external reference ต่อ source system
- Schema validation, unit normalization และ rejection queue
- Transactional outbox, retry แบบ exponential backoff และ dead-letter queue
- Reconciliation report รายวันระหว่างต้นทางกับคลัง
- Log เฉพาะ identifier และ correlation ID ไม่บันทึก secret หรือข้อมูลผู้ป่วย
