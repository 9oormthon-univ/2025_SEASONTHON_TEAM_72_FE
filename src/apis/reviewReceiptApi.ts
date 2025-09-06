import { axiosInstance } from "./axiosInstance";

export const getReceiptListMember = async (settlementId: string | number) => {
  try {
    const res = await axiosInstance.get("/api/v1/receipts/member", {
      params: { settlementId },
    });
    return res.data;
  } catch (error) {
    console.error("getReceiptListMember 에러", error);
    throw error;
  }
};

// 관리자용 영수증 리스트 조회
export const getReceiptListManager = async (settlementId: string | number) => {
  try {
    const res = await axiosInstance.get("/api/v1/receipts/manager", {
      params: { settlementId },
    });
    return res.data;
  } catch (error) {
    console.error("getReceiptListManager 에러", error);
    throw error;
  }
};

// 은행 목록 조회
export const getBankList = async (managerId: number) => {
  try {
    const res = await axiosInstance.get("/api/v1/banks", {
      params: { managerId },
    });
    return res.data;
  } catch (error) {
    console.error("getBankList 에러", error);
    throw error;
  }
};
