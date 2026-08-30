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
  [/ลัง|case/giu, ' case '],
  [/อะม็อกซีซิลลิน|amoxicillin|amox/giu, ' amoxicillin '],
  [/เมทฟอร์มิน|metformin/giu, ' metformin '],
  [/ซิโปรฟลอกซาซิน|ciprofloxacin|cipro/giu, ' ciprofloxacin '],
  [/ไอบูโพรเฟน|ibuprofen/giu, ' ibuprofen '],
  [/โอเมพราโซล|omeprazole/giu, ' omeprazole '],
  [/แอมโลดิปีน|amlodipine/giu, ' amlodipine '],
  [/ไฮโดรคลอโรไทอะไซด์|hctz|hydrochlorothiazide/giu, ' hctz '],
  [/อะทีโนลอล|atenolol/giu, ' atenolol '],
  [/เอนาลาพริล|enalapril/giu, ' enalapril '],
  [/ลอซาร์แทน|losartan/giu, ' losartan '],
  [/ซิมวาสแตติน|simvastatin/giu, ' simvastatin '],
  [/กลูโคส|glucose|dextrose/giu, ' glucose '],
  [/น้ำเกลือ|normal saline|nss|nacl/giu, ' normalsaline '],
  [/สำลี|cotton/giu, ' cotton '],
  [/ผ้าก๊อซ|gauze/giu, ' gauze '],
  [/เข็มฉีดยา|syringe/giu, ' syringe '],
  [/ถุงมือ|glove/giu, ' glove ']
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

function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

function parseDosage(text) {
  const match = String(text || '').match(/(\d+(?:\.\d+)?)\s*(mg|g|mcg|ml|%)/iu);
  if (match) {
    return { value: Number(match[1]), unit: match[2].toLowerCase() };
  }
  return null;
}

const learnedMappings = new Map();

function learnFromDecision(mapping, items) {
  const isApproved = mapping.approved || mapping.status === 'approved';
  if (isApproved) {
    const sourceName = mapping.sourceName || (mapping.source && mapping.source.sourceName);
    const itemId = mapping.itemId || (mapping.target && mapping.target.id);
    if (sourceName && itemId) {
      if (!learnedMappings.has(itemId)) {
        learnedMappings.set(itemId, new Set());
      }
      learnedMappings.get(itemId).add(sourceName);
    }
  }
}

function scoreCandidate(source, item, options = {}) {
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
  
  const lev = levenshtein(sourceText, itemText);
  const maxLength = Math.max(sourceText.length, itemText.length, 1);
  const levSim = 1 - (lev / maxLength);
  
  let categoryBonus = 0;
  if (options.sourceCategory && item.category) {
    if (options.sourceCategory === item.category) {
      categoryBonus = 0.06;
    } else {
      categoryBonus = -0.04;
    }
  }
  
  let dosageBonus = 0;
  const sourceDosage = parseDosage(source.sourceName);
  const itemDosage = parseDosage(item.name + ' ' + (item.package || ''));
  if (sourceDosage && itemDosage) {
    if (sourceDosage.value === itemDosage.value && sourceDosage.unit === itemDosage.unit) {
      dosageBonus = 0.06;
    } else {
      dosageBonus = -0.08;
    }
  }
  
  let learnedBonus = 0;
  const learned = options.learnedMappings || learnedMappings;
  if (learned && learned.has(item.id) && learned.get(item.id).has(source.sourceName)) {
    learnedBonus = 0.15;
  }

  const baseScore = 0.18 + coverage * 0.5 + jaccard * 0.06 + unitMatch * 0.1 + containment * 0.04 + lexicalEvidence + distinctiveMatch * 0.1;
  const totalScore = baseScore + levSim * 0.08 + categoryBonus + dosageBonus + learnedBonus;
  const confidence = Math.min(0.995, Math.max(0.05, totalScore));
  
  const reasons = [];
  if (common.length) reasons.push(`คำสำคัญตรงกัน: ${common.slice(0, 4).join(', ')}`);
  if (unitMatch) reasons.push(`หน่วยตรงกัน: ${item.unit}`);
  if (distinctiveMatch) reasons.push('พบคำจำเพาะของผลิตภัณฑ์/ผู้ผลิตตรงกัน');
  if (containment) reasons.push('ชื่อหลังปรับมาตรฐานมีโครงสร้างเดียวกัน');
  if (categoryBonus > 0) reasons.push('หมวดหมู่ตรงกัน');
  if (dosageBonus > 0) reasons.push('ขนาดยาตรงกัน');
  if (learnedBonus > 0) reasons.push('เคยจับคู่รายการนี้แล้ว');
  if (levSim > 0.8) reasons.push('ชื่อคล้ายคลึงกันมาก');
  if (!reasons.length) reasons.push('ความคล้ายต่ำ ควรตรวจสอบด้วยตนเอง');
  
  return { itemId: item.id, confidence: Number(confidence.toFixed(3)), reasons };
}

function suggestMappings(source, items, topN = 3, options = {}) {
  // Support both (source, items, limit) and (source, items, topN, options)
  return items
    .filter(item => item.active)
    .map(item => scoreCandidate(source, item, options))
    .sort((a, b) => b.confidence - a.confidence || a.itemId.localeCompare(b.itemId))
    .slice(0, Math.max(1, Math.min(5, topN)));
}

module.exports = { normalize, tokens, scoreCandidate, suggestMappings, levenshtein, parseDosage, learnFromDecision, learnedMappings };

