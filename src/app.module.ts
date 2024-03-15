import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.modules';
import { ProdutoModule } from './produto/produto.modules';

@Module({
  imports: [UsuarioModule, ProdutoModule],
})
export class AppModule {}
