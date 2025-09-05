import styled from "styled-components";
import ReceiptDropdown from "../components/common/ReceiptDropdown";
import settlementManagerData from "../mocks/settlementManagerData.json";
import { useState, useEffect } from "react";
import FloatingAlert from "../components/Result/FloatingAlert";

const ResultManagerPage = () => {
  const myName = "이채영"; // TODO replace with global user state
  const [showAlert, setShowAlert] = useState(false);
  const [bonus, setBonus] = useState(0);

  const trigger = () => {
    setBonus(Math.floor(Math.random() * 900 + 100));
    setShowAlert(true);
  };

  useEffect(() => {
    if (!showAlert) return;
    const t = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(t);
  }, [showAlert]);

  return (
    <SettleupResultPageLayout>
      <TitleWrapper>
        <TitleP>하나로마트 정산</TitleP>
      </TitleWrapper>
      <ReceiptDiv>
        {(() => {
          const myNameKey = myName;
          const list = settlementManagerData.data;
          const mine = list.find((d) => d.user === myNameKey);
          const total = list.find((d) => /전체/.test(d.user));
          const others = list.filter((d) => d !== mine && d !== total);
          const ordered = [mine, total, ...others.filter(Boolean)];
          return (
            <>
              {ordered.filter(Boolean).map((entry) => (
                <ReceiptDropdown
                  key={entry!.user}
                  initialPaid={entry!.is_paid}
                  data={{ user: entry!.user, items: entry!.items }}
                />
              ))}
              <button onClick={trigger}>show floating alert</button>
            </>
          );
        })()}
      </ReceiptDiv>
      <FloatingAlert
        show={showAlert}
        message={`🍀${myName} 님 행운의 +${bonus}원 당첨!🍀`}
        onClose={() => setShowAlert(false)}
      />
    </SettleupResultPageLayout>
  );
};

export default ResultManagerPage;

export const SettleupResultPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eeeeee;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-top: 18px;
`;

const TitleP = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const ReceiptDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: auto;
  height: 100vh;
  width: 100%;
  margin: 24px 20px 0 20px;
  padding-top: 20px;
`;
