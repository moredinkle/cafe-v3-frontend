
export interface Menu {
    id: string,
    date: Date,
    formattedDate: string,
    status: string,
    menuItems: MenuItem[],
    // reportItems
    createdAt: Date,
    updatedAt: Date,
}
export interface Product {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    menuItem?: MenuItem;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface MenuItem {
    id: string;
    product: Product;
    productId: string;
    price: number;
    stock: number;
    originalStock: number;
    sold: number;
    menu: Menu;
    menuId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface Link {
    text: string,
    value: string,
    selected?: boolean
}


export type MenuStatus = "ACTIVO" | "INACTIVO" | "TERMINADO";
export type OrderType = "VENTA" | "SERVIDOR";
export type ExtraType = "GASTO" | "INGRESO" | "INFORMACION";
export type ProductCategory = "DULCE" | "SALADO" | "BEBIDA";
export type Option = string | number | object | null;

export enum ProductCategories {
  ducle = "DULCE",
  salado = "SALADO",
  bebida = "BEBIDA"
}