import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/EmailValidator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é invalido!' })
  @EmailUnico({ message: 'Já existe um usuário com este email!' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres!' })
  senha: string;
}
