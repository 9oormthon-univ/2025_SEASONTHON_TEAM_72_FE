import React, { useState } from "react";
import styled from "styled-components";
import TopContent from "../ReceiptEdit/TopContent";
import ItemAddButton from "./ItemAddButton";
import ItemButton from "./ItemButton";
import ItemEditNav from "../ReceiptEdit/ItemEditNav";
import BottomNav from "../common/BottomNav";

const ReceiptEdit = () => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

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
    // 저장 로직 추가 가능
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
    <ReceiptLayout>
      <TopContentWrapper>
        <TopContent 
          title="새로운 정산"
          showBackButton={true}
          onBackClick={() => console.log('뒤로가기')}
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

      <BottomNavWrapper>
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
            onPrimaryClick={() => console.log('미리보기')}
            onSecondaryClick={() => console.log('정산하러 가기')}
          />
        )}
      </BottomNavWrapper>
    </ReceiptLayout>
  );
};

export default ReceiptEdit;

const ReceiptLayout = styled.div`
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
  min-height: 0; /* 중요: flex item이 줄어들 수 있도록 함 */
`;

const ScrollableContent = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ItemWrapper = styled.div`
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BottomNavWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  position: relative;
  z-index: 10;
`;