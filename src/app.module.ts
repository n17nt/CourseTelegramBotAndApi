import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { TeacherModel } from './teachers/entities/teacher.entity';
import { TeachersModule } from './teachers/teachers.module';
import { ApplicationModule } from './application/application.module';

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
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
