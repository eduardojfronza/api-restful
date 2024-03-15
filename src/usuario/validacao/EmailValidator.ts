import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true }) // Para transformar em assíncrona
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExiste =
      await this.usuarioRepository.existeComEmail(value);

    return !usuarioComEmailExiste;
  }
}

export const EmailUnico = (opcesDeValidacao: ValidationOptions) => {
  return (objeto: Object, props: string) => {
    // primeiro parametro é objeto que ele está sendo executa e o segundo é a propriedade onde o validetor vai agir
    registerDecorator({
      // Vamos registar o decorator que vai agir sobre o objeto e a propriedade com a função que criamos
      target: objeto.constructor, // É o construtor do objeto que estamos passando
      propertyName: props, // É a propriedade
      options: opcesDeValidacao, // São as opçoes de validações
      constraints: [], // Outras regras de validações
      validator: EmailValidator, // O validador que criamos
    });
  };
};
