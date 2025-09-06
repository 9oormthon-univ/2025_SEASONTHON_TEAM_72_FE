import { axiosInstance } from "./axiosInstance";
import type { ProfileType } from "../types/common";

export const postLogin = async (
  email: string,
  password: string,
  nickname: string
): Promise<ProfileType | undefined> => {
  try {
    const res = await axiosInstance.post("api/v1/auth/login", {
      params: {
        email: email,
        password: password,
        nickname: nickname,
      },
    });
    return res.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

export const postSignup = async (
  email: string,
  password: string,
  nickname: string
): Promise<ProfileType | undefined> => {
  try {
    const res = await axiosInstance.post("api/v1/auth/signup", {
      params: {
        email: email,
        password: password,
        nickname: nickname,
      },
    });
    return res.data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};
