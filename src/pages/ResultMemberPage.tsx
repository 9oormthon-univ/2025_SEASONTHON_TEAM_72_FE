import styled from "styled-components";
import ReceiptDropdown from "../components/common/ReceiptDropdown";
import AccountListItem from "../components/Result/AccountListItem";
import settlementManagerData from "../mocks/settlementManagerData.json";
import { SettleupResultPageLayout, TitleWrapper } from "./ResultManagerPage";
import bankData from "../mocks/bankData.json";

const ResultMemberPage = () => {
  return (
    <SettleupResultPageLayout>
      <TitleWrapper>
        <TitleP>하나로마트 정산</TitleP>
      </TitleWrapper>
      <ContentSection>
        <WarningDiv>❗입금 시 입금자명은 참여 닉네임으로 해주세요.</WarningDiv>
        <ReceiptDiv>
          {(() => {
            const myName = "이채영"; // TODO global state
            const list = settlementManagerData.data;
            const mine = list.find((d) => d.user === myName);
            const total = list.find((d) => /전체/.test(d.user));
            const others = list.filter((d) => d !== mine && d !== total);
            const ordered = [mine, total, ...others.filter(Boolean)];
            return ordered
              .filter(Boolean)
              .map((entry) => (
                <ReceiptDropdown
                  key={entry!.user}
                  data={{ user: entry!.user, items: entry!.items }}
                />
              ));
          })()}
        </ReceiptDiv>
        <AccountDiv>
          <p>입금 계좌</p>
          {bankData.map((it) => {
            return (
              <AccountListItem
                key={it.account_id}
                bank={it.bank_name}
                accountNumber={it.account_number}
                owner={it.user_name}
              />
            );
          })}
        </AccountDiv>
      </ContentSection>
    </SettleupResultPageLayout>
  );
};

export default ResultMemberPage;

const TitleP = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #eeeeee;
  width: auto;
  height: 100vh;
  width: 100%;
  margin: 0 20px 0 20px;
  padding-top: 20px;
`;

const WarningDiv = styled.div`
  width: 350px;
  padding: 6px 0 6px 3px;
  margin-bottom: 10px;
  background-color: #ffffd0;
  color: #f44336;
  font-size: 12px;
  font-weight: 800;
`;

const ReceiptDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;

  p {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 5px;
  }
`;
