import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesController } from './invoices/invoices.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
})
export class AppModule {}
