import styled, { css } from "styled-components";
import { SETTLEMENT_STATUS_LABEL } from "../../constants/status";
import { FaRegCheckCircle } from "react-icons/fa";

export interface AlarmListItemProps {
  settlementName: string;
  alarmText: string;
  status: keyof typeof SETTLEMENT_STATUS_LABEL; // backend enum
  read: boolean;
}

const AlarmListItem: React.FC<AlarmListItemProps> = ({
  settlementName,
  alarmText,
  status,
  read,
}) => {
  return (
    <Item $read={read}>
      <StatusBadge $status={status} />
      <AlarmText>
        [{settlementName}] {alarmText}
      </AlarmText>
    </Item>
  );
};

export default AlarmListItem;

const Item = styled.div<{ $read: boolean }>`
  display: flex;
  padding: 6px 10px 6px;
  margin-bottom: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  gap: 3px;
  background: ${({ $read }) => ($read ? "#ffffff" : "#eeeeee")};
`;

const AlarmText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
`;

const StatusBadge = styled(FaRegCheckCircle)<{
  $status: keyof typeof SETTLEMENT_STATUS_LABEL;
}>`
  font-size: 12px;
  padding: 3px 6px 4px;
  font-weight: 600;

  ${({ $status }) => {
    switch ($status) {
      case "IN_PROGRESS":
        return css`
          color: #00d337;
        `;
      case "AWAITING_DEPOSIT":
        return css`
          color: #f44336;
        `;
      case "NEEDS_ATTENTION":
        return css`
          color: #f44336;
        `;
      case "DONE":
        return css`
          color: #9e9e9e;
        `;
      default:
        return css``;
    }
  }}
`;
