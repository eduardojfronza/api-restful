<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

 Essa api foi construida com base no curso de Nest.js da Alura, onde coloquei em prática os conhecimentos adquiridos durante o curso. No arquivo <a target="_blank" href="https://github.com/eduardojfronza/api-restful/blob/main/passo-a-passo.md">passo-a-passo</a> tem o passo a passo, que eu mesmo criei, de como você pode implementar essa API.

## Instalação

```bash
$ git clone https://github.com/eduardojfronza/api-restful.git
```

## Entrando no repositório

```bash
$ cd https://github.com/eduardojfronza/api-restful.git
```

## Instalando as dependências
```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## POST
As ações de `/usuarios` permitem o envio dos seguintes parâmetros:

| Parâmetro | Descrição |
|---|---|
| `nome` | Nome do usuário |
| `email` | Email do usuário |
| `senha` | Senha do usuário |

### Exemplo de uma rota post

```JSON
{
	"nome": "Eduardo",
	"email": "edujfronza@gmail.com",
	"senha": "123456"
}
```

As ações de `/produtos` permitem o envio dos seguintes parâmetros:

| Parâmetro | Descrição |
|---|---|
| `usuarioId` | Id do usuário que criou o produto |
| `nome` | Nome do produto |
| `valor` | Preço do produto |
| `quantidadeDisponivel` | Quantidade disponivel do produto |
| `descricao` | Descrição do produto |
| `caracteristicas` | Lista de caracteristicas do produto |
| `nome` | Nome da caracteristica |
| `descricao`  | Descricao da caracteristica |
| `imagens` | Lista para informações da imagem |
| `url` | Link da imagem |
| `descricao` | Descrição da imagem |
| `categoria` | Categoria do produto |

### Exemplo de uma rota post

```JSON
{
  "usuarioId": "439374b5-e430-4ac3-bc4e-ba386abb74f9", 
	"nome": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
    "valor": 70.0,
    "quantidadeDisponivel": 10,
    "descricao": "Produto novo, bem acabado, alegria para colecionadores",
    "caracteristicas": [{
        "nome": "Fabricante",
        "descricao": "Iron Studios"
    },
		{
        "nome": "material",
        "descricao": "Plástico"
    },
		{
        "nome": "Localização",
        "descricao": "Rua Padre Alberto Braun, Cristo Rei - São Leopoldo"
    }],
    "imagens": [{
        "url": "https://i.imgur.com/dwDZICq.jpg",
        "descricao": "Imagem do Homem Aranha"
    }],
    "categoria": "Colecionáveis"
}
```



## GET
As ações de `/usuarios` retorna os seguintes dados:

```JSON
{
	"usuario": {
		"id": "439374b5-e430-4ac3-bc4e-ba386abb74f9",
		"nome": "Eduardo"
	},
	"mensagem": "Usuário criado com sucesso!"
}
```

As ações de `/produtos`  retorna os seguintes dados:

```JSON
[
	{
		"id": "59507de6-9cfc-4ac0-be8f-5d6ba2eb3180",
		"usuarioId": "6853cec3-84f6-49e1-b92b-d9cb1a3afd6c",
		"nome": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
		"valor": 70,
		"quantidade": 10,
		"descricao": "Produto novo, bem acabado, alegria para colecionadores",
		"categorias": "Colecionáveis",
		"caracteristicas": [
			{
				"nome": "Fabricante",
				"descricao": "Iron Studios"
			},
			{
				"nome": "material",
				"descricao": "Plástico"
			},
			{
				"nome": "Localização",
				"descricao": "Rua Padre Alberto Braun, Cristo Rei - São Leopoldo"
			}
		],
		"imagens": [
			{
				"url": "https://i.imgur.com/dwDZICq.jpg",
				"descricao": "Imagem do Homem Aranha"
			}
		]
	}
]
```


## PUT
As ações de `/usuarios/:id` permitem a atualização dos seguintes parâmetros:

| Parâmetro | Descrição |
|---|---|
| `nome` | Nome do usuário |
| `email` | Email do usuário |
| `senha` | Senha do usuário |

### Exemplo de uma rota PUT
```JSON
{
	"nome": "Eduardo",
	"email": "edujfronza@gmail.com",
	"senha": "123456"
}
```

As ações de `/produtos/:id` permitem a atualização dos seguintes parâmetros:

| Parâmetro | Descrição |
|---|---|
| `nome` | Nome do produto |
| `valor` | Preço do produto |
| `quantidadeDisponivel` | Quantidade disponivel do produto |
| `descricao` | Descrição do produto |
| `caracteristicas` | Lista de caracteristicas do produto |
| `nome` | Nome da caracteristica |
| `descricao`  | Descricao da caracteristica |
| `imagens` | Lista para informações da imagem |
| `url` | Link da imagem |
| `descricao` | Descrição da imagem |
| `categoria` | Categoria do produto |

### Exemplo de uma rota PUT
```JSON
{
	"id": "e480c50f-3554-467e-837d-a0e0343f4e73",
	"usuarioId": "c6958965-80a5-45f7-83d6-96880cc4bb89", 
	"nome": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
    "valor": 70.0,
    "quantidadeDisponivel": 10,
    "descricao": "Produto novo, bem acabado, alegria para colecionadores",
    "caracteristicas": [{
        "nome": "Fabricante",
        "descricao": "Iron Studios"
    },
		{
        "nome": "material",
        "descricao": "Plástico"
    },
		{
        "nome": "Localização",
        "descricao": "Rua Porto da Fonseca, Cristo Rei - São Leopoldo"
    }],
    "imagens": [{
        "url": "https://i.imgur.com/dwDZICq.jpg",
        "descricao": "Imagem do Homem Aranha"
    }],
    "categoria": "Colecionáveis"
}
```


## DELETE
As ações de `/usuarios/:id` permitem deletar o usuário do sistema:

### Exemplo de resposta de uma rota DELETE

```JSON
{
	{
	"usuario": {
		"email": "edujfronza@gmail.com",
		"senha": "123456",
		"nome": "Eduardo",
		"id": "630e081c-d815-4506-916d-c568b386a41f"
	},
	"mensagem": "Usuário removido com sucesso!"
}
}
```
As ações de `/produtos/:id` permitem deletar o produtos do sistema:
### Exemplo de resposta de uma rota DELETE

```JSON
{
	"produto": {
		"id": "59507de6-9cfc-4ac0-be8f-5d6ba2eb3180",
		"usuarioId": "6853cec3-84f6-49e1-b92b-d9cb1a3afd6c",
		"nome": "Figura de ação Marvel Homem Aranha Olympus Homem Aranha E6358 de Hasbro Classic",
		"valor": 70,
		"quantidade": 10,
		"descricao": "Produto novo, bem acabado, alegria para colecionadores",
		"categorias": "Colecionáveis",
		"caracteristicas": [
			{
				"nome": "Fabricante",
				"descricao": "Iron Studios"
			},
			{
				"nome": "material",
				"descricao": "Plástico"
			},
			{
				"nome": "Localização",
				"descricao": "Rua Padre Alberto Braun, Cristo Rei - São Leopoldo"
			}
		],
		"imagens": [
			{
				"url": "https://i.imgur.com/dwDZICq.jpg",
				"descricao": "Imagem do Homem Aranha"
			}
		]
	},
	"mensagem": "Produto removido com sucesso!"
}
```
