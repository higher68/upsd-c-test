export class CreateInvoiceDto {
  payment_amount: number;
  fee_rate: number;
  payment_due_date: Date;
  client_uid: string;
}
