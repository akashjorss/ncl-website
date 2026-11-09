---
title: Can machines discover the laws of physics?
date: 2026-11-09
description: Physicists propose general laws from remarkably few observations. Can machines do the same?
slug: can-a-machine-rediscover-keplers-laws
---

Kepler used observations of planetary motion to propose laws that applied beyond the measured trajectories. KeplerBench asks whether a machine can make the same step, without being given the equations in advance.

The benchmark uses historical astronomical observations and synthetic planetary systems with modified physical laws. It tests whether a model can predict observations, find laws that transfer between systems, or learn local rules that can be reused.

A pilot on historical observations of Mars shows why a good fit is only a first step. A Gaussian-process model had a median training error of 0.72 arcminutes, but about 1174 on held-out observations. A model built around a Keplerian ellipse had errors of 2.66 and 13.31 arcminutes respectively.

The ellipse model was given its physical structure. Its result shows why that structure matters, but leaves the problem of discovering it open. The harder test is to find a law, then use it on a planetary system the model has not seen.

Accepted at Machine Learning with Imperfect Scientific Models (Sim2Science), a workshop at the 2026 Conference on Neural Information Processing Systems (NeurIPS).

[Code](https://github.com/Neural-Continuity-Labs/keplerbench)
