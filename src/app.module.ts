//dependencias de terceros
import { Module, HttpModule, HttpService } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
//mis dependencias
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';
@Module({
  imports: [
    HttpModule, 
    UsersModule, 
    ProductsModule, 
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME:Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
    })

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
        .get('https://jsonplaceholder.typicode.com/todos')
        .toPromise();
        return tasks.data;
      },
      inject: [HttpService]
    }
  ],
})
export class AppModule {}
