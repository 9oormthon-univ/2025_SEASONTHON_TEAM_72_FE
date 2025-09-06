import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

type ItemEditNavProps = {
  title?: string;
  count?: string;
  price?: string;
  onTitleChange?: (title: string) => void;
  onCountChange?: (count: string) => void;
  onPriceChange?: (price: string) => void;
  onSave?: () => void;
  onClose?: () => void;
};

const ItemEditNav: React.FC<ItemEditNavProps> = ({
  title = "",
  count = "2",
  price = "8,000",
  onTitleChange,
  onCountChange,
  onPriceChange,
  onSave,
  onClose,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState<number>(0);
  
  // 편집 상태 관리
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingCount, setIsEditingCount] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  
  // 임시 값 관리
  const [tempTitle, setTempTitle] = useState(title);
  const [tempCount, setTempCount] = useState(count);
  const [tempPrice, setTempPrice] = useState(price);

  useLayoutEffect(() => {
    if (barRef.current) {
      setSpacerHeight(barRef.current.offsetHeight);
    }
  }, []);

  // 제목 편집 관련 함수들
  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setTempTitle(title);
  };

  const handleTitleSave = () => {
    if (onTitleChange && tempTitle.trim()) {
      onTitleChange(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(title);
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    handleTitleSave();
  };

  // 수량 편집 관련 함수들
  const handleCountClick = () => {
    setIsEditingCount(true);
    setTempCount(count);
  };

  const handleCountSave = () => {
    if (onCountChange && tempCount.trim()) {
      onCountChange(tempCount.trim());
    }
    setIsEditingCount(false);
  };

  const handleCountKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCountSave();
    } else if (e.key === 'Escape') {
      setTempCount(count);
      setIsEditingCount(false);
    }
  };

  const handleCountBlur = () => {
    handleCountSave();
  };

  // 가격 편집 관련 함수들
  const handlePriceClick = () => {
    setIsEditingPrice(true);
    setTempPrice(price);
  };

  const handlePriceSave = () => {
    if (onPriceChange && tempPrice.trim()) {
      onPriceChange(tempPrice.trim());
    }
    setIsEditingPrice(false);
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePriceSave();
    } else if (e.key === 'Escape') {
      setTempPrice(price);
      setIsEditingPrice(false);
    }
  };

  const handlePriceBlur = () => {
    handlePriceSave();
  };

  return (
    <>
      <Spacer style={{ height: spacerHeight }} />
      <BarWrapper ref={barRef}>
        <CloseButton onClick={onClose}>
          <img src="src\assets\icons\cancel_icon.svg" alt="Close" />
        </CloseButton>
        
        <ItemTitleSection onClick={handleTitleClick}>
          {isEditingTitle ? (
            <ItemTitleInput
              type="text"
              value={tempTitle}
              placeholder="품목명을 입력해 주세요"
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              maxLength={50}
            />
          ) : (
            <TitleRow>
              <TitleText>
                {title || "품목명을 입력해 주세요"}
                <EditIcon onClick={(e) => {
                  e.stopPropagation();
                  handleTitleClick();
                }}>
                  <img src="/src/assets/icons/edit_icon.svg" alt="Edit" />
                </EditIcon>
              </TitleText>
            </TitleRow>
          )}
        </ItemTitleSection>

        <DetailRow onClick={handleCountClick}>
          <DetailLabel>수량</DetailLabel>
          {isEditingCount ? (
            <DetailInput
              type="number"
              value={tempCount}
              onChange={(e) => setTempCount(e.target.value)}
              onBlur={handleCountBlur}
              onKeyDown={handleCountKeyDown}
              autoFocus
              min="1"
            />
          ) : (
            <DetailValueContainer>
              <DetailValue>{count} 개</DetailValue>
              <Chevron>〉</Chevron>
            </DetailValueContainer>
          )}
        </DetailRow>
        
        <DetailRow onClick={handlePriceClick}>
          <DetailLabel>가격</DetailLabel>
          {isEditingPrice ? (
            <DetailInput
              type="text"
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
              onBlur={handlePriceBlur}
              onKeyDown={handlePriceKeyDown}
              autoFocus
              placeholder="0"
            />
          ) : (
            <DetailValueContainer>
              <DetailValue>{price} 원</DetailValue>
              <Chevron>〉</Chevron>
            </DetailValueContainer>
          )}
        </DetailRow>

        <SaveButton onClick={onSave}>저장하기</SaveButton>
      </BarWrapper>
    </>
  );
};

export default ItemEditNav;

const Spacer = styled.div`
  /* 동적 높이를 위한 스페이서 */
`;

const BarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 350px;
  background: #ffffff;
  box-shadow: 2px -2px 15px rgba(0, 0, 0, 0.1);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

const ItemTitleSection = styled.div`
  margin-top: 12px;
  cursor: pointer;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
`;

const TitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-family: "NanumSquare", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0;
  white-space: nowrap;
  
  overflow-x: auto;
  overflow-y: hidden;
  text-overflow: clip;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

const EditIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-left: 4px;
  
  img {
    width: 12px;
    height: 12px;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

const ItemTitleInput = styled.input`
  width: 100%;
  padding: 0 0 12px 0;
  border: none;
  border-bottom: 2px solid #333;
  background: transparent;
  font-family: "NanumSquare", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  outline: none;
  
  &::placeholder {
    color: #999;
    font-weight: 400;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const DetailLabel = styled.span`
  font-family: "NanumSquare", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333;
`;

const DetailValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailValue = styled.div`
  font-family: "NanumSquare", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333;
`;

const Chevron = styled.span`
  color: #999;
  font-size: 14px;
  font-weight: 300;
`;

const DetailInput = styled.input`
  padding: 4px 8px;
  border: 2px solid #007bff;
  border-radius: 6px;
  background-color: #fff;
  outline: none;
  font-family: "NanumSquare", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  text-align: right;
  min-width: 70px;
  
  &:focus {
    border-color: #0056b3;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  /* number input의 스피너 제거 */
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: "NanumSquare", sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 130%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #c0392b;
  }
  
  &:active {
    background-color: #a93226;
  }
`;