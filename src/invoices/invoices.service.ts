import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/createInvoice.dts';
import { CONSUMPTION_TAX_RATE } from '../const/app-constants';

@Injectable()
export class InvoicesService {
  createInvoiceAmount(invoice: CreateInvoiceDto): number {
    return (
      invoice.payment_amount *
      (1 + invoice.fee_rate * (1 + CONSUMPTION_TAX_RATE))
    );
  }
  createFee(invoice: CreateInvoiceDto): number {
    return invoice.payment_amount * invoice.fee_rate;
  }

  createConsumptionTax(invoice: CreateInvoiceDto): number {
    return invoice.payment_amount * invoice.fee_rate * CONSUMPTION_TAX_RATE;
  }
}
