import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCardSkeleton from '@/common/components/Products/components/ProductCardSkeleton';

describe('ProductCardSkeleton Component', () => {
  it('deve renderizar o componente Card', () => {
    render(<ProductCardSkeleton />);
    const cardElement = screen.getByTestId('product-card-skeleton');
    expect(cardElement).toBeInTheDocument();
  });

  it('deve renderizar o esqueleto da imagem com o variante e altura corretos', () => {
    render(<ProductCardSkeleton />);
    const imageSkeleton = screen.getByTestId('skeleton-image');
    expect(imageSkeleton).toBeInTheDocument();
    expect(imageSkeleton).toHaveAttribute('data-variant', 'rectangular');
    expect(imageSkeleton).toHaveStyle('height: 200px');
  });

  it('deve renderizar os esqueletos de texto com variantes e larguras corretas', () => {
    render(<ProductCardSkeleton />);
    const textSkeletons = screen.getAllByTestId('skeleton-text');
    expect(textSkeletons.length).toBe(3);

    expect(textSkeletons[0]).toHaveAttribute('data-variant', 'text');
    expect(textSkeletons[0]).toHaveStyle('width: 60%');
    expect(textSkeletons[0]).toHaveStyle('height: 28px');

    expect(textSkeletons[1]).toHaveAttribute('data-variant', 'text');
    expect(textSkeletons[1]).toHaveStyle('width: 80%');

    expect(textSkeletons[2]).toHaveAttribute('data-variant', 'text');
    expect(textSkeletons[2]).toHaveStyle('width: 40%');
  });

  it('deve renderizar três esqueletos circulares dentro de um Stack', () => {
    render(<ProductCardSkeleton />);
    const stackElement = screen.getByTestId('skeleton-stack');
    expect(stackElement).toBeInTheDocument();

    const circularSkeletons = screen.getAllByTestId('skeleton-circular');
    expect(circularSkeletons.length).toBe(3);

    circularSkeletons.forEach((skeleton) => {
      expect(skeleton).toHaveAttribute('data-variant', 'circular');
      expect(skeleton).toHaveStyle('width: 20px');
      expect(skeleton).toHaveStyle('height: 20px');
    });
  });

  it('deve renderizar o esqueleto da ação com variante e tamanho corretos', () => {
    render(<ProductCardSkeleton />);
    const actionSkeleton = screen.getByTestId('skeleton-action');
    expect(actionSkeleton).toBeInTheDocument();
    expect(actionSkeleton).toHaveAttribute('data-variant', 'rectangular');
    expect(actionSkeleton).toHaveStyle('width: 100%');
    expect(actionSkeleton).toHaveStyle('height: 36px');
  });
});
