import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interface/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {

  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Jogador[] = [];
  
  constructor(@InjectModel('Jogador') private readonly JogadorModel : Model<Jogador>) {}


  async criarAtualizarJogador(criaJogadorDTO: CriarJogadorDTO): Promise<void> {

    const { email } = criaJogadorDTO;

    const jogadorEncontrado = await this.JogadorModel.findOne({email}).exec();

    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criaJogadorDTO);
    } else {
      this.criar(criaJogadorDTO);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador ${email} not found`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador ${email} not found`);
    }
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }
  private async criar(criaJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.JogadorModel(criaJogadorDTO);
    return await jogadorCriado.save();
  }
  private atualizar(
    jogadorEncontrado: Jogador,
    criaJogadorDTO: CriarJogadorDTO,
  ): void {
    const { nome } = criaJogadorDTO;
    jogadorEncontrado.nome = nome;
  }
}
