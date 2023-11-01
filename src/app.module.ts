import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesController } from './invoices/invoices.controller';

@Module({
  imports: [],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class AppModule {}
