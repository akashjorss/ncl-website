---
title: Can a Machine Rediscover Kepler’s Laws?
date: 2026-11-09
description: Fitting observations is one test. Discovering a law that transfers is another.
author: Akash Malhotra
slug: can-a-machine-rediscover-keplers-laws
---

[KeplerBench](https://github.com/Neural-Continuity-Labs/keplerbench), accepted at the **NeurIPS 2026 Sim2Science workshop**, asks whether a machine can recover transferable physical structure from astronomical observations.

A pilot on Tycho Brahe’s Mars declinations exposes the gap between fitting and extrapolation:

| Model | Training residual | Held-out residual |
| --- | ---: | ---: |
| Gaussian-process curve fit | 0.72 arcmin | approximately 1174 arcmin |
| Physics-supplied Keplerian ellipse | 2.66 arcmin | 13.31 arcmin |

These are median absolute residuals. The ellipse was given its physical structure, including the modern orbit of Earth. It did not discover Kepler’s laws.

The benchmark separates prediction of held-out observations, transfer of a frozen global law to unseen systems, and repeated application of a local dynamical rule after removing the observation history. Synthetic worlds with modified force laws test beyond the familiar Solar System.

The open question: can a learned representation retain useful physical structure when the system changes?

[Paper](https://openreview.net/forum?id=RdErwlc7jJ) · [Code and pilot results](https://github.com/Neural-Continuity-Labs/keplerbench)
