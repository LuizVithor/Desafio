import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { product } from '@/common/components/Products/controller';
import ProductDetails from '@/common/components/Products/components/ProductDetails';

describe('ProductDetails Component', () => {
    let sampleProduct: product;

    beforeEach(() => {
        sampleProduct = {
            id: 1,
            title: 'Produto Exemplo',
            description: 'Descrição do produto exemplo.',
            price: 99.99,
            discountPercentage: 10,
            rating: 4.5,
            stock: 10,
            brand: 'Marca Exemplo',
            category: 'Categoria Exemplo',
            thumbnail: '/images/produto-exemplo.jpg',
            images: ['/images/produto-exemplo.jpg'],
            tags: ['Exemplo', 'Teste'],
            availabilityStatus: 'In Stock',
            weight: 1.5,
            dimensions: { width: 10, depth: 5, height: 2 },
            minimumOrderQuantity: 1,
            returnPolicy: '30 dias',
            warrantyInformation: '1 ano',
            shippingInformation: 'Enviado em 2 dias',
            reviews: [
                {
                    rating: 5,
                    reviewerName: 'João',
                    date: new Date().toISOString(),
                    comment: 'Excelente produto!',
                    reviewerEmail: 'joao@gmail.com'
                },
            ],
            sku: 'SKU123',
            meta: {
                qrCode: '/images/qrcode.png',
                barcode: '123456789012',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        };
    });

    const renderComponent = (productProp: product) =>
        render(<ProductDetails product={productProp} />);

    it('deve renderizar a descrição do produto', () => {
        renderComponent(sampleProduct);
        expect(screen.getByText(sampleProduct.description)).toBeInTheDocument();
    });

    it('deve renderizar as informações gerais', () => {
        renderComponent(sampleProduct);
        expect(screen.getByText('Informações Gerais')).toBeInTheDocument();
        expect(screen.getByText('SKU')).toBeInTheDocument();
        expect(screen.getByText(sampleProduct.sku || "")).toBeInTheDocument();
        expect(screen.getByText('Marca')).toBeInTheDocument();
        expect(screen.getByText(sampleProduct.brand || "")).toBeInTheDocument();
        expect(screen.getByText('Categoria')).toBeInTheDocument();
        expect(screen.getByText(sampleProduct.category)).toBeInTheDocument();
        expect(screen.getByText('Peso')).toBeInTheDocument();
        expect(screen.getByText(`${sampleProduct.weight} kg`)).toBeInTheDocument();
        expect(screen.getByText('Dimensões')).toBeInTheDocument();
        expect(
            screen.getByText(
                `${sampleProduct.dimensions.width} x ${sampleProduct.dimensions.depth} x ${sampleProduct.dimensions.height} cm`
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Quantidade Mínima de Pedido')).toBeInTheDocument();
        expect(
            screen.getByText(sampleProduct.minimumOrderQuantity.toString())
        ).toBeInTheDocument();
    });

    it('deve renderizar os detalhes adicionais', () => {
        renderComponent(sampleProduct);
        expect(screen.getByText('Detalhes Adicionais')).toBeInTheDocument();
        expect(screen.getByText('Preço')).toBeInTheDocument();
        expect(
            screen.getByText(`R$ ${sampleProduct.price.toFixed(2)}`)
        ).toBeInTheDocument();
        expect(screen.getByText('Desconto')).toBeInTheDocument();
        expect(
            screen.getByText(`${sampleProduct.discountPercentage}%`)
        ).toBeInTheDocument();
        expect(screen.getByText('Disponibilidade')).toBeInTheDocument();
        expect(
            screen.getByText(sampleProduct.availabilityStatus || "")
        ).toBeInTheDocument();
        expect(screen.getByText('Estoque')).toBeInTheDocument();
        expect(screen.getByText(sampleProduct.stock.toString())).toBeInTheDocument();
        expect(screen.getByText('Política de Devolução')).toBeInTheDocument();
        expect(
            screen.getByText(sampleProduct.returnPolicy || "")
        ).toBeInTheDocument();
        expect(screen.getByText('Garantia')).toBeInTheDocument();
        expect(
            screen.getByText(sampleProduct.warrantyInformation || "")
        ).toBeInTheDocument();
        expect(screen.getByText('Informações de Envio')).toBeInTheDocument();
        expect(
            screen.getByText(sampleProduct.shippingInformation || "")
        ).toBeInTheDocument();
    });

    it('deve renderizar as tags', () => {
        renderComponent(sampleProduct);
        expect(screen.getByText('Tags')).toBeInTheDocument();
        sampleProduct.tags?.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    it('deve renderizar as avaliações', () => {
        renderComponent(sampleProduct);
        expect(screen.getByText('Avaliações')).toBeInTheDocument();
        sampleProduct.reviews?.forEach((review) => {
            expect(screen.getByText(review.reviewerName)).toBeInTheDocument();
            expect(screen.getByText(review.comment)).toBeInTheDocument();
        });
    });

    it('deve renderizar uma mensagem quando não há avaliações', () => {
        sampleProduct.reviews = [];
        renderComponent(sampleProduct);
        expect(screen.getByText('Avaliações')).toBeInTheDocument();
        expect(
            screen.getByText('Nenhuma avaliação disponível.')
        ).toBeInTheDocument();
    });

    it('deve renderizar as meta informações', () => {
        renderComponent(sampleProduct);
        expect(screen.getByText('Meta Informações')).toBeInTheDocument();
        expect(screen.getByText('Código QR')).toBeInTheDocument();
        const qrCodeImage = screen.getByAltText('Código QR');
        expect(qrCodeImage).toBeInTheDocument();
        expect(qrCodeImage).toHaveAttribute('src', sampleProduct.meta?.qrCode);

        expect(screen.getByText('Código de Barras')).toBeInTheDocument();
        const barcodeElement = screen.getByTestId('barcode');
        expect(barcodeElement).toBeInTheDocument();

        expect(screen.getByText('Criado em')).toBeInTheDocument();
        expect(screen.getByText(/Criado em/)).toBeInTheDocument();
        expect(screen.getByText('Atualizado em')).toBeInTheDocument();
    });

    it('deve renderizar uma mensagem quando o QR code não está disponível', () => {
        sampleProduct.meta!.qrCode = '';
        renderComponent(sampleProduct);
        expect(
            screen.getByText('Código QR não disponível.')
        ).toBeInTheDocument();
    });

    it('deve renderizar uma mensagem quando o código de barras não está disponível', () => {
        sampleProduct.meta!.barcode = '';
        renderComponent(sampleProduct);
        expect(
            screen.getByText('Código de barras não disponível.')
        ).toBeInTheDocument();
    });

    it('deve lidar corretamente com campos opcionais ausentes', () => {
        const { brand, ...productWithoutBrand } = sampleProduct;
        renderComponent(productWithoutBrand as product);
        expect(screen.getByText('Marca')).toBeInTheDocument();
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('deve corresponder ao snapshot', () => {
        const { asFragment } = renderComponent(sampleProduct);
        expect(asFragment()).toMatchSnapshot();
    });
});
