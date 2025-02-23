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
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  margin: ${({ theme }) => theme.spacing.md} 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
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

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === "secondary" ? theme.colors.border : theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Word = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.huge};
  font-family: ${({ theme }) => theme.typography.fontFamilySans};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xxlarge};
  }
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
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;
