'use client';

import {
  Grid,
  Pagination,
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Fab,
} from '@mui/material';
import { z } from "zod";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ProductCard from "./components/ProductCard";
import { setTitle } from "@/lib/features/titleSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { responseGetProducts } from "@/app/Products/controller";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ProductEditForm, { ProductFormInputs } from "./components/ProductEditForm";
import { fetchProducts, filterProducts, setProducts, addProduct } from "@/lib/features/productsSlice";

const searchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(["title", "brand"]).optional(),
  searchBy: z.enum(["title", "brand"]).optional(),
});

export type SearchFormInputs = z.infer<typeof searchSchema>;

export default function Products({ response }: { response: responseGetProducts }) {
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.products);

  const { control, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: '',
      sortBy: 'title',
      searchBy: 'title',
    },
  });

  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    dispatch(setTitle("Produtos"));
    if (response) {
      dispatch(setProducts({
        error: null,
        currentPage: 1,
        loading: false,
        products: response.products,
        pages: Math.ceil(response.total / 30),
      }));
    } else {
      dispatch(fetchProducts(1));
    }
  }, [dispatch]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchProducts(value));
  };

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    dispatch(filterProducts(data));
  };

  const handleReset = () => {
    dispatch(fetchProducts(1));
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAddSubmit = (data: ProductFormInputs) => {
    dispatch(addProduct(data));
    setOpenAddModal(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ paddingX: 3, marginBottom: 4 }} mt={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <Controller
              name="searchTerm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  variant="outlined"
                  label="Buscar produtos"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Controller
              name="searchBy"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size='small' variant="outlined">
                  <InputLabel id="search-by-label">Buscar por</InputLabel>
                  <Select
                    {...field}
                    label="Buscar por"
                    labelId="search-by-label"
                  >
                    <MenuItem value="title">Título</MenuItem>
                    <MenuItem value="brand">Marca</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Controller
              name="sortBy"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined" size='small'>
                  <InputLabel id="sort-by-label">Ordenar por</InputLabel>
                  <Select
                    {...field}
                    labelId="sort-by-label"
                    label="Ordenar por"
                  >
                    <MenuItem value="title">Título</MenuItem>
                    <MenuItem value="brand">Marca</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Button
              fullWidth
              size='medium'
              color="primary"
              variant="outlined"
              onClick={handleReset}
            >
              Reiniciar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Button
              fullWidth
              size='medium'
              type="submit"
              color="primary"
              variant="contained"
            >
              Aplicar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid
        mt={0}
        container
        spacing={4}
        paddingX={3}
      >
        {productsState.loading ? (
          Array.from(new Array(9)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ProductCardSkeleton />
            </Grid>
          ))
        ) : productsState.error ? (
          <Grid item xs={12}>
            <Typography color="error" align="center">
              {productsState.error}
            </Typography>
          </Grid>
        ) : (
          productsState.products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
      <Stack spacing={2} alignItems="center" mt={4}>
        <Pagination
          color="primary"
          onChange={handlePageChange}
          count={productsState.pages}
          page={productsState.currentPage}
        />
      </Stack>
      <Fab
        color="primary"
        aria-label="Adicionar Produto"
        onClick={handleOpenAddModal}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <ProductEditForm
        open={openAddModal}
        onSubmit={handleAddSubmit}
        onClose={handleCloseAddModal}
      />
    </>
  );
}
