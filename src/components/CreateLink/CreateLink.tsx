import React, { useState } from "react";
import styled from "styled-components";

interface CreateLinkProps {
  onSubmit?: (linkData: LinkFormData) => void;
}

export interface LinkFormData {
  title: string;
  url: string;
  description: string;
  category: string;
}

const CreateLink: React.FC<CreateLinkProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: "",
    url: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState<Partial<LinkFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 메시지 제거
    if (errors[name as keyof LinkFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LinkFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL을 입력해주세요";
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "올바른 URL 형식을 입력해주세요";
    }

    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요";
    }

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit?.(formData);
      // 폼 초기화
      setFormData({
        title: "",
        url: "",
        description: "",
        category: "",
      });
      alert("링크가 성공적으로 생성되었습니다!");
    }
  };

  return (
    <CreateLinkContainer>
      <Title>새로운 링크 생성</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">제목 *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="링크 제목을 입력하세요"
            hasError={!!errors.title}
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="url">URL *</Label>
          <Input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://example.com"
            hasError={!!errors.url}
          />
          {errors.url && <ErrorMessage>{errors.url}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">설명 *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="링크에 대한 설명을 입력하세요"
            rows={3}
            hasError={!!errors.description}
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">카테고리 *</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            hasError={!!errors.category}
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="work">업무</option>
            <option value="study">학습</option>
            <option value="entertainment">엔터테인먼트</option>
            <option value="shopping">쇼핑</option>
            <option value="other">기타</option>
          </Select>
          {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">
          링크 생성하기
        </SubmitButton>
      </Form>
    </CreateLinkContainer>
  );
};

export default CreateLink;

// Styled Components
const CreateLinkContainer = styled.div`
  padding: 24px;
  max-width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input<{ hasError: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#ff6b6b' : '#e1e5e9'};
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ff6b6b' : '#4a90e2'};
  }

  &::placeholder {
    color: #999;
  }
`;

const Textarea = styled.textarea<{ hasError: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#ff6b6b' : '#e1e5e9'};
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ff6b6b' : '#4a90e2'};
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select<{ hasError: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#ff6b6b' : '#e1e5e9'};
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ff6b6b' : '#4a90e2'};
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 12px;

  &:hover {
    background-color: #357abd;
  }

  &:active {
    background-color: #2d6da3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
