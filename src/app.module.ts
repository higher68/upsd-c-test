import { Module } from '@nestjs/common';
import { InvoiceService } from './invoices/invoice.service';
import { InvoiceController } from './invoices/invoice.controller';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class AppModule {}
