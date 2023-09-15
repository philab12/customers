import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env"
  }), TypeOrmModule.forRoot(dataSourceOptions), CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
