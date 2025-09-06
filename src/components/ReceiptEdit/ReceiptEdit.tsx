import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가!
import styled from "styled-components";
import TopContent from "../ReceiptEdit/TopContent";
import ItemAddButton from "./ItemAddButton";
import ItemButton from "./ItemButton";
import ItemEditNav from "../ReceiptEdit/ItemEditNav";
import BottomNav from "../common/BottomNav";
import type { ReceiptData } from "../../apis/ocrApi";

interface ReceiptItem {
  id: number;
  title: string;
  count: string;
  price: string;
}

const ReceiptEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // location.state에서 OCR 데이터 추출
  const state = location.state as {
    receiptData?: ReceiptData;
    originalImage?: File;
  } | null;

  const { receiptData, originalImage } = state || {};

  // 기본 영수증 데이터
  const defaultReceiptData: ReceiptData = {
    storeName: '새로운 정산',
    date: new Date().toLocaleDateString('ko-KR'),
    items: [],
    totalAmount: 0,
  };

  // OCR 데이터를 UI 아이템 형태로 변환하는 함수
  const convertOCRDataToItems = (ocrData: ReceiptData): ReceiptItem[] => {
    return ocrData.items.map((item, index) => ({
      id: Date.now() + index,
      title: item.name || '품목명을 입력해 주세요',
      count: `${item.count}`,
      price: item.totalPrice.toLocaleString(),
    }));
  };

  // 상태 관리
  const finalReceiptData = receiptData || defaultReceiptData;
  const [receiptTitle, setReceiptTitle] = useState(finalReceiptData.storeName);
  const [receiptDate, setReceiptDate] = useState(finalReceiptData.date);
  const [items, setItems] = useState<ReceiptItem[]>(
    finalReceiptData.items.length > 0 
      ? convertOCRDataToItems(finalReceiptData)
      : []
  );
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // 네비게이션 핸들러들
  const handleBackClick = () => {
    navigate('/startsettlement');
  };

  const handlePreviewClick = () => {
    // 현재 편집된 데이터를 ReceiptData 형태로 변환
    const updatedReceiptData: ReceiptData = {
      storeName: receiptTitle,
      date: receiptDate,
      items: items.map(item => ({
        name: item.title,
        count: parseInt(item.count) || 1,
        unitPrice: Math.floor((parseInt(item.price.replace(/,/g, '')) || 0) / (parseInt(item.count) || 1)),
        totalPrice: parseInt(item.price.replace(/,/g, '')) || 0,
      })),
      totalAmount: items.reduce((sum, item) => sum + (parseInt(item.price.replace(/,/g, '')) || 0), 0),
    };

    navigate('/receiptconfirm', {
      state: {
        receiptData: updatedReceiptData,
        originalImage: originalImage
      }
    });
  };

  const handleSettlementClick = () => {
    // 현재 편집된 데이터를 ReceiptData 형태로 변환
    const updatedReceiptData: ReceiptData = {
      storeName: receiptTitle,
      date: receiptDate,
      items: items.map(item => ({
        name: item.title,
        count: parseInt(item.count) || 1,
        unitPrice: Math.floor((parseInt(item.price.replace(/,/g, '')) || 0) / (parseInt(item.count) || 1)),
        totalPrice: parseInt(item.price.replace(/,/g, '')) || 0,
      })),
      totalAmount: items.reduce((sum, item) => sum + (parseInt(item.price.replace(/,/g, '')) || 0), 0),
    };

    navigate('/selectpeoplecount', {
      state: {
        receiptData: updatedReceiptData
      }
    });
  };

  // 제목 변경 핸들러
  const handleTitleChange = (newTitle: string) => {
    setReceiptTitle(newTitle);
  };

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: string) => {
    setReceiptDate(newDate);
  };

  // 키보드 감지
  useEffect(() => {
    const initialViewportHeight = window.visualViewport?.height || window.innerHeight;

    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDiff = initialViewportHeight - currentHeight;

      setIsKeyboardOpen(heightDiff > 150);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
      };
    } else {
      window.addEventListener('resize', handleViewportChange);
      return () => {
        window.removeEventListener('resize', handleViewportChange);
      };
    }
  }, []);

  const handleAddItem = () => {
    const newItem: ReceiptItem = {
      id: Date.now(),
      title: "품목명을 입력해 주세요",
      count: "1",
      price: "0"
    };
    setItems(prevItems => [...prevItems, newItem]);
    
    // 새로 추가된 아이템을 바로 편집 모드로
    setEditingItemId(newItem.id);
    setIsEditingItem(true);
  };

  const handleItemClick = (id: number) => {
    setEditingItemId(id);
    setIsEditingItem(true);
  };

  const handleCloseEdit = () => {
    setIsEditingItem(false);
    setEditingItemId(null);
  };

  const handleSaveItem = () => {
    console.log('아이템 저장됨');
    setIsEditingItem(false);
    setEditingItemId(null);
  };

  const handleItemTitleChange = (name: string) => {
    if (editingItemId) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItemId 
            ? { ...item, title: name }
            : item
        )
      );
    }
  };

  const handleItemCountChange = (quantity: string) => {
    if (editingItemId) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItemId 
            ? { ...item, count: quantity }
            : item
        )
      );
    }
  };

  const handleItemPriceChange = (price: string) => {
    if (editingItemId) {
      // 숫자만 추출하여 저장
      const numericPrice = parseInt(price.replace(/[^0-9]/g, '')) || 0;
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItemId 
            ? { ...item, price: numericPrice.toLocaleString() }
            : item
        )
      );
    }
  };

  const currentEditingItem = editingItemId 
    ? items.find(item => item.id === editingItemId)
    : null;

   return (
    <ReceiptLayout $isKeyboardOpen={isKeyboardOpen}>
      <TopContentWrapper>
        <TopContent 
          title={receiptTitle}
          date={receiptDate}
          onTitleChange={handleTitleChange}
          onDateChange={handleDateChange}
          showBackButton={true}
          onBackClick={handleBackClick}
        />
      </TopContentWrapper>

      <ContentContainer>
        <ScrollableContent>
          {items.map((item) => (
            <ItemWrapper key={item.id}>
              <ItemButton
                title={item.title}
                count={item.count}
                price={item.price}
                onClick={() => handleItemClick(item.id)}
              />
            </ItemWrapper>
          ))}

          <ItemWrapper>
            <ItemAddButton onClick={handleAddItem} />
          </ItemWrapper>
        </ScrollableContent>
      </ContentContainer>

      <BottomNavWrapper $isEditingItem={isEditingItem}>
        {isEditingItem ? (
          <ItemEditNav 
            title={currentEditingItem?.title || ""}
            count={currentEditingItem?.count?.replace('개', '') ?? "1"}
            price={currentEditingItem?.price?.replace('원', '').replace(',', '') ?? "10"}
            onTitleChange={handleItemTitleChange}
            onCountChange={handleItemCountChange}
            onPriceChange={handleItemPriceChange}
            onSave={handleSaveItem}
            onClose={handleCloseEdit}
          />
        ) : (
          <BottomNav 
            description="수정된 영수증을 확인해 주세요."
            primaryLabel="미리보기"
            secondaryLabel="정산하러 가기"
            onPrimaryClick={handlePreviewClick}
            onSecondaryClick={handleSettlementClick}
          />
        )}
      </BottomNavWrapper>
    </ReceiptLayout>
  );
};

export default ReceiptEdit;

const ReceiptLayout = styled.div<{ $isKeyboardOpen: boolean }>`
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
  
  /* 키보드가 올라올 때 높이 조정 */
  ${props => props.$isKeyboardOpen && `
    height: 100dvh; /* dynamic viewport height 사용 */
    
    @supports not (height: 100dvh) {
      /* dvh를 지원하지 않는 브라우저를 위한 대체 */
      height: calc(var(--vh, 1vh) * 100);
    }
  `}
`;

const TopContentWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  z-index: 10;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  min-height: 0;
`;

const ScrollableContent = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemWrapper = styled.div`
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BottomNavWrapper = styled.div<{ $isEditingItem: boolean }>`
  flex-shrink: 0;
  width: 100%;
  position: relative;
  z-index: 10;
  
  /* 편집 모드일 때는 ItemEditNav가 키보드 위에 표시되도록 처리 */
  ${props => props.$isEditingItem && `
    position: relative;
    z-index: 11;
  `}
`;