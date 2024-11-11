import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { product } from '@/common/components/Products/controller';
import ProductCard from '@/common/components/Products/components/ProductCard';

jest.mock('@/lib/hooks', () => ({
    ...jest.requireActual('@/lib/hooks'),
    useAppDispatch: () => jest.fn(),
}));

describe('ProductCard Component', () => {
    let sampleProduct: product;
    let store: any;
    let dispatchMock: jest.Mock;

    beforeEach(() => {
        sampleProduct = {
            id: 1,
            title: 'Produto Exemplo',
            description: 'Descrição do produto exemplo.',
            price: 100,
            discountPercentage: 10,
            rating: 4.5,
            stock: 10,
            brand: 'Marca Exemplo',
            category: 'Categoria Exemplo',
            thumbnail: '/images/produto-exemplo.jpg',
            images: ['/images/produto-exemplo.jpg', '/images/produto-exemplo-2.jpg'],
            tags: ['Exemplo', 'Teste'],
            availabilityStatus: 'In Stock',
            weight: 1.5,
            dimensions: { width: 10, depth: 5, height: 2 },
            minimumOrderQuantity: 1,
            returnPolicy: '30 dias',
            warrantyInformation: '1 ano',
            shippingInformation: 'Enviado em 2 dias',
            reviews: [],
            sku: 'SKU123',
            meta: {
                qrCode: '/images/qrcode.png',
                barcode: '/images/barcode.png',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        };

        const mockStore = configureStore([]);
        store = mockStore({});
        dispatchMock = jest.fn();

        store.dispatch = dispatchMock;
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <ProductCard product={sampleProduct} />
            </Provider>
        );

    it('deve renderizar o título do produto', () => {
        renderComponent();
        expect(screen.getByText('Produto Exemplo')).toBeInTheDocument();
    });

    it('deve exibir a descrição do produto', () => {
        renderComponent();
        expect(screen.getByText(/Descrição do produto exemplo./i)).toBeInTheDocument();
    });

    it('deve exibir o preço com desconto', () => {
        renderComponent();
        const discountedPrice = (sampleProduct.price * (1 - sampleProduct.discountPercentage / 100)).toFixed(2);
        expect(screen.getByText(`R$ ${discountedPrice}`)).toBeInTheDocument();
    });

    it('deve exibir o preço original quando há desconto', () => {
        renderComponent();
        expect(screen.getByText(`R$ ${sampleProduct.price.toFixed(2)}`)).toBeInTheDocument();
    });

    it('deve exibir o chip de desconto quando o desconto é maior que 0', () => {
        renderComponent();
        expect(screen.getByText(`-${sampleProduct.discountPercentage}%`)).toBeInTheDocument();
    });

    it('não deve exibir o chip de desconto quando o desconto é 0', () => {
        sampleProduct.discountPercentage = 0;
        renderComponent();
        expect(screen.queryByText(/-%/)).not.toBeInTheDocument();
    });

    it('deve exibir o status de disponibilidade', () => {
        renderComponent();
        if (sampleProduct.availabilityStatus) expect(screen.getByText(sampleProduct.availabilityStatus)).toBeInTheDocument();
    });

    it('deve exibir as tags do produto', () => {
        renderComponent();
        sampleProduct.tags?.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    it('deve exibir a avaliação do produto', () => {
        renderComponent();
        const ratingElement = screen.getByTestId('rating');
        expect(ratingElement).toBeInTheDocument();
    });

    it('deve abrir o modal de imagem ao clicar na imagem', async () => {
        renderComponent();
        const imageElement = screen.getByAltText(sampleProduct.title);
        await userEvent.click(imageElement);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('deve navegar para a próxima imagem ao clicar no botão próximo', async () => {
        renderComponent();
        const nextButton = screen.getByTestId('next-button');
        await userEvent.click(nextButton);
        const imageElement = screen.getByAltText(sampleProduct.title);
        expect(imageElement).toHaveAttribute('src', sampleProduct.images && sampleProduct.images[1]);
    });

    it('deve navegar para a imagem anterior ao clicar no botão anterior', () => {
        renderComponent();
        const nextButton = screen.getByTestId('next-button');
        userEvent.click(nextButton); // Vai para a segunda imagem
        const prevButton = screen.getByTestId('prev-button');
        userEvent.click(prevButton); // Volta para a primeira imagem
        const imageElement = screen.getByAltText(sampleProduct.title);
        expect(imageElement).toHaveAttribute('src', sampleProduct.images && sampleProduct.images[0]);
    });

    it('deve abrir o modal de detalhes ao clicar no botão Detalhes', () => {
        renderComponent();
        const detailsButton = screen.getByRole('button', { name: /detalhes/i });
        userEvent.click(detailsButton);
        waitFor(() => expect(screen.getByText('Produto Exemplo')).toBeInTheDocument());
    });

    it('deve abrir o modal de edição ao clicar no botão Editar', () => {
        renderComponent();
        const editButton = screen.getByRole('button', { name: /editar/i });
        userEvent.click(editButton);
        waitFor(() => expect(screen.getByText('Editar Produto')).toBeInTheDocument());
    });

    it('deve abrir o diálogo de confirmação de exclusão ao clicar no botão Excluir', () => {
        renderComponent();
        const deleteButton = screen.getByTestId('delete-button');
        userEvent.click(deleteButton);
        waitFor(() => expect(screen.getByText('Excluir Produto')).toBeInTheDocument());
    });

    it('deve desabilitar o botão anterior quando estiver na primeira imagem', () => {
        renderComponent();
        const prevButton = screen.getByTestId('prev-button');
        expect(prevButton).toBeDisabled();
    });

    it('deve desabilitar o botão próximo quando estiver na última imagem', () => {
        sampleProduct.images = ['/images/produto-exemplo.jpg'];
        renderComponent();
        const nextButton = screen.getByTestId('next-button');
        expect(nextButton).toBeDisabled();
    });

    it('não deve exibir a seção de tags quando o array de tags estiver vazio', () => {
        sampleProduct.tags = [];
        renderComponent();
        expect(screen.queryByRole('chip')).not.toBeInTheDocument();
    });

    it('deve exibir o rating zero quando não houver avaliações', () => {
        sampleProduct.rating = 0;
        renderComponent();
        const ratingElement = screen.getByRole('img', { name: `0 Stars` });
        expect(ratingElement).toBeInTheDocument();
    });

    it('deve renderizar corretamente sem erros quando alguns campos opcionais estão ausentes', () => {
        const { brand, ...productWithoutBrand } = sampleProduct;
        render(
            <Provider store={store}>
                <ProductCard product={productWithoutBrand as product} />
            </Provider>
        );
        expect(screen.getByText('Produto Exemplo')).toBeInTheDocument();
    });
});
