 export class GeneralHelper{
    static capitalize(str: string) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

 }