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

# tuto vidéo code concept

<a href="https://www.youtube.com/playlist?list=PLs_WqGRq69UiSaXX85NRUX4rkeiNP3K6l" target="blank">Lien Playlist</a>

## todolist

on crée une app todo

## on crée le dossier todos dans source

dans ce dossier on crée lle module avec la ligne de commande `nest g mo todos`

le controlleur puis le service associé

le controlleur se charge du trafic et redirige vers le service associé en fonction de la requête reçu

Toutes les fonctions sont exécutées dans le fichier service

on utilise différtents décorateurs selon nos besoin @Get(), @Post, @Body ...

on type les données dans le dossier interface

on type les data transfert objects (dto) dans le dossier dto en utilisant une classe pour que le typage soit tjs visible lors de la compilation vers js

on fait le update avec @Patch()

# Test le auth d'après la doc

<a href="https://docs.nestjs.com/security/authentication">Lien Authentication</a>

# test d'un noiuveau tuto 

module met a dispo ce qu'il exporte, décorer avec @Global pour le rendre global et ne plus avoir à l'import dans tous les autres modules qui l'utiliseront ,
on le déclarement uniquement dans 'import de appModule

Les pipes servenà transformer un type de données en une autre 

les validation pipe servent à definir les champs dans nos dto grace à des bibliothèques et à renvoyer des msg d'erreur apropriés
https://www.youtube.com/watch?v=VFGuuxs31NU&list=PLl3CtU4THqPZt6ay6iYT3uZaOMT_yUN-l&index=17

## avec les classes validator on peut checker et transformer les types automatiquement mais aussi mettre en place des règles de sécurité pour éviter les =actions malveillantes 

https://www.youtube.com/watch?v=FpQAs1jLQW4&list=PLl3CtU4THqPZt6ay6iYT3uZaOMT_yUN-l&index=18

## middleware 

ils s'intercalent dans la chaine http afin d'exécuter une fonction puis transmettent la main au middleware suivant ou à la suite de la châine http
On peut soit les déclarer dans appModule, soit dans main.ts, le middleware cors permet de travailler sur la sécurité et de n'accepterr que les url définies dans les options
https://www.youtube.com/watch?v=O7R1F24amSU&list=PLl3CtU4THqPZt6ay6iYT3uZaOMT_yUN-l&index=22
## les intercepteurs 
intercepte la requête dans les 2 sens (requête et réponse)
https://www.youtube.com/watch?v=pz22Ks2_OfM&list=PLl3CtU4THqPZt6ay6iYT3uZaOMT_yUN-l&index=24
