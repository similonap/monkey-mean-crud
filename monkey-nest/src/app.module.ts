import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonkeysModule } from './monkeys/monkeys.module';
import { SpeciesModule } from './species/species.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/monkey-db'),
    MonkeysModule,
    SpeciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
