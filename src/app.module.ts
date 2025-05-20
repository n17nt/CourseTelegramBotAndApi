import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { CoursesModule } from './courses/courses.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { Course } from './courses/entities/course.entity';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [
    TelegramModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      database: 'graphql',
      password: 'QahramonovJ1:(',
      type: 'postgres',
      synchronize: true,
      entities: [Course, Category],
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      graphiql: true,
      autoSchemaFile: 'src/schema.gql',
    }),
    CoursesModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
