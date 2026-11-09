---
title: Les machines peuvent-elles découvrir les lois de la physique ?
date: 2026-11-09
description: Les physiciens formulent des lois générales à partir de très peu d’observations. Les machines peuvent-elles en faire autant ?
slug: can-a-machine-rediscover-keplers-laws
---

À partir d’observations du mouvement des planètes, Kepler a proposé des lois qui s’appliquaient au-delà des trajectoires mesurées. KeplerBench demande si une machine peut en faire autant, sans recevoir les équations au départ.

Le benchmark utilise des observations astronomiques historiques et des systèmes planétaires synthétiques dont les lois physiques sont modifiées. Il évalue séparément la prédiction de nouvelles observations, la découverte de lois transférables entre systèmes et l’apprentissage de règles locales réutilisables.

Une expérience préliminaire sur des observations historiques de Mars montre les limites d’un bon ajustement aux données. Un modèle par processus gaussien obtient une erreur médiane de 0,72 minute d’arc à l’entraînement, contre environ 1174 sur les observations réservées au test. Un modèle fondé sur une ellipse képlérienne obtient respectivement 2,66 et 13,31 minutes d’arc.

La structure physique du modèle elliptique était fournie. Le résultat montre l’intérêt de cette structure, mais laisse ouverte la question de sa découverte. Le test suivant consiste à trouver une loi, puis à l’utiliser sur un système planétaire que le modèle n’a jamais rencontré.

Accepté à l’atelier Machine Learning with Imperfect Scientific Models (Sim2Science) de la Conference on Neural Information Processing Systems (NeurIPS) 2026.

[Code](https://github.com/Neural-Continuity-Labs/keplerbench)
