## Criando o projeto

```yaml
npx @nestjs/cli new loja
```

para fazer com que sempre que alterarmos algo mostre em tempo real rodamos em ambiente de desenvolvimento:

```jsx
npm run start:dev
```

## Configurações do projeto

para começar vamos excluir alguns arquivos, são eles:

- app.controller.ts
- app.service.ts

e no **app.module.ts** vamos tirar suas importações

## Criando usuario

agora  para organizar, criamos uma pasta chamada **usuario**. O primeiro controller que vamos criar é o de usuario, assim criamos um **usuario.controller.ts**

```jsx
import { Body, Controller, Post } from "@nestjs/common";

@Controller("/usuarios")
export class UsuarioController {
  @Post()
  async criarUsuario(@Body() dadosUsuario) {
    return "Usuario criado com sucesso!";
  }
}
```

agora precisamos colocar esse **controller** no **app.module.ts:**

```jsx
import { Module } from "@nestjs/common";
import { UsuarioController } from "./controllers/usuario.controller";

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
```

agora se formos testar na rota: http://localhost:3000/usuarios, vai retornar o que escrevemos:

```jsx
 Usuario criado com sucesso!
```

## Salvando dados do usuario

para salvar as informações do usuário precisamos criar dentro pasta **usuario** um arquivo **usuario.repository.ts**

```jsx
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario) {
    this.usuarios.push(usuario);
  }

   async listar() {
    return this.usuarios;
  }
}

```

nesse caso, por enquanto, não vamos usar um banco. Para resolver isso vamos salvar na memoria mesmo, em um array.

no controller vamos implementar isso. Alem disso, criamos junto uma rota para listar os usuários

```jsx
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from 'src/repositories/usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Post()
  async criarUsuario(@Body() dadosUsuario) {
    this.usuarioRepository.salvar(dadosUsuario);
    return dadosUsuario;
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }
}

```

## Criando modulos

agora vamos criar o modulo do usuários, para ficar mais organizado. Para isso criamos um arquivo **usuario.module.ts:** dentro da pasta **usuarios**:

```jsx
import { Module } from "@nestjs/common";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioRepository } from "../repositories/usuario.repository";
@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository],
})
export class UsuarioModule {}
```

agora, para continuar funcionando passamos esse modulo no **app.module.ts**

```jsx
import { Module } from "@nestjs/common";
import { UsuarioModule } from "./modules/usuario.modules";

@Module({
  imports: [UsuarioModule],
})
export class AppModule {}
```

## Injeção de dependencias

para não ficar instanciando objetos na mão podemos fazer o seguinte, no **controller**:

```jsx
  // Substituimos esse
  private usuarioRepository = = new UsuarioRepository();

  // Por esse
  constructor(private usuarioRepository: UsuarioRepository) {}
```

dessa forma o proprio nest gerencia.

agora no **usuario.repository.ts** colocamos o seguinte codigo, antes da exportação:

```jsx
import { Injectable } from '@nestjs/common';

@Injectable()
```

## Criando validações

agora precisamos criar um arquivo que defina quais dados vamos receber em nossa API. Para isso vamos criar uma pasta chamada **dto** dentro de usuarios e um arquivo **CriaUsuarioDTO.ts**.
</br></br> <a href="https://fullcycle.com.br/o-que-e-dto/">O que é DTO?</a>

```jsx
export class CriaUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
}

```

agora podemos tipar os dados do usuário em nosso controller, fazendo com que só recebea os dados que estão no DTO:

```jsx
  @Post()
  async criarUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    this.usuarioRepository.salvar(dadosUsuario);
    return dadosUsuario;
  }
```

agora, vamos instalar as seguintes dependencias, para fazermos as validações:

```jsx
npm install class-validator class-transformer
```

agora podemos fazer validações direto do DTO, da seguinte forma:

```jsx
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é invalido!' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres!' })
  senha: string;
}

```

para tudo isso funcionar precisamos ir no **main.ts** e habilitar o pipe:

```jsx
app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
```

- **transform**: transforma o JSON em nosso DTO
- **whiteList**: ignora todas as propriedades do JSON que não está no DTO
- **forbidNonWhitelisted**: informa um erro caso o usuário tente enviar algo que não está no DTO

## Validando e-mail unico

para verificarmos se o email é unico vamos criar um validador. Para isso criamos uma pasta dentro de **usuarios** chamada **validacao**  e um arquivo **EmailValidator.ts:**

```jsx
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
@ValidatorConstraint({ async: true })
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

```

no **UsuariorRepository** precisamos adicionar uma função, para verificar se o email existe:

```jsx
  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      usuario => usuario.email === email
    );

    return possivelUsuario !== undefined
  }
```

agora no nosso DTO podemos usar o nosso validador:

```jsx
  @IsEmail(undefined, { message: 'O e-mail informado é invalido!' })
  @EmailUnico({ message: 'Já existe um usuário com este email!' })
  email: string;

```

antes de funcionar precisamos fazer com que o **class-validator** consiga resolver as dependencias ou classes do mesmo jeito que o Nest.js

para isso vamos no **main** e adicionamos essa linha:

```jsx
useContainer(app.select(AppModule), { fallbackOnErrors: true });
```

\*\* ADICIONAR AOS MODULOS DO USUARIO

## Criando a entidade do usuário

para criamos uma entidade vamos criar um arquivo **usuario.entity.ts**

```jsx
export class UsuarioEntity {
  id: string;
  name: string;
  email: string;
  senha: string;
}

```

agora podemos tipar a array de usuarios no **repository**

```jsx
  private usuarios: UsuarioEntity[] = [];
```

vamos alterar nosso controle tambem:

```jsx
import { v4 as uuid } from "uuid";

const usuarioEntity = new UsuarioEntity();
usuarioEntity.email = dadosUsuario.email;
usuarioEntity.senha = dadosUsuario.senha;
usuarioEntity.nome = dadosUsuario.nome;
usuarioEntity.id = uuid();

this.usuarioRepository.salvar(usuarioEntity);
return { id: usuarioEntity.id, message: "Usuário criado com sucesso!" };
```

```jsx
npm install uuid
```

agora se enviarmos um usuario, so retornará o id do usario criado.

porem, no GET que lista os usuarios ainda vai retornar todas as informações. Para resolver isso, vamos criar um novo DTO, o **LisaUsuarioDTO.ts**

```jsx
export class ListaUsuarioDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
  ) {}
}

```

agora no controller, vamos fazer algumas alterações

```jsx
@Post()
  async criarUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.id = uuid();


    this.usuarioRepository.salvar(usuarioEntity);
    return {
    	// Podemos alterar aqui tambem, para mostrar somente o id e nome
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();

    const usuarioLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuarioLista;
  }
```

## Atualizando usuário

para atualizar o usuario precisamos criar um rota PUT no controller:

```jsx
@Put('/:id')
  async atualizaUsuario(
    @Body() dadosParaAtualizar: AtualizaUsuarioDTO,
    @Param('id') id: string,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      dadosParaAtualizar,
    );

    return {
      usario: usuarioAtualizado,
      messagem: 'Usuário atualizado com sucesso!',
    };
  }
```

e a função **atualizar** no repository:

```jsx
  // O partial significa que vamos receber um dado parcial de uma entidade
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const possivelUsuario = this.usuarios.find(
      (usarioSalvo) => usarioSalvo.id == id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe!');
    }

    // Retorna um array de array
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      // Chave poder ser: nome, email e senha. O valor é o que o usuario atualizar ou não
      if (chave === 'id') {
        return;
      }

      possivelUsuario[chave] = valor;
    });

    return possivelUsuario;
  }
```

## Removendo usuário

para remover o usuario precisamos criar um **repository** para executarmos essa ação:

```jsx
async remove(id: string) {
    const usuario = this.buscaPorId(id);

    // Criar uma nova lista de usuarios, excluindo oque tem o id fornecido
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );

    return usuario;
  }
```

apos isso vamos no controller para usarmos esse repository e criarmos a rota:

```jsx
 @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usarioRemovido,
      mensagem: 'Usuário removido com sucesso!',
    };
  }
```
