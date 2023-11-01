import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceStatus } from '@prisma/client';
import { CreateInvoiceDto } from './dto/createInvoice.dts';
import { PrismaService } from '../prisma/prisma.service';
import { CONSUMPTION_TAX_RATE } from '../const/app-constants';

@Controller()
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private prisma: PrismaService,
  ) {}

  @Post('/app/invoices')
  async postInvoice(@Body() invoice: CreateInvoiceDto) {
    // TODO 後で認証機構を追加したら実装
    const userMeta = {
      company_uid: 'xxx',
    };
    const today = new Date();
    const invoice_amount = this.invoiceService.createInvoiceAmount(invoice);
    const fee = this.invoiceService.createFee(invoice);
    const consumption_tax = this.invoiceService.createConsumptionTax(invoice);

    const result = await this.prisma.invoiceData.create({
      data: {
        issue_date: today,
        fee: fee,
        fee_rate: invoice.fee_rate,
        consumption_tax: consumption_tax,
        consumption_tax_rate: CONSUMPTION_TAX_RATE,
        invoice_amount: invoice_amount,
        payment_due_date: invoice.payment_due_date,
        status: InvoiceStatus.UNPROCESSED,
        company_uid: userMeta.company_uid,
        payment_amount: invoice.payment_amount,
        client_uid: invoice.client_uid,
      },
    });
    return result;
  }
}
