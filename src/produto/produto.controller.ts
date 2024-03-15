import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriarProdutoDTO } from './dto/CriarProdutoDTO';
import { ProdutoEntity } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualzaProdutoDTO } from './dto/AtualizarProdutoDTO';
import { ListaUsuarioDTO } from 'src/usuario/dto/ListaUsuarioDTO';

@Controller('/produtos')
export class ProdutoContrller {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criarProduto(@Body() dadosProduto: CriarProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = uuid();
    produto.usuarioId = dadosProduto.usuarioId;
    produto.nome = dadosProduto.nome;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidadeDisponivel;
    produto.descricao = dadosProduto.descricao;
    produto.categorias = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;

    this.produtoRepository.salvar(produto);

    return {
      produto: produto,
      mensagem: 'Produto cadastrado com sucesso!',
    };
  }

  @Get()
  async listar() {
    return this.produtoRepository.listarTodos();
  }

  @Put('/:id')
  async atualizarProduto(
    @Body() dadosParaAtualizar: AtualzaProdutoDTO,
    @Param('id') id: string,
  ) {
    const produtoAtuaizado = await this.produtoRepository.atualiza(
      id,
      dadosParaAtualizar,
    );

    return {
      produto: produtoAtuaizado,
      mensagem: 'Produto atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      produto: produtoRemovido,
      mensagem: 'Produto removido com sucesso!',
    };
  }
}
