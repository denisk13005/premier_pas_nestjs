# Découverte de nestjs

Le main.ts comprend une fonction asynchrone, qui va amorcer notre application

## Contrôleurs

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
