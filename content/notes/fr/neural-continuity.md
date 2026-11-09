---
title: Continuité neuronale
date: 2026-11-09
description: Représenter et apprendre une description continue du monde avec des moyens de calcul finis.
slug: neural-continuity
---

Un réseau de neurones peut représenter un champ dont on évalue la valeur en tout point du domaine. Un nombre fini de paramètres fournit ainsi une description continue, même si l’ordinateur effectue les calculs avec une précision finie.

La continuité neuronale associe cette représentation à une dynamique différentiable. Le champ évolue selon une règle de mise à jour dont les gradients permettent d’apprendre les paramètres à partir d’observations. On écrit

$$
f_{t+1}=\Phi_{\theta}(f_t),
$$

où $f_t$ désigne le champ au pas courant et $\theta$ les paramètres appris. Une paramétrisation finie, une évaluation continue dans l’espace et des mises à jour différentiables définissent le cadre proposé.

Ces mises à jour permettent d’apprendre l’évolution du champ au cours du temps. Leur intérêt dépend toutefois de leur comportement lorsqu’on les répète. De petites erreurs numériques peuvent s’accumuler, et une représentation lisse peut malgré tout prédire une physique erronée.

Déterminer dans quelles conditions une dynamique de champ apprise reste fidèle au système physique est l’une des raisons d’étudier la continuité neuronale.

[Code](https://github.com/akashjorss/NFTM) · [Calcul sur des champs neuronaux](/notes/physics-as-neural-turing-computation/)
