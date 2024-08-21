import { GeneralHelper } from "./general";
import { format } from 'date-fns';

export class Mapper {
  static toMenu(data: any) {
    const dateObj = new Date(data.date)
    return {
      id: data.id,
      date: dateObj || data.date,
      formattedDate: format(dateObj, 'dd-MM-yyyy') || null,
      status: GeneralHelper.capitalize(data.status),
      menuItems: data.menuItems ? data.menuItems.map((item: any) => Mapper.toMenuItem(item)) : null,
      // reportItems
      createdAt: new Date(data.createdAt) || data.createdAt,
      updatedAt: new Date(data.updatedAt) || data.updatedAt,
    };
  }

  static toMenuItem(data: any) {
    return {
      id: data.id,
      product: data.product ? Mapper.toProduct(data.product) : null,
      productId: data.productId,
      price: parseFloat(data.price),
      stock: data.stock,
      menu: data.menu ? Mapper.toMenu(data.menu) : null,
      menuId: data.menuId,
      createdAt: new Date(data.createdAt) || data.createdAt,
      updatedAt: new Date(data.updatedAt) || data.updatedAt,
    };
  }

  static toProduct(data: any) {
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      basePrice: data.basePrice,
      menuItem: data.menuItem || null,
      createdAt: new Date(data.createdAt) || data.createdAt,
      updatedAt: new Date(data.updatedAt) || data.updatedAt,
    };
  }
}
