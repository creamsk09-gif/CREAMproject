const synonymRules = [
  [/พาราเซตามอล|พารา|para(?:cetamol)?/giu, ' paracetamol '],
  [/แอลกอฮอล์|alcohol|alc/giu, ' alcohol '],
  [/หน้ากากอนามัย|หน้ากาก|mask/giu, ' mask '],
  [/โพวิโดน|povidone[ -]?iodine|piodine/giu, ' povidone '],
  [/ถ่านกัมมันต์|activated charcoal|charcoal|carbon/giu, ' carbon '],
  [/chlorpheniramine|histatab|cpm/giu, ' chlorpheniramine '],
  [/ไซรัป|syrup/giu, ' syrup '],
  [/เจล|gel/giu, ' gel '],
  [/ชุด\s*ppe|ppe\s*set|ppe/giu, ' ppe '],
  [/เอนเทอรัล|enteral|feeding/giu, ' feeding '],
  [/เยาวราช|yaowarat/giu, ' yaowarat '],
  [/เสือดาว|sevenstar|leo/giu, ' leo '],
  [/องค์การเภสัชกรรม|gpo/giu, ' gpo '],
  [/กล่อง|box/giu, ' box '],
  [/ขวด|bottle/giu, ' bottle '],
  [/กระปุก|jar/giu, ' jar '],
  [/แผง|strip/giu, ' strip '],
  [/ลัง|case/giu, ' case ']
];

function normalize(value) {
  let text = String(value || '').toLowerCase().normalize('NFKC');
  for (const [pattern, replacement] of synonymRules) text = text.replace(pattern, replacement);
  return text
    .replace(/(mg|ml|g|w\/v|tab|tabs|tablet|s)\b/giu, ' ')
    .replace(/[^a-z0-9ก-๙]+/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value) {
  return new Set(normalize(value).split(' ').filter(token => token.length > 1));
}

function scoreCandidate(source, item) {
  const sourceText = normalize(`${source.sourceName} ${source.sourceCode || ''}`);
  const itemText = normalize(`${item.name} ${item.code || ''} ${item.package || ''}`);
  const sourceTokens = tokens(sourceText);
  const itemTokens = tokens(itemText);
  const common = [...sourceTokens].filter(token => itemTokens.has(token));
  const coverage = common.length / Math.max(1, sourceTokens.size);
  const union = new Set([...sourceTokens, ...itemTokens]).size;
  const jaccard = common.length / Math.max(1, union);
  const unitMatch = normalize(source.unit) && normalize(source.unit) === normalize(item.unit) ? 1 : 0;
  const containment = sourceText.length > 4 && (sourceText.includes(itemText) || itemText.includes(sourceText)) ? 1 : 0;
  const distinctiveTokens = new Set(['gpo', 'mymol', 'yaowarat', 'leo', 'povidone', 'feeding', 'chlorpheniramine', 'ppe', 'carbon', 'tensoplast', 'xmask', 'cemol', 'sara']);
  const distinctiveMatch = common.some(token => distinctiveTokens.has(token)) ? 1 : 0;
  const lexicalEvidence = Math.min(0.12, common.length * 0.03);
  const confidence = Math.min(0.995, Math.max(0.05, 0.18 + coverage * 0.5 + jaccard * 0.06 + unitMatch * 0.1 + containment * 0.04 + lexicalEvidence + distinctiveMatch * 0.1));
  const reasons = [];
  if (common.length) reasons.push(`คำสำคัญตรงกัน: ${common.slice(0, 4).join(', ')}`);
  if (unitMatch) reasons.push(`หน่วยตรงกัน: ${item.unit}`);
  if (distinctiveMatch) reasons.push('พบคำจำเพาะของผลิตภัณฑ์/ผู้ผลิตตรงกัน');
  if (containment) reasons.push('ชื่อหลังปรับมาตรฐานมีโครงสร้างเดียวกัน');
  if (!reasons.length) reasons.push('ความคล้ายต่ำ ควรตรวจสอบด้วยตนเอง');
  return { itemId: item.id, confidence: Number(confidence.toFixed(3)), reasons };
}

function suggestMappings(source, items, limit = 3) {
  return items
    .filter(item => item.active)
    .map(item => scoreCandidate(source, item))
    .sort((a, b) => b.confidence - a.confidence || a.itemId.localeCompare(b.itemId))
    .slice(0, Math.max(1, Math.min(5, limit)));
}

module.exports = { normalize, scoreCandidate, suggestMappings };
