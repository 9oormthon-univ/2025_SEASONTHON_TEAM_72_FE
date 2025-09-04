import styled from "styled-components";
import React, { useState, useRef, useEffect, useCallback } from "react";
import ErrorIcon from '../../assets/icons/error-icon.svg';

// API 엔드포인트 상수
const API_ENDPOINTS = {
    VERIFY: '/api/invitation/verify',
    JOIN: '/api/invitation/join'
} as const;

// API 응답 타입 정의
interface CodeVerificationResponse {
    isValid: boolean;
    settlementId?: string;
    settlementTitle?: string;
    expirationTime?: string;
}

interface JoinResponse {
    participantId: string;
    settlementId: string;
    role: string;
    joinTime: string;
}

// 에러 타입 정의
interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

const InvitationCodeContent = () => {
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = useCallback((index: number, value: string) => {
        const filteredValue = value.replace(/[^A-Za-z0-9]/g, '');
        if (filteredValue.length > 1) return;
        
        const newCodes = [...codes];
        newCodes[index] = filteredValue.toUpperCase();
        setCodes(newCodes);
        setError(''); // 입력 시 에러 메시지 초기화

        if (filteredValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [codes]);

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !codes[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }, [codes]);

    // 초대코드 유효성 검증 API 호출
    const verifyInvitationCode = useCallback(async (code: string): Promise<CodeVerificationResponse> => {
        try {
            const response = await fetch(`${API_ENDPOINTS.VERIFY}?code=${code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                const errorData: ApiError = await response.json().catch(() => ({
                    message: `서버 오류가 발생했습니다. (${response.status})`,
                    status: response.status
                }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('코드 검증 실패:', error);
            throw error;
        }
    }, []);

    // 초대코드로 참여 API 호출
    const joinWithInvitationCode = useCallback(async (code: string): Promise<JoinResponse> => {
        try {
            const response = await fetch(API_ENDPOINTS.JOIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            
            if (!response.ok) {
                const errorData: ApiError = await response.json().catch(() => ({
                    message: `서버 오류가 발생했습니다. (${response.status})`,
                    status: response.status
                }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('참여 실패:', error);
            throw error;
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        const codeString = codes.join('');
        if (codeString.length < 6) {
            setError('참여 코드를 다시 확인해 주세요.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // 1. 먼저 코드 유효성 검증
            const verificationResult = await verifyInvitationCode(codeString);
            
            if (!verificationResult.isValid) {
                setError('유효하지 않은 참여 코드입니다.');
                return;
            }

            // 2. 만료 시간 체크 (선택적)
            if (verificationResult.expirationTime) {
                const expirationDate = new Date(verificationResult.expirationTime);
                const currentDate = new Date();
                
                if (currentDate > expirationDate) {
                    setError('만료된 참여 코드입니다.');
                    return;
                }
            }

            // 3. 유효한 코드라면 참여 진행
            const joinResult = await joinWithInvitationCode(codeString);
            
            console.log('참여 성공:', {
                participantId: joinResult.participantId,
                settlementId: joinResult.settlementId,
                role: joinResult.role,
                joinTime: joinResult.joinTime,
                settlementTitle: verificationResult.settlementTitle
            });

            // 성공 시 다음 페이지로 이동 또는 상태 업데이트
            // 예: router.push('/settlement/' + joinResult.settlementId);
            
        } catch (error) {
            console.error('처리 실패:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('참여 코드 처리 중 오류가 발생했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [codes, verifyInvitationCode, joinWithInvitationCode]);

    useEffect(() => {
        const codeString = codes.join('');
        if (codeString.length === 6 && !isLoading) {
            handleSubmit(); // 6자리 모두 입력되면 자동으로 제출
        }
    }, [codes, isLoading, handleSubmit]);

    return (
        <InvitationCodePageLayout>
            <ContentContainer>
                <Title>참여 코드를 입력해 주세요.</Title>
                <CodeInputContainer>
                    {codes.map((code, index) => (
                        <CodeInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={code}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength={1}
                            type="text"
                            $filled={!!code}
                            disabled={isLoading}
                            aria-label={`참여 코드 ${index + 1}번째 자리`}
                            autoComplete="off"
                        />
                    ))}
                </CodeInputContainer>
                {error && (
                    <ErrorMessage>
                        <ErrorIconImage src={ErrorIcon} alt="오류" />
                        "참여 코드를 다시 확인해 주세요."
                    </ErrorMessage>
                )}
            </ContentContainer>
        </InvitationCodePageLayout>
    );
};

export default InvitationCodeContent;

const InvitationCodePageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #ffffff;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding-top: 210px; 
`;

const Title = styled.h1`
    font-family: NanumSquare_ac;
    font-size: 17px;
    font-style: normal;
    font-weight: 800;
    line-height: 130%;
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
`;

const CodeInputContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
`;

const CodeInput = styled.input<{ $filled: boolean }>`
    width: 30px;
    height: 40px;
    border-radius: 8px;
    
    border: 2px solid ${props => props.$filled ? '#F44336' : '#D9D9D9'};
    background-color: ${props => props.$filled ? '#F44336' : '#D9D9D9'};
    color: ${props => props.$filled ? '#FFFFFF' : '#000000'};
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    line-height: 130%;
    transition: all 0.2s ease;

    &:focus {
        border-color: #F44336;
        background-color: ${props => props.$filled ? '#F44336' : '#FFFFFF'};
        outline: none;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px ${props => props.$filled ? '#F44336' : '#D9D9D9'} inset;
        -webkit-text-fill-color: ${props => props.$filled ? '#FFFFFF' : '#000000'};
    }
`;

const ErrorIconImage = styled.img`
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    margin-right: 8px;
`;

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F44336;
    text-align: center;
    font-family: NanumSquare_ac;
    font-size: 12px;
    font-weight: 700;
    line-height: 130%;
`;