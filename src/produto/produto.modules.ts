import { Module } from '@nestjs/common';
import { ProdutoContrller } from './produto.controller';
import { ProdutoRepository } from './produto.repository';

@Module({
  controllers: [ProdutoContrller],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
