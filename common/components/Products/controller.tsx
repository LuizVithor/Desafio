export interface product {
    id: number;
    meta?: Meta;
    sku?: string;
    title: string;
    stock: number;
    price: number;
    rating: number;
    tags?: string[];
    brand?: string;
    weight: number;
    category: string;
    images?: string[];
    reviews?: Review[];
    thumbnail?: string;
    description: string;
    returnPolicy?: string;
    dimensions: Dimensions;
    discountPercentage: number;
    warrantyInformation?: string;
    shippingInformation?: string;
    minimumOrderQuantity: number;
    availabilityStatus: "Out of Stock" | "In Stock" | "Low Stock" | undefined;
}

interface Meta {
    qrCode: string;
    barcode: string;
    createdAt: string;
    updatedAt: string;
}

interface Review {
    date: string;
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
}

interface Dimensions {
    width: number;
    depth: number;
    height: number;
}