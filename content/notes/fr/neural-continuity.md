---
title: Continuité neuronale
date: 2026-11-09
description: Représenter et apprendre une description continue du monde avec des moyens de calcul finis.
slug: neural-continuity
---

Un champ de température associe une valeur à chaque point d’une région de l’espace. Pour représenter ces valeurs, un ordinateur doit disposer d’une description finie.

Un réseau de neurones peut fournir cette description. À partir de coordonnées, il renvoie la valeur du champ en utilisant un nombre fini de paramètres. On peut alors évaluer le champ entre les points utilisés pour l’entraînement.

La continuité neuronale associe cette représentation spatiale à une règle différentiable qui fait évoluer le champ au cours du temps,

$$
f_{t+1}=\Phi_{\theta}(f_t).
$$

Ici, $f_t$ désigne le champ courant et $\theta$ contient les paramètres appris. Le champ est continu dans l’espace, tandis que la règle le fait avancer par pas discrets. L’ordinateur évalue l’un et l’autre avec une précision finie.

La règle étant différentiable, nous pouvons apprendre ses paramètres à partir d’observations. Nous apprenons ainsi l’évolution du champ en même temps que sa représentation.

Pouvoir évaluer un champ en tout point ne garantit pas qu’il soit juste partout. Il reste à vérifier ses prédictions loin des points de mesure.

[Code](https://github.com/akashjorss/NFTM) · [Calcul sur des champs neuronaux](/notes/physics-as-neural-turing-computation/)
