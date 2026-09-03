let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch {
  // Graceful fallback if nodemailer is not yet loaded
}

const DEFAULT_SENDER = 'cream.sk09@gmail.com';
const DEFAULT_RECIPIENT = 'lew0994733933@gmail.com';

function formatThaiDate(isoDateStr) {
  if (!isoDateStr) return '-';
  const d = new Date(isoDateStr);
  if (isNaN(d.getTime())) return isoDateStr;
  const thMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const day = d.getDate();
  const month = thMonths[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

function generateExpiryAlertEmailHtml({ items = [], warehouse = 'คลังยา สสจ.ศรีสะเกษ', generatedAt = new Date(), thresholdDays = 180, sender = DEFAULT_SENDER, recipient = DEFAULT_RECIPIENT }) {
  const dateStr = formatThaiDate(generatedAt);
  const totalItems = items.length;
  const totalQty = items.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);

  const rows = items.map((item, idx) => {
    const isExpired = Number(item.daysToExpiry) < 0;
    const isVeryUrgent = Number(item.daysToExpiry) <= 60 && !isExpired;
    const badgeColor = isExpired ? '#dc2626' : isVeryUrgent ? '#ea580c' : '#ca8a04';
    const badgeBg = isExpired ? '#fef2f2' : isVeryUrgent ? '#fff7ed' : '#fefce8';
    const daysLabel = isExpired ? `หมดอายุแล้ว ${Math.abs(item.daysToExpiry)} วัน` : `เหลือ ${item.daysToExpiry} วัน`;

    return `
      <tr style="border-bottom: 1px solid #e2e8f0; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="padding: 10px 12px; text-align: center; font-size: 13px; color: #64748b;">${idx + 1}</td>
        <td style="padding: 10px 12px; font-size: 14px; color: #0f172a; font-weight: 600;">
          ${escapeHtml(item.name || item.id || '-')}
          <div style="font-size: 12px; color: #64748b; font-weight: normal; margin-top: 2px;">รหัส: ${escapeHtml(item.code || '-')} | หมวดหมู่: ${escapeHtml(item.category || '-')}</div>
        </td>
        <td style="padding: 10px 12px; text-align: center; font-size: 13px; font-weight: 600; color: #334155;">
          ${escapeHtml(item.lot || '-')}
        </td>
        <td style="padding: 10px 12px; text-align: right; font-size: 14px; font-weight: 700; color: #0f172a;">
          ${Number(item.qty || 0).toLocaleString('th-TH')} <span style="font-size: 12px; font-weight: normal; color: #64748b;">${escapeHtml(item.unit || 'หน่วย')}</span>
        </td>
        <td style="padding: 10px 12px; text-align: center; font-size: 13px; color: #0f172a;">
          ${formatThaiDate(item.expiry)}
        </td>
        <td style="padding: 10px 12px; text-align: center;">
          <span style="display: inline-block; padding: 4px 8px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: ${badgeColor}; background-color: ${badgeBg}; border: 1px solid ${badgeColor}33;">
            ${daysLabel}
          </span>
        </td>
      </tr>`;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>แจ้งเตือนยาใกล้หมดอายุ 6 เดือน</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 24px 0;">
    <tr>
      <td align="center">
        <table width="680" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; max-width: 95%;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d5c75 0%, #083b4c 100%); padding: 24px 30px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 13px; color: #93c5fd; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Stock Logistics Sisaket · ระบบบริหารเวชภัณฑ์</div>
                    <h1 style="margin: 6px 0 0 0; font-size: 20px; color: #ffffff; font-weight: 700;">🚨 แจ้งเตือนรายการยาใกล้หมดอายุ (ภายใน ${Math.round(thresholdDays / 30)} เดือน)</h1>
                    <div style="margin-top: 6px; font-size: 13px; color: #e2e8f0;">${escapeHtml(warehouse)} · ข้อมูล ณ วันที่ ${dateStr}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary KPI Cards -->
          <tr>
            <td style="padding: 20px 30px 10px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600;">จำนวนรายการที่ต้องเฝ้าระวัง</div>
                    <div style="font-size: 22px; color: #dc2626; font-weight: 700; margin-top: 4px;">${totalItems.toLocaleString('th-TH')} <span style="font-size: 14px; font-weight: normal; color: #64748b;">รายการ</span></div>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600;">ยอดรวมเวชภัณฑ์ใกล้หมดอายุ</div>
                    <div style="font-size: 22px; color: #0284c7; font-weight: 700; margin-top: 4px;">${totalQty.toLocaleString('th-TH')} <span style="font-size: 14px; font-weight: normal; color: #64748b;">ชิ้น/หน่วย</span></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Info Notice -->
          <tr>
            <td style="padding: 10px 30px 16px 30px;">
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 14px; border-radius: 0 6px 6px 0; font-size: 13px; color: #1e40af;">
                <strong>เรียน ผู้รับผิดชอบงานคลังเวชภัณฑ์:</strong><br>
                ระบบได้รวบรวมรายการยาและเวชภัณฑ์ที่มีวันหมดอายุภายใน 6 เดือน (${thresholdDays} วัน) เพื่อให้ท่านวางแผนการบริหารจัดการ stock, กระจายยา (Rebalance) ไปยังโรงพยาบาลในเครือข่าย หรือประสานงานแลกเปลี่ยนกับหน่วยงานอื่นต่อไป
              </div>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 30px 24px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #e2e8f0; border-bottom: 2px solid #cbd5e1;">
                    <th style="padding: 10px 8px; font-size: 12px; font-weight: 700; color: #334155; text-align: center; width: 40px;">ลำดับ</th>
                    <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #334155; text-align: left;">รายการยา / เวชภัณฑ์</th>
                    <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #334155; text-align: center; width: 90px;">ล็อต (Lot)</th>
                    <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #334155; text-align: right; width: 90px;">จำนวน</th>
                    <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #334155; text-align: center; width: 95px;">วันหมดอายุ</th>
                    <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #334155; text-align: center; width: 105px;">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows.length ? rows : '<tr><td colspan="6" style="padding: 24px; text-align: center; color: #64748b; font-size: 14px;">ไม่พบรายการยาที่ใกล้หมดอายุในระยะเวลาที่กำหนด</td></tr>'}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 30px; font-size: 12px; color: #64748b; text-align: center; line-height: 1.5;">
              <div>อีเมลฉบับนี้ส่งโดยอัตโนมัติจากระบบ <strong>Stock Logistics Sisaket</strong></div>
              <div>ผู้ส่ง: <a href="mailto:${escapeHtml(sender)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(sender)}</a> | ผู้รับ: <a href="mailto:${escapeHtml(recipient)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(recipient)}</a></div>
              <div style="margin-top: 6px; font-size: 11px; color: #94a3b8;">สำนักงานสาธารณสุขจังหวัดศรีสะเกษ · กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateExpiryAlertPlainText({ items = [], warehouse = 'คลังยา สสจ.ศรีสะเกษ', generatedAt = new Date(), thresholdDays = 180, sender = DEFAULT_SENDER, recipient = DEFAULT_RECIPIENT }) {
  const dateStr = formatThaiDate(generatedAt);
  let text = `=================================================================\n`;
  text += `🚨 แจ้งเตือนรายการยาใกล้หมดอายุ (ภายใน ${Math.round(thresholdDays / 30)} เดือน)\n`;
  text += `คลัง: ${warehouse} | วันที่: ${dateStr}\n`;
  text += `ผู้ส่ง: ${sender} -> ผู้รับ: ${recipient}\n`;
  text += `=================================================================\n\n`;
  text += `พบรายการใกล้หมดอายุทั้งหมด ${items.length} รายการ:\n\n`;

  items.forEach((item, idx) => {
    const isExpired = Number(item.daysToExpiry) < 0;
    const daysLabel = isExpired ? `หมดอายุแล้ว ${Math.abs(item.daysToExpiry)} วัน` : `เหลือ ${item.daysToExpiry} วัน`;
    text += `${idx + 1}. ${item.name} (${item.code || '-'})\n`;
    text += `   - ล็อต: ${item.lot || '-'}\n`;
    text += `   - จำนวน: ${Number(item.qty || 0).toLocaleString('th-TH')} ${item.unit || 'หน่วย'}\n`;
    text += `   - วันหมดอายุ: ${formatThaiDate(item.expiry)} [${daysLabel}]\n\n`;
  });

  text += `-----------------------------------------------------------------\n`;
  text += `ระบบบริหารเวชภัณฑ์ Stock Logistics Sisaket\n`;
  return text;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendExpiryAlertEmail({ items = [], warehouse = 'คลังยา สสจ.ศรีสะเกษ', sender = DEFAULT_SENDER, recipient = DEFAULT_RECIPIENT, thresholdDays = 180 }) {
  const subject = `[แจ้งเตือนด่วน] รายการยาใกล้หมดอายุภายใน 6 เดือน (${items.length} รายการ) - ${warehouse}`;
  const html = generateExpiryAlertEmailHtml({ items, warehouse, thresholdDays, sender, recipient });
  const text = generateExpiryAlertPlainText({ items, warehouse, thresholdDays, sender, recipient });

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || sender;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD || '';

  const result = {
    sender,
    recipient,
    subject,
    itemCount: items.length,
    sentAt: new Date().toISOString(),
    mode: 'simulation',
    success: true,
    messageId: `sim-${Date.now()}@stocklogistics.ssk`,
    detail: ''
  };

  if (nodemailer && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const info = await transporter.sendMail({
        from: `"Stock Logistics SSK" <${sender}>`,
        to: recipient,
        subject,
        text,
        html
      });

      result.mode = 'smtp';
      result.messageId = info.messageId;
      result.detail = `ส่งอีเมลผ่าน SMTP สำเร็จไปยัง ${recipient}`;
    } catch (smtpErr) {
      console.error('[EmailService] SMTP Error:', smtpErr.message);
      result.mode = 'smtp_fallback';
      result.success = false;
      result.error = smtpErr.message;
      result.detail = `ไม่สามารถส่งผ่าน SMTP ได้ (${smtpErr.message}) - บันทึกประวัติการส่งในระบบเรียบร้อย`;
    }
  } else {
    result.mode = 'simulation';
    result.detail = `จำลองการส่งอีเมลสำเร็จ (หากต้องการส่งจริงผ่าน Gmail กรุณาตั้งค่า GMAIL_APP_PASSWORD ใน Environment Variables)`;
  }

  return {
    ...result,
    previewHtml: html,
    previewText: text
  };
}

module.exports = {
  DEFAULT_SENDER,
  DEFAULT_RECIPIENT,
  formatThaiDate,
  generateExpiryAlertEmailHtml,
  generateExpiryAlertPlainText,
  sendExpiryAlertEmail
};
