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
      // menuItems
      // reportItems
      createdAt: new Date(data.createdAt) || data.createdAt,
      updatedAt: new Date(data.updatedAt) || data.updatedAt,
    };
  }
}
