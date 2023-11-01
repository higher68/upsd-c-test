import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/createInvoice.dto';

describe('InvoiceController', () => {
  let invoicesController: InvoicesController;
  let today: Date;
  let postInvoiceData: CreateInvoiceDto;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [InvoicesService, PrismaService],
    }).compile();
    today = new Date();
    postInvoiceData = {
      client_uid: 'efbbb1d3-1e35-2a5e-b841-0830eabe523a',
      fee_rate: 2,
      payment_due_date: today,
      payment_amount: 1,
    };
    invoicesController = app.get<InvoicesController>(InvoicesController);
  });

  describe('post', () => {
    it('入力データに基づいて結果を返す　', () => {
      return invoicesController.postInvoice(postInvoiceData).then((data) => {
        expect(data).toBe({
          client_uid: 'efbbb1d3-1e35-2a5e-b841-0830eabe523a',
          fee_rate: 2,
          payment_due_date: today,
          payment_amount: 1,
        });
      });
    });
  });
});
