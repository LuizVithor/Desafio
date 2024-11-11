import { instance } from "../axios";
import { SearchFormInputs } from "@/common/components/Products";
import { responseGetProducts } from "@/app/Products/controller";
import { product } from "@/common/components/Products/controller";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductFormInputs } from "@/common/components/Products/components/ProductEditForm";

interface ProductsState {
  pages: number;
  loading: boolean;
  currentPage: number;
  products: product[];
  error: string | null;
  loadingUpdate?: boolean;
}

const initialState: ProductsState = {
  pages: 0,
  error: null,
  products: [],
  currentPage: 1,
  loading: false,
  loadingUpdate: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page: number) => {

    const response = await instance.get<responseGetProducts>('/products', {
      params: {
        skip: (page - 1) * 30,
      }
    })

    return {
      currentPage: page,
      products: response.data.products,
      pages: Math.ceil(response.data.total / 30),
    };
  }
);

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (form: SearchFormInputs) => {

    const response = await instance.get<responseGetProducts>('/products', {
      params: {
        limit: 0
      }
    })

    const responseF = response
      .data
      .products
      .filter((product) => {
        return product[form.searchBy!]?.toLowerCase()?.includes(form?.searchTerm?.toLowerCase() || '');
      })
      .sort((a, b) => {
        if (form.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else {
          return a.brand?.localeCompare(b.brand || "") || 0;
        }
      });

    return {
      pages: 1,
      currentPage: 1,
      products: responseF
    };
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (form: { id: number } & ProductFormInputs) => {

    const formF: Partial<{ id: number } & ProductFormInputs> = { ...form }
    if (formF.id) {
      delete formF.id
    }

    await instance.put<product>(`products/${form.id}`, formF);

    return form;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {

    await instance.delete(`products/${id}`);

    return id;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (form: ProductFormInputs) => {

    await instance.post(`products/add`, form);

    return form;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsState>) => {
      state.pages = action.payload.pages;
      state.products = action.payload.products;
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar produtos.';
      })
      .addCase(filterProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao filtrar produtos.';
      })
      .addCase(updateProduct.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, ...action.payload };
          }
          return product;
        });
        state.loadingUpdate = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.error.message || 'Erro ao atualizar produto.';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar produto.';
      })
      .addCase(addProduct.pending, (state) => {
        state.loadingUpdate = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push({
          ...action.payload,
          rating: 0,
          id: (state.pages * 30) + 1,
        });
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao adicionar produto.';
      });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
