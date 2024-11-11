import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { product } from '@/common/components/Products/controller';
import ProductEditForm from '@/common/components/Products/components/ProductEditForm';

describe('ProductEditForm Component', () => {
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();

    const renderComponent = (productProp?: product) =>
        render(
            <ProductEditForm
                open={true}
                product={productProp}
                onClose={onCloseMock}
                onSubmit={onSubmitMock}
            />
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve validar campos obrigatórios', async () => {
        renderComponent();
        const user = userEvent.setup();

        await user.click(screen.getByTestId('add-button'));

        expect(screen.getByText(/O título é obrigatório/i)).toBeInTheDocument();
        expect(screen.getByText(/A descrição é obrigatória/i)).toBeInTheDocument();

        expect(onSubmitMock).not.toHaveBeenCalled();
    });

    it('deve chamar onSubmit com os dados corretos ao adicionar um produto', async () => {
        renderComponent();
        const user = userEvent.setup();

        await user.type(screen.getByLabelText('Título'), 'Produto com Tags');
        await user.type(screen.getByLabelText('Descrição'), 'Descrição do produto com tags');
        await user.type(screen.getByLabelText('Categoria'), 'Descrição do produto com tags');
        await user.type(screen.getByLabelText('Preço'), '100');
        await user.click(screen.getByTestId('add-button'));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledTimes(1);
        });

        expect(onSubmitMock).toHaveBeenCalledWith({
            "availabilityStatus": "In Stock",
            "brand": "",
            "category": "Descrição do produto com tags",
            "description": "Descrição do produto com tags",
            "dimensions": {
                "depth": 0,
                "height": 0,
                "width": 0,
            },
            "discountPercentage": 0,
            "minimumOrderQuantity": 1,
            "price": 100,
            "returnPolicy": "",
            "shippingInformation": "",
            "stock": 0,
            "tags": [],
            "title": "Produto com Tags",
            "warrantyInformation": "",
            "weight": 0,
        });

        expect(onCloseMock).toHaveBeenCalled();
    });


    it('deve converter as tags corretamente ao inserir texto', async () => {
        renderComponent();
        const user = userEvent.setup();

        await user.type(screen.getByLabelText('Título'), 'Produto com Tags');
        await user.type(screen.getByLabelText('Descrição'), 'Descrição do produto com tags');
        await user.type(screen.getByLabelText('Categoria'), 'Descrição do produto com tags');
        await user.type(screen.getByLabelText('Preço'), '100');

        await user.type(
            screen.getByLabelText('Tags (separadas por vírgula)'),
            'Tag1, Tag2, Tag3'
        );

        await user.click(screen.getByTestId('add-button'));

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    tags: ['Tag1', 'Tag2', 'Tag3'],
                })
            );
        });
    });
});
