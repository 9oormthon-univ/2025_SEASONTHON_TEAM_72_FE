import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import ErrorIcon from '../../assets/icons/error-icon.svg';

const InvitationCodeContent = () => {
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    //테스트 용 참여코드 - 추후 삭제 
    const CORRECT_CODE = 'ASDF12';

    const handleInputChange = (index: number, value: string) => {
        const filteredValue = value.replace(/[^A-Za-z0-9]/g, '');
        if (filteredValue.length > 1) return;
        
        const newCodes = [...codes];
        newCodes[index] = value.toUpperCase(); // 대문자로 통일
        setCodes(newCodes);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !codes[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    //테스트 용 - 추후 수정
    const handleSubmit = () => {
        const codeString = codes.join('');
        if (codeString.length < 6) {
            setError('참여 코드를 다시 확인해 주세요.');
        } else if (codeString === CORRECT_CODE) {
            console.log('성공 코드가 일치합니다.');
        } else {
            setError('실패 코드가 일치하지 않습니다.');
        }
    };

    useEffect(() => {
        const codeString = codes.join('');
        if (codeString.length === 6) {
            handleSubmit(); // 6자리 모두 입력되면 자동으로 제출
        }
    }, [codes]);

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