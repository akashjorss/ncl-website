---
title: Calcul sur des champs neuronaux
date: 2026-11-09
description: Apprendre l’évolution d’un champ physique par des mises à jour locales.
slug: physics-as-neural-turing-computation
---

Un champ neuronal représente l’état d’un système par des valeurs réparties dans l’espace. On peut alors calculer en lisant une petite région, en appliquant une règle apprise, puis en écrivant le résultat dans le champ.

La Neural Field Turing Machine (NFTM) formalise ce mode de calcul. Son contrôleur lit et modifie des régions locales à l’aide de têtes mobiles. Il ne possède aucune mémoire interne. C’est le champ spatial qui conserve l’état du système.

Ces mises à jour locales permettent de représenter une évolution physique. Dans l’expérience sur l’équation de la chaleur, un opérateur de diffusion fourni et des coefficients appris déterminent l’évolution de la température. Chaque champ prédit sert d’entrée au pas suivant. D’autres expériences appliquent ce principe aux automates cellulaires et à la complétion d’images.

La répétition des mises à jour pose la question de l’accumulation des erreurs. Une règle utile doit rester fiable lorsqu’elle reçoit ses propres prédictions en entrée. Évaluer cette fiabilité sur de nouvelles géométries et dans de nouvelles conditions de fonctionnement fait partie du travail à venir.

Présenté à Machine Learning and the Physical Sciences (ML4PS), un atelier de la Conference on Neural Information Processing Systems (NeurIPS) 2025.

[Code](https://github.com/akashjorss/NFTM) · [Continuité neuronale](/notes/neural-continuity/)
