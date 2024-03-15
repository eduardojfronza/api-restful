import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];
  private numeroDeCaracteres = 10;

  async salvar(usuario: UsuarioEntity) {
    const senha = usuario.senha;
    const hash = await bcrypt.hash(senha, this.numeroDeCaracteres);

    usuario.senha = hash;
    this.usuarios.push(usuario);
    return usuario;
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email
    );

    return possivelUsuario !== undefined;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usarioSalvo) => usarioSalvo.id == id
    );

    if (!possivelUsuario) {
      throw new Error("Usuário não existe!");
    }

    return possivelUsuario;
  }

  // O partial significa que vamos receber um dado parcial de uma entidade
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    for (const [chave, valor] of Object.entries(dadosDeAtualizacao)) {
      if (chave === "id") {
        continue;
      } else if (chave === "senha") {
        const novaSenha = valor;
        const hashNovaSenha = await bcrypt.hash(
          novaSenha,
          this.numeroDeCaracteres
        );
        usuario[chave] = hashNovaSenha;
      } else {
        usuario[chave] = valor;
      }
    }

    return usuario;

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    // Criar uma nova lista de usuarios, excluindo oque tem o id fornecido
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id
    );

    return usuario;
  }
}
