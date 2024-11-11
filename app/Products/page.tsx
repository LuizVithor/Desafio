import { instance } from "@/lib/axios";
import { responseGetProducts } from "./controller";
import Products from "@/common/components/Products";

const ProductsPage = async () => {

    const data = await instance.get<responseGetProducts>('/products')

    return (
        <Products response={data.data} />
    );
};

export default ProductsPage;
