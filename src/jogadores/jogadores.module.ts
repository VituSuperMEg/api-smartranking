import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorShcema } from './interface/jogador.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name : 'Jogador', schema : JogadorShcema}])],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
