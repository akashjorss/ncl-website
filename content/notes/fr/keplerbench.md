---
title: Les machines peuvent-elles découvrir les lois de la physique ?
date: 2026-11-09
description: Les physiciens formulent des lois générales à partir de très peu d’observations. Les machines peuvent-elles en faire autant ?
slug: can-a-machine-rediscover-keplers-laws
---

Les physiciens parviennent à formuler des lois générales à partir d’observations rares et bruitées. Les lois de Kepler en offrent un exemple ancien. Des mesures de positions planétaires, effectuées depuis une Terre elle-même en mouvement, ont permis de décrire bien davantage que les seules trajectoires observées.

Le mouvement planétaire constitue donc un premier terrain d’essai pour la découverte automatique de lois. KeplerBench demande à un système d’apprentissage de retrouver des lois générales à partir de mesures liées à un observateur, sans lui fournir les coordonnées ni les équations qui simplifient le problème. Les systèmes actuels n’ont pas encore réussi cette épreuve.

L’expérience préliminaire montre les limites d’un simple ajustement aux données. Un modèle par processus gaussien atteint une erreur médiane de 0,72 minute d’arc sur les observations d’entraînement, contre environ 1174 sur les observations réservées au test. Un modèle elliptique obtient respectivement 2,66 et 13,31 minutes d’arc. Sa structure physique lui était toutefois fournie au départ. Il n’a pas découvert les lois.

Retrouver cette structure, puis la transférer à des systèmes planétaires inconnus, reste le défi posé par le benchmark.

Accepté à Machine Learning with Imperfect Scientific Models (Sim2Science), un atelier de la Conference on Neural Information Processing Systems (NeurIPS) 2026.

[Code](https://github.com/Neural-Continuity-Labs/keplerbench)
