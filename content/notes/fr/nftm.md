---
title: Calcul sur des champs neuronaux
date: 2026-11-09
description: Apprendre l’évolution d’un champ physique par des mises à jour locales.
slug: physics-as-neural-turing-computation
---

Dans la Neural Field Turing Machine (NFTM), un contrôleur applique une règle de calcul, tandis qu’un champ spatial conserve l’état. Le contrôleur n’a pas de mémoire interne. Des têtes mobiles lui permettent de lire une région, de calculer une mise à jour, puis d’écrire le résultat dans le champ.

Ce champ peut contenir des températures, l’état d’un automate cellulaire ou une image. Les mises à jour successives font évoluer cet état. Pour un système physique, il s’agit d’apprendre des mises à jour qui suivent son évolution.

Dans l’expérience sur l’équation de la chaleur, nous avons fourni un opérateur de diffusion et appris ses coefficients. Chaque champ de température prédit servait d’entrée au pas suivant. D’autres expériences ont testé le même principe de lecture et d’écriture sur des automates cellulaires et pour la complétion d’images.

L’expérience thermique part d’une équation connue. Un test plus difficile partirait des mesures et demanderait au contrôleur d’apprendre comment le champ doit évoluer.

Présenté à l’atelier Machine Learning and the Physical Sciences (ML4PS) de la Conference on Neural Information Processing Systems (NeurIPS) 2025.

[Code](https://github.com/akashjorss/NFTM) · [Continuité neuronale](/notes/neural-continuity/)
