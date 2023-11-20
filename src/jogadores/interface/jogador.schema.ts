import { Schema } from 'mongoose';

export const JogadorShcema = new Schema({
  telefone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
  },
  ranking: {
    type: String,
  },
  posicaoRanking: {
    type: Number,
  },
  urlFotoJogador: {
    type: String,
  },
}, { timestamps: true, collection : 'jogadores'});
