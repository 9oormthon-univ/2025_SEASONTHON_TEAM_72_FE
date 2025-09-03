import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface SelectionAdjusterProps {
  initialValue: number;
  max: number; // quantity
  onChange: (value: number) => void; // 실시간 변경 전달
}

// 350 x 40, 배경 #d9d9d9, radius 10px
const SelectionAdjuster: React.FC<SelectionAdjusterProps> = ({
  initialValue,
  max,
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // editing 전환 시 focus
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const clamp = (v: number) => {
    if (Number.isNaN(v) || v < 0) return 0;
    if (v > max) v = max;
    // 소수 둘째 자리까지 유지하되 표시 시엔 trailing zero 제거
    const rounded = Math.round(v * 100) / 100;
    return rounded;
  };

  const stepChange = (delta: number) => {
    setValue((prev) => {
      const next = prev + delta;
      // 0.5 단위 스냅
      const snapped = Math.round(next / 0.5) * 0.5;
      return clamp(snapped);
    });
  };

  const handleDirectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    if (Number.isNaN(raw)) {
      setValue(0);
    } else {
      setValue(clamp(raw));
    }
  };

  const commit = () => {
    const v = clamp(value);
    setValue(v);
    onChange(v);
    setEditing(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") {
      setValue(initialValue);
      setEditing(false);
    }
  };

  return (
    <Wrapper>
      <ControlRow>
        <SideButton
          type="button"
          aria-label="decrease"
          onClick={() => stepChange(-0.5)}
        >
          -
        </SideButton>
        <ValueArea onClick={() => !editing && setEditing(true)}>
          {editing ? (
            <ValueInput
              ref={inputRef}
              value={value}
              onChange={handleDirectChange}
              onKeyDown={onKey}
              onBlur={commit}
              step={0.5}
              min={0}
              max={max}
              type="number"
            />
          ) : (
            <ValueText>
              {Number.isInteger(value)
                ? value
                : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}
            </ValueText>
          )}
        </ValueArea>
        <SideButton
          type="button"
          aria-label="increase"
          onClick={() => stepChange(0.5)}
        >
          +
        </SideButton>
      </ControlRow>
    </Wrapper>
  );
};

export default SelectionAdjuster;

// styles
const Wrapper = styled.div`
  width: 350px;
  height: 40px;
  background: #d9d9d9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 4px 8px 6px;
  box-sizing: border-box;
  gap: 2px;
`;

// 상단 액션 제거 -> Drawer로 이동

const ControlRow = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  font-weight: 600;
  color: #000;
  width: 32px;
  text-align: center;
`;

const ValueArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ValueText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #f44336;
  user-select: none;
`;

const ValueInput = styled.input`
  width: 70px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  padding: 0;
  border: none;
  background: transparent;
  color: #f44336;
  outline: none;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
