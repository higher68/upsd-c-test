import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoiceStatus } from '@prisma/client';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CONSUMPTION_TAX_RATE } from '../const/app-constants';
import { ListInvoicesDto } from './dto/listInvoices.dto';

@Controller()
export class InvoicesController {
  constructor(
    private readonly invoiceService: InvoicesService,
    private prisma: PrismaService,
  ) {}

  @Post('/app/invoices')
  @HttpCode(200)
  async postInvoice(@Body() invoice: CreateInvoiceDto) {
    // TODO 後で認証機構を追加したら実装
    const userMeta = {
      company_uid: '0dab39b7-5dbf-4890-8b7d-39f689f19f1f',
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
  @Get('/app/invoices')
  async getInvoices(@Body() listInvoicesDto: ListInvoicesDto) {
    // TODO 後で認証機構を追加したら実装
    const userMeta = {
      company_uid: '0dab39b7-5dbf-4890-8b7d-39f689f19f1f',
    };
    const result = await this.prisma.invoiceData.findMany({
      where: {
        company_uid: userMeta.company_uid,
        payment_due_date: {
          gte: listInvoicesDto.start_date,
          lte: listInvoicesDto.end_date,
        },
      },
    });
    return result;
  }
}
