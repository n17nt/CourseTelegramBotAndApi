import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TeacherModel } from './teachers/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'courses_db',
      host: 'localhost',
      type: 'postgres',
      password: '1234',
      username: 'postgres',
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
      entities: [TeacherModel],
    }),
    TelegramModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      graphiql: true,
      autoSchemaFile: './src/schema.gql',
    }),
    TelegramModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
