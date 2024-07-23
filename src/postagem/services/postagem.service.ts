import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  async findById(id: number): Promise<Postagem> {
    const buscaPostagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!buscaPostagem)
      throw new HttpException(
        'Postagem não foi encontrada',
        HttpStatus.NOT_FOUND,
      );

    return buscaPostagem;
  }
}
