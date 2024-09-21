import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o tu base de datos (MySQL, SQLite, etc.)
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'your_database_name',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // solo para desarrollo, elimina en producción
    }),
    UsersModule,
  ],
})
export class AppModule {}
