import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
    return usuario;
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usarioSalvo) => usarioSalvo.id == id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe!');
    }

    return possivelUsuario;
  }

  // O partial significa que vamos receber um dado parcial de uma entidade
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    // Retorna um array de array
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      // Chave poder ser: nome, email e senha. O valor é o que o usuario atualizar ou não
      if (chave === 'id') {
        return;
      }

      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    // Criar uma nova lista de usuarios, excluindo oque tem o id fornecido
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );

    return usuario;
  }
}
