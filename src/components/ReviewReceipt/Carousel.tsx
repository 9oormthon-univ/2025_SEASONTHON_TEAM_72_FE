import React, { useState } from "react";
import styled from "styled-components";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const count = React.Children.count(children);

  return (
    <CarouselWrapper>
      <CarouselInner count={count} current={current}>
        {React.Children.map(children, (child, idx) => (
          <CarouselItem key={idx} count={count}>
            {child}
          </CarouselItem>
        ))}
      </CarouselInner>
      <DotWrapper>
        {Array.from({ length: count }).map((_, idx) => (
          <Dot
            key={idx}
            active={current === idx}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </DotWrapper>
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const CarouselInner = styled.div<{ count: number; current: number }>`
  display: flex;
  width: ${({ count }) => count * 100}%;
  transform: ${({ current, count }) =>
    `translateX(-${(current * 100) / count}%)`};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CarouselItem = styled.div<{ count: number }>`
  flex: 0 0 ${({ count }) => 100 / count}%;
  width: ${({ count }) => 100 / count}%;
  display: flex;
  justify-content: center;
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 260px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Dot = styled.button<{ active: boolean }>`
  all: unset;
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
  max-width: 12px;
  max-height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#F44336" : "#d9d9d9")};
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: inline-block;
  transition: background 0.2s;
`;
