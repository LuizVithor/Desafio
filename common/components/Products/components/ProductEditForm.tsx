'use client';

import { product } from "../controller";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    price: z.coerce.number().min(0, "O preço deve ser positivo"),
    discountPercentage: z.coerce.number().min(0).max(100, "Desconto deve ser entre 0 e 100"),
    stock: z.coerce.number().int().min(0, "Estoque deve ser um número inteiro positivo"),
    brand: z.string().optional(),
    category: z.string().min(1, "A categoria é obrigatória"),
    weight: z.coerce.number().min(0, "O peso deve ser positivo"),
    dimensions: z.object({
        width: z.coerce.number().min(0, "A largura deve ser positiva"),
        depth: z.coerce.number().min(0, "A profundidade deve ser positiva"),
        height: z.coerce.number().min(0, "A altura deve ser positiva"),
    }),
    availabilityStatus: z.enum(["Out of Stock", "In Stock", "Low Stock"]),
    minimumOrderQuantity: z.coerce.number().int().min(1, "Quantidade mínima deve ser ao menos 1"),
    returnPolicy: z.string().optional(),
    warrantyInformation: z.string().optional(),
    shippingInformation: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export type ProductFormInputs = z.infer<typeof productSchema>;

interface ProductEditFormProps {
    product?: product;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormInputs) => void;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({ product, open, onClose, onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>({
        resolver: zodResolver(productSchema),
        defaultValues: product ? {
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            weight: product.weight,
            dimensions: product.dimensions,
            availabilityStatus: product.availabilityStatus,
            minimumOrderQuantity: product.minimumOrderQuantity,
            returnPolicy: product.returnPolicy,
            warrantyInformation: product.warrantyInformation,
            shippingInformation: product.shippingInformation,
            tags: product.tags,
        } : {
            title: '',
            description: '',
            price: 0,
            discountPercentage: 0,
            stock: 0,
            brand: '',
            category: '',
            weight: 0,
            dimensions: {
                width: 0,
                depth: 0,
                height: 0,
            },
            availabilityStatus: 'In Stock',
            minimumOrderQuantity: 1,
            returnPolicy: '',
            warrantyInformation: '',
            shippingInformation: '',
            tags: [],
        },
    });

    const handleFormSubmit: SubmitHandler<ProductFormInputs> = (data) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
            <DialogContent>
                <form id="edit-product-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Título"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.title}
                                        slotProps={{
                                            formHelperText: {
                                                id: 'title-helper-text'
                                            }
                                        }}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="brand"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Marca"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.brand}
                                        helperText={errors.brand?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Descrição"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Preço"
                                        type="number"
                                        variant="outlined"
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="discountPercentage"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Desconto (%)"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        error={!!errors.discountPercentage}
                                        helperText={errors.discountPercentage?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="stock"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Estoque"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        error={!!errors.stock}
                                        helperText={errors.stock?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Categoria"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.category}
                                        helperText={errors.category?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="availabilityStatus"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth variant="outlined" error={!!errors.availabilityStatus}>
                                        <InputLabel id="availability-status-label">Disponibilidade</InputLabel>
                                        <Select
                                            {...field}
                                            label="Disponibilidade"
                                            labelId="availability-status-label"
                                            data-testid="availability-status-select"
                                        >
                                            <MenuItem value="In Stock" data-testid={"inStock"}>In Stock</MenuItem>
                                            <MenuItem value="Low Stock">Low Stock</MenuItem>
                                            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                                        </Select>
                                        {errors.availabilityStatus && (
                                            <p style={{ color: 'red', margin: 0 }}>{errors.availabilityStatus.message}</p>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="weight"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Peso (kg)"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        error={!!errors.weight}
                                        helperText={errors.weight?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="minimumOrderQuantity"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Quantidade Mínima"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        error={!!errors.minimumOrderQuantity}
                                        helperText={errors.minimumOrderQuantity?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controller
                                name="tags"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Tags (separadas por vírgula)"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.tags}
                                        helperText={errors.tags?.message}
                                        onChange={(e) => {
                                            field.onChange(e.target.value.split(',').map(tag => tag.trim()));
                                        }}
                                        value={field.value?.join(', ') || ''}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="returnPolicy"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Política de Devolução"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        error={!!errors.returnPolicy}
                                        helperText={errors.returnPolicy?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="warrantyInformation"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Informações de Garantia"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        error={!!errors.warrantyInformation}
                                        helperText={errors.warrantyInformation?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="shippingInformation"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Informações de Envio"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        error={!!errors.shippingInformation}
                                        helperText={errors.shippingInformation?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Dimensões (cm)</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="dimensions.width"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Largura"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                error={!!errors.dimensions?.width}
                                                helperText={errors.dimensions?.width?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="dimensions.depth"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Profundidade"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                error={!!errors.dimensions?.depth}
                                                helperText={errors.dimensions?.depth?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="dimensions.height"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Altura"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                error={!!errors.dimensions?.height}
                                                helperText={errors.dimensions?.height?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancelar
                </Button>
                <Button type="submit" form="edit-product-form" variant="contained" data-testid={"add-button"}>
                    {product ? 'Salvar' : 'Adicionar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductEditForm;
