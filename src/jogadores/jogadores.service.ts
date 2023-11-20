import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interface/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {

  private readonly logger = new Logger(JogadoresService.name);
  
  constructor(@InjectModel('Jogador') private readonly JogadorModel : Model<Jogador>) {}


  async criarAtualizarJogador(criaJogadorDTO: CriarJogadorDTO): Promise<void> {

    const { email } = criaJogadorDTO;

    const jogadorEncontrado = await this.JogadorModel.findOne({email}).exec();

    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado);
    } else {
      this.criar(criaJogadorDTO);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.JogadorModel.find().exec();
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.JogadorModel.findOne({email}).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador ${email} not found`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
   return await this.JogadorModel.findByIdAndRemove({email}).exec()
  }
  private async criar(criaJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.JogadorModel(criaJogadorDTO);
    return await jogadorCriado.save();
  }
  private async atualizar(
    criaJogadorDTO: CriarJogadorDTO,
  ): Promise<Jogador> {
   return await this.JogadorModel.findOneAndUpdate({
       email : criaJogadorDTO.email
   }, {
    $set : criaJogadorDTO
   }).exec();
  }
}
