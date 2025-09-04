import axios, { type AxiosResponse } from 'axios';

// Minimal OCR result type containing only fields we actually read
export interface OCRResult {
  images: Array<{
    receipt?: {
      result: {
        subResults: Array<{
          items: Array<{
            name?: { text?: string };
            count?: { text?: string; formatted?: { value?: string } };
            price?: {
              price?: { text?: string; formatted?: { value?: string } };
              unitPrice?: { text?: string; formatted?: { value?: string } };
            };
          }>;
        }>;
        totalPrice?: {
          price?: {
            text?: string;
            formatted?: {
              value?: string;
            };
          };
        };
      };
    };
  }>;
}

export interface OCRApiConfig {
  apiUrl: string;
  secretKey: string;
}

class OCRApiService {
  private config: OCRApiConfig;

  constructor(config: OCRApiConfig) {
    this.config = config;
  }

  private async simulateDelay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //더미 데이터 
  private buildMockResult(imageFile: File): OCRResult {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return {
      version: 'V2',
      requestId: `mock-receipt-${Date.now()}`,
      timestamp: Date.now(),
      images: [
        {
          uid: 'mock-uid',
          name: imageFile.name,
          inferResult: 'SUCCESS',
          message: 'This is a mock OCR result',
          validationResult: { result: 'NO_REQUESTED' },
          receipt: {
            result: {
              storeInfo: {
                name: { text: '피자집', formatted: { value: '피자집' } },
                subName: { text: '강남점' },
                bizNum: { text: '123-45-67890', formatted: { value: '123-45-67890' } },
                addresses: [{ text: '서울시 강남구 테헤란로 123' }],
                tel: { text: '02-123-4567', formatted: { value: '02-123-4567' } },
              },
              paymentInfo: {
                date: { text: `${year}-${month}-${day}`, formatted: { year, month, day } },
                time: { text: `${hour}:${minute}:${second}`, formatted: { hour, minute, second } },
                cardInfo: {
                  company: { text: 'KB국민카드' },
                  number: { text: '****-****-****-1234', formatted: { value: '****-****-****-1234' } },
                },
              },
              subResults: [
                {
                  items: [
                    {
                      name: { text: '페퍼로니 피자' },
                      count: { text: '1', formatted: { value: '1' } },
                      price: {
                        price: { text: '18,000원', formatted: { value: '18000' } },
                        unitPrice: { text: '18,000원', formatted: { value: '18000' } },
                      },
                    },
                    {
                      name: { text: '콜라 1.5L' },
                      count: { text: '2', formatted: { value: '2' } },
                      price: {
                        price: { text: '6,000원', formatted: { value: '6000' } },
                        unitPrice: { text: '3,000원', formatted: { value: '3000' } },
                      },
                    },
                  ],
                },
              ],
              totalPrice: {
                price: { text: '24,000원', formatted: { value: '24000' } },
              },
            },
          },
        },
      ],
    } as unknown as OCRResult;
  }

  //options?.mock === true 
  //또는 .env의 VITE_USE_OCR_MOCK === 'true'이면
  //백엔드 호출 없이 더미 결과 반환
  async processReceiptImage(imageFile: File, options?: { mock?: boolean }): Promise<OCRResult> {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const requestJson = {
      version: 'V2',
      requestId: `receipt-${Date.now()}`,
      timestamp: Date.now(),
      lang: 'ko',
      images: [
        {
          format: imageFile.type.split('/')[1].toUpperCase(),
          name: imageFile.name,
        },
      ],
      enableTableDetection: false,
    };

    formData.append('message', JSON.stringify(requestJson));

    try {
      // 목업 모드: 옵션 또는 환경변수로 제어
      if (options?.mock === true || import.meta.env.VITE_USE_OCR_MOCK === 'true') {
        // Simulate network/processing delay
        await this.simulateDelay(1200);
        return this.buildMockResult(imageFile);
      }

      const response: AxiosResponse<OCRResult> = await axios.post(
        this.config.apiUrl,
        formData,
        {
          headers: {
            'X-OCR-SECRET': this.config.secretKey,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30초 타임아웃
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('OCR 처리 시간이 초과되었습니다. 다시 시도해주세요.');
        }
        const status = error.response?.status;
        if (status === 400) {
          throw new Error('이미지 형식이 올바르지 않습니다.');
        }
        if (status === 401) {
          throw new Error('OCR API 인증에 실패했습니다.');
        }
        if (status === 429) {
          throw new Error('API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
        }
        if (typeof status === 'number' && status >= 500) {
          throw new Error('OCR 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
      throw new Error('영수증 처리 중 오류가 발생했습니다.');
    }
  }

  validateImageFile(file: File): { isValid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: '지원하지 않는 이미지 형식입니다. (JPG, PNG, GIF, BMP만 지원)',
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: '이미지 크기가 너무 큽니다. (5MB 이하만 지원)',
      };
    }

    return { isValid: true };
  }
}

// OCR API 인스턴스 생성 (환경변수에서 설정값 가져오기)
export const ocrApi = new OCRApiService({
  apiUrl: import.meta.env.VITE_NAVER_OCR_API_URL || '',
  secretKey: import.meta.env.VITE_NAVER_OCR_SECRET_KEY || '',
});

export default OCRApiService;