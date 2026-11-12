// 경주트립 CRM 읽기용 Apps Script 예시
// 이 파일은 GitHub 참고본입니다. 실제로는 `일자별 자동주문현황`에 연결된 Apps Script 프로젝트에 넣어 배포해야 합니다.

function crmJson_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('_CRM');
  if (!sheet) throw new Error('_CRM 시트를 찾을 수 없습니다.');

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { customers: [] };

  const rows = sheet.getRange(2, 1, lastRow - 1, 12).getDisplayValues();
  const customers = rows
    .filter((row) => row[0])
    .map((row) => ({
      id: row[0],
      name: row[1],
      phone: row[2],
      firstVisit: row[3],
      lastVisit: row[4],
      orders: Number(String(row[5]).replace(/,/g, '')) || 0,
      revenue: Number(String(row[6]).replace(/,/g, '')) || 0,
      people: Number(String(row[7]).replace(/,/g, '')) || 0,
      products: String(row[8] || '').split(',').map((v) => v.trim()).filter(Boolean),
      segment: row[9] || '신규',
      lastOrder: row[10],
      source: row[11] || '일자별 자동주문현황',
    }));

  return { customers };
}

// 기존 프로젝트에 doGet이 이미 있다면 아래 분기를 기존 doGet 안에 합치세요.
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'crm') {
    return ContentService
      .createTextOutput(JSON.stringify(crmJson_()))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
