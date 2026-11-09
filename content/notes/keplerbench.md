---
title: Can machines discover the laws of physics?
date: 2026-11-09
description: Physicists propose general laws from remarkably few observations. Can machines do the same?
slug: can-a-machine-rediscover-keplers-laws
---

Human physicists have inferred general laws from sparse, noisy observations. Kepler’s laws are an early example. Measurements of planetary positions, taken from a moving Earth, led to a description that applied beyond the observed trajectories.

Planetary motion is therefore a useful first test for machine discovery. KeplerBench asks a learner to recover general laws from observer-based measurements without supplying the coordinates or equations that make the problem simple. Current systems have yet to pass this discovery test.

The pilot shows why fitting is insufficient. A Gaussian-process curve fit reached a median training error of 0.72 arcminutes but about 1174 on held-out observations. An ellipse reached 2.66 and 13.31 respectively, with its physical structure supplied in advance. It did not discover the laws.

Discovering that structure, then transferring it to unfamiliar planetary systems, is the challenge the benchmark sets.

Accepted at Machine Learning with Imperfect Scientific Models (Sim2Science), a workshop at the 2026 Conference on Neural Information Processing Systems (NeurIPS).

[Code](https://github.com/Neural-Continuity-Labs/keplerbench)
