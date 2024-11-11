import { product } from "@/common/components/Products/controller";

export interface responseGetProducts {
    skip: number;
    total: number;
    limit: number;
    products: product[];
}