import type { OCRResult } from '../apis/ocrApi';
import type { ReceiptItem } from '../types/ocr';

function parsePrice(priceText: string): number {
  if (!priceText) return 0;
  const cleanPrice = priceText.replace(/[^\d]/g, '');
  return parseInt(cleanPrice) || 0;
}

export function extractReceiptItems(ocrResult: OCRResult): ReceiptItem[] {
  const image = ocrResult.images[0];
  const receipt = image.receipt?.result;
  const items: ReceiptItem[] = [];

  if (!receipt) {
    return items;
  }

  if (receipt.subResults && Array.isArray(receipt.subResults)) {
    receipt.subResults.forEach((subResult: any) => {
      if (subResult.items && Array.isArray(subResult.items)) {
        subResult.items.forEach((item: any) => {
          const name = item.name?.text || '알 수 없는 상품';
          const count = parseInt(item.count?.formatted?.value || item.count?.text || '1');
          const unitPrice = parsePrice(item.price?.unitPrice?.formatted?.value || item.price?.unitPrice?.text || '0');
          const totalPrice = parsePrice(item.price?.price?.formatted?.value || item.price?.price?.text || '0');

          items.push({
            name,
            count,
            unitPrice,
            totalPrice: totalPrice || (unitPrice * count),
          });
        });
      }
    });
  }

  return items;
}

export type { ReceiptItem };

// 사용자가 필요한 최소 정보 형태로 가공해 반환
// - name, count, price(항목 총액), unitprice(단가)
// - totalprice(영수증 총액), totalcount(총 수량)
export function extractReceiptData(ocrResult: OCRResult): {
  items: Array<{ name: string; count: number; price: number; unitprice: number }>;
  totalprice: number;
  totalcount: number;
} {
  const items = extractReceiptItems(ocrResult);

  const mapped = items.map((it) => ({
    name: it.name,
    count: it.count,
    price: it.totalPrice,
    unitprice: it.unitPrice,
  }));

  const totalcount = items.reduce((sum, it) => sum + (it.count || 0), 0);

  // OCR 응답의 totalPrice가 있으면 우선 사용, 없으면 항목 합계 사용
  const image = ocrResult.images[0];
  const receipt = image.receipt?.result;
  const totalFromResponse = receipt?.totalPrice?.price?.formatted?.value
    || receipt?.totalPrice?.price?.text
    || '0';

  const parsedFromResponse = parsePrice(String(totalFromResponse));
  const sumOfItems = items.reduce((sum, it) => sum + (it.totalPrice || 0), 0);
  const totalprice = parsedFromResponse > 0 ? parsedFromResponse : sumOfItems;

  return { items: mapped, totalprice, totalcount };
}