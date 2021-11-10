import { InvoiceDto } from '../dto/invoice.dto';

export class OrderDetails {

  constructor(
    public itemId: number,
    public projectId: number,
    public projectName: string,
    // tslint:disable-next-line: variable-name
    public item_name: string,
    public status: string,
    public url: string,
    public details: string,
    // tslint:disable-next-line: variable-name
    public item_originalPrice: number,
    // tslint:disable-next-line: variable-name
    public item_discountPrice: number,
    public users: string[] = [],
    public invoices: InvoiceDto[] = []) {}
}
