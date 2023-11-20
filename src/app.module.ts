import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/api-smartranking'),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
