import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/product-management', {}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
