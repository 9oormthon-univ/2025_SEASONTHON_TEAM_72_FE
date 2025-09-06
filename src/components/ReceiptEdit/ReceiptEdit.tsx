import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopContent from "../ReceiptEdit/TopContent";
import ItemAddButton from "./ItemAddButton";
import ItemButton from "./ItemButton";
import ItemEditNav from "../ReceiptEdit/ItemEditNav";
import BottomNav from "../common/BottomNav";

interface ReceiptItem {
  id: number;
  title: string;
  count: string;
  price: string;
}

const ReceiptEdit = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // 네비게이션 핸들러들
  const handleBackClick = () => {
    navigate('/startsettlement');
  };

  const handlePreviewClick = () => {
    navigate('/receiptconfirm');
  };

  const handleSettlementClick = () => {
    navigate('/selectpeoplecount');
  };

  // 키보드 감지
  useEffect(() => {
    const initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDiff = initialViewportHeight - currentHeight;
      
      setIsKeyboardOpen(heightDiff > 150); // 150px 이상 차이나면 키보드가 올라온 것으로 판단
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
      count: "1개",
      price: "10원"
    };
    setItems(prevItems => [...prevItems, newItem]);
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

  const handleTitleChange = (name: string) => {
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

  const handleCountChange = (quantity: string) => {
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

  const handlePriceChange = (price: string) => {
    if (editingItemId) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItemId 
            ? { ...item, price: price }
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
          title="새로운 정산"
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
            count={currentEditingItem?.count?.replace('개', '') || "1"}
            price={currentEditingItem?.price?.replace('원', '').replace(',', '') || "10"}
            onTitleChange={handleTitleChange}
            onCountChange={handleCountChange}
            onPriceChange={handlePriceChange}
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