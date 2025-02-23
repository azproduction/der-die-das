// components/styles.ts
import styled from "styled-components";
import { Theme } from "@/lib/theme";

export const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  background: ${({ theme, $variant }) =>
    $variant === "secondary" ? theme.colors.background : theme.colors.primary};
  color: ${({ theme, $variant }) =>
    $variant === "secondary" ? theme.colors.primary : theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.sizes.large};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};
  min-width: 120px;
  text-align: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Word = styled.h1<{ $isSuccess?: boolean; $isFailure?: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.huge};
  font-family: ${({ theme }) => theme.typography.fontFamilySans};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xxlarge};
  }

  color: ${({ theme, $isSuccess }) => {
    if ($isSuccess) {
      return theme.colors.success;
    }
  }};

  color: ${({ theme, $isFailure }) => {
    if ($isFailure) {
      return theme.colors.error;
    }
  }};

  transition: color ${({ theme }) => theme.transitions.fast};
`;

export const Feedback = styled.div<{ $isSuccess?: boolean }>`
  background: ${({ theme, $isSuccess }) =>
    $isSuccess ? theme.colors.success : theme.colors.error}20;
  color: ${({ theme, $isSuccess }) =>
    $isSuccess ? theme.colors.success : theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const Select = styled.select`
  appearance: none;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamilySans};
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Score = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-family: ${({ theme }) => theme.typography.fontFamilyMono};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;
