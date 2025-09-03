import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

const InvitationCodeContent = () => {
    const CODE_LENGTH = 6;
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // 코드 검증 함수 (실제 구현시에는 API 호출로 대체)
    const validateCode = async (inputCode: string): Promise<boolean> => {
        // 임시 검증 로직 - 실제로는 서버 API 호출
        // 예시: "ABC123"이 유효한 코드라고 가정
        const validCodes = ["ABC123", "TEST12", "DEMO01"];
        
        // 서버 응답 시뮬레이션을 위한 딜레이
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return validCodes.includes(inputCode);
    };

    // 정산 페이지로 이동하는 함수 (임시)
    const navigateToSettlement = (code: string) => {
        console.log('Valid code:', code);
        // TODO: 실제 라우팅 구현
    };

    // 코드 검사 실행
    const checkCode = async (inputCode: string) => {
        setIsChecking(true);
        setErrorMessage('');

        try {
            const isValid = await validateCode(inputCode);
            
            if (isValid) {
                // 유효한 코드인 경우 정산하기 페이지로 이동
                navigateToSettlement(inputCode);
            } else {
                // 유효하지 않은 코드인 경우 에러 메시지 표시
                setErrorMessage('참여코드를 다시 확인해 주세요.');
            }
        } catch (error) {
            setErrorMessage('참여코드를 다시 확인해 주세요.');
        } finally {
            setIsChecking(false);
        }
    };

    // 6자리가 모두 입력되면 자동으로 코드 검사 실행
    useEffect(() => {
        if (code.length === CODE_LENGTH) {
            checkCode(code);
        } else {
            // 입력이 변경되면 에러 메시지 초기화
            setErrorMessage('');
        }
    }, [code]);

    // 사용자가 입력 필드를 클릭하면 숨겨진 실제 input에 포커스를 줍니다.
    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    
    // 입력값이 변경될 때마다 상태를 업데이트합니다.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase(); // 대문자로 변환
        if (value.length <= CODE_LENGTH) {
            setCode(value);
        }
    };

    return (
        <InvitationCodePageLayout>
            <Title>참여 코드를 입력해 주세요.</Title>

            {/* 사용자가 클릭할 수 있는 보이는 입력 필드 컨테이너 */}
            <CodeInputContainer onClick={handleContainerClick}>
                {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                    const char = code[index];
                    const isFilled = char !== undefined && char !== '';
                    return (
                        <CodeInputBox 
                            key={index} 
                            $isFilled={isFilled}
                            $isChecking={isChecking && code.length === CODE_LENGTH}
                        >
                            {char || ''}
                        </CodeInputBox>
                    );
                })}
            </CodeInputContainer>
            
            {/* 실제 입력을 받는 숨겨진 input 요소 */}
            <HiddenInput
                ref={inputRef}
                type="text"
                value={code}
                onChange={handleInputChange}
                maxLength={CODE_LENGTH}
                disabled={isChecking}
            />

            {/* 로딩 상태 표시 */}
            {isChecking && (
                <LoadingMessage>
                    코드를 확인하는 중...
                </LoadingMessage>
            )}

            {/* 에러 메시지 표시 */}
            {errorMessage && (
                <ErrorMessage>
                    {errorMessage}
                </ErrorMessage>
            )}
        </InvitationCodePageLayout>
    );
};

export default InvitationCodeContent;

const InvitationCodePageLayout = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  margin-bottom: 16px;
`;

const CodeInputContainer = styled.div`
    display: flex;
    margin-top: 20px;
    position: relative;
    gap: 10px; 
    cursor: text;
`;

const CodeInputBox = styled.div<{ $isFilled: boolean; $isChecking: boolean }>`
    width: 30px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    transition: all 0.2s ease-in-out;

    /* isFilled 값에 따라 동적으로 스타일 변경 */
    background-color: ${props => props.$isFilled ? '#F44336' : '#E0E0E0'};
    color: ${props => props.$isFilled ? '#FFFFFF' : '#000000'};
    border: 2px solid ${props => props.$isFilled ? '#D32F2F' : '#BDBDBD'};
`;

const HiddenInput = styled.input`
    /* 화면에 보이지 않도록 처리 */
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
`;

const LoadingMessage = styled.div`
    margin-top: 20px;
    color: #666;
    font-size: 14px;
`;

const ErrorMessage = styled.div`
    margin-top: 20px;
    color: #F44336;
    font-size: 14px;
`;