import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
    return produto;
  }

  async listarTodos() {
    return this.produtos;
  }

  async buscaPorId(id: string) {
    const possivelProduto = this.produtos.find(
      (produtoSalvo) => produtoSalvo.id == id,
    );

    if (!possivelProduto) {
      throw new Error('Produto não existe!');
    }

    return possivelProduto;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
    const dadosNaoAtulizaveis = ['id', 'usuarioId'];
    const produto = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (dadosNaoAtulizaveis.includes(chave)) {
        return;
      }

      produto[chave] = valor;

      return produto;
    });
  }

  async remove(id: string) {
    const produto = this.buscaPorId(id);
    this.produtos = this.produtos.filter(
      (produtoSalvo) => produtoSalvo.id !== id,
    );

    return produto;
  }
}
