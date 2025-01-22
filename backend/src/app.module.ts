import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.local.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      migrations: [`${__dirname}/migrations/*.{ts,js}`],
      migrationsRun: true,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
