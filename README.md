# Découverte de nestjs

Le main.ts comprend une fonction asynchrone, qui va amorcer notre application

# Contrôleurs

Les contrôleurs sont responsables du traitement des demandes entrantes et du retour des réponses au client.

Le but d’un contrôleur est de recevoir des demandes spécifiques pour l’application. Le mécanisme de routage contrôle quel contrôleur reçoit quelles demandes. Fréquemment, chaque contrôleur a plus d’un itinéraire, et différents itinéraires peuvent effectuer différentes actions.

Afin de créer un contrôleur de base, nous utilisons des classes et des décorateurs. Les décorateurs associent des classes aux métadonnées requises et permettent à Nest de créer une carte de routage (lier les demandes aux contrôleurs correspondants).

```
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
@Post()
create(): string {
return 'This action adds a new cat';
}

@Get()
findAll(): string {
return 'This action returns all cats';
}
}
```

## Caractères génériques de routage

Les itinéraires basés sur des modèles sont également pris en charge. Par exemple, l’astérisque est utilisé comme caractère générique et correspond à n’importe quelle combinaison de caractères.

```

@Get('ab\*cd')
findAll() {
return 'This route uses a wildcard';
}
```

## En-têtes

Pour spécifier un en-tête de réponse personnalisé, vous pouvez utiliser un décorateur @Header() ou un objet de réponse spécifique à la bibliothèque (et appeler res.header()

```
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

## Redirection#

Pour rediriger une réponse vers une URL spécifique, vous pouvez utiliser un décorateur @Redirect() ou un objet de réponse spécifique à la bibliothèque (et appeler res.redirect()

@Redirect() prend deux arguments, url et statusCode, les deux sont facultatifs. La valeur par défaut de statusCode est 302 (Found) si elle est omise.

```

@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}

```

## Paramètres de l’itinéraire#

Les itinéraires avec des chemins statiques ne fonctionneront pas lorsque vous devez accepter des données dynamiques dans le cadre de la demande (par exemple, GET /cats/11 pour obtenir cat avec l’id 1). Afin de définir des itinéraires avec des paramètres, nous pouvons ajouter des jetons de paramètres de routage dans le chemin de l’itinéraire pour capturer la valeur dynamique à cette position dans l’URL de la demande. Le jeton de paramètre de routage dans l’exemple de décorateur @Get() ci-dessous illustre cette utilisation. Les paramètres de routage ainsi déclarés sont accessibles à l’aide du décorateur @Param() qui doit être ajouté à la signature de la méthode.

```

@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

## Approche propre à la bibliothèque#

Jusqu’à présent, nous avons discuté de la méthode standard de Nest pour manipuler les réponses. La deuxième façon de manipuler la réponse consiste à utiliser un objet de réponse spécifique à la bibliothèque. Afin d’injecter un objet de réponse particulier, nous devons utiliser le décorateur @Res() Pour montrer les différences, réécrivons le CatsController comme suit :

```

import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}

```

# Fournisseurs

Les fournisseurs sont un concept fondamental dans Nest. De nombreuses classes Nest de base peuvent être traitées comme un fournisseur : services, référentiels, usines, assistants, etc. L’idée principale d’un fournisseur est qu’il peut être injecté comme une dépendance; Cela signifie que les objets peuvent créer diverses relations les uns avec les autres, et que la fonction de « câblage » des instances d’objets peut en grande partie être déléguée au système d’exécution Nest.

Dans le chapitre précédent, nous avons construit un CatsController simple. Les contrôleurs doivent gérer les requêtes HTTP et déléguer des tâches plus complexes aux fournisseurs. Les fournisseurs sont des classes JavaScript simples qui sont déclarées en tant que providers dans un module.
