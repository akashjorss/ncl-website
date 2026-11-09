---
title: Can a Machine Rediscover Kepler’s Laws?
date: 2026-11-09
description: A good fit to the sky can hide a poor account of how planets move. KeplerBench asks what would count as discovering the structure underneath.
author: Akash Malhotra
slug: can-a-machine-rediscover-keplers-laws
---

Kepler could not watch Mars trace an ellipse around the Sun. He had records of where it appeared in the sky, observed from an Earth that was itself moving. Tycho Brahe’s measurements were precise for their time, but sparse, imperfect, and expressed in coordinates that concealed the simplicity Kepler eventually found.

The achievement was more than predicting another point in the sky. An ellipse, an equal-area rule, and a relation between orbital periods and sizes connected observations through a structure that could be used elsewhere. Can a machine make that kind of move from observations to a transferable account of the world?

That is the question behind [KeplerBench](https://github.com/Neural-Continuity-Labs/keplerbench), our benchmark for scientific discovery from astronomical observations.

## The trouble with a beautiful fit

A model can reproduce a record closely without learning much about the process that generated it. The difference becomes easier to see when we ask it to predict beyond the years it has seen.

In an initial pilot, we used historical observations of Mars’s declination, its angular position north or south of the celestial equator. The record was reduced to 354 nightly epochs: 268 before 1594 for fitting, with 86 observations from later campaigns held out. Two of the fitted models give a useful comparison.

| Model | Training residual | Held-out residual |
| --- | ---: | ---: |
| Gaussian-process curve fit | 0.72 arcmin | approximately 1174 arcmin |
| Physics-supplied Keplerian ellipse | 2.66 arcmin | 13.31 arcmin |

These are median absolute residuals. The [pilot results](https://github.com/Neural-Continuity-Labs/keplerbench/tree/main/experiments/pilot) report uncertainty intervals and the fitting procedure. The Gaussian process follows the training observations more closely, yet loses the planet in the later years. The ellipse accepts a larger training residual and retains a useful description beyond the fitting window.

The ellipse was given its physical structure, including a heliocentric orbit and the modern orbit of Earth. It did not discover Kepler’s laws. Its role is to show what supplying useful structure buys us, and how little a low training error alone tells us about discovery. Nor does this result mean that statistical learning cannot generalize; it describes these models under this particular test.

## Three different tests

KeplerBench separates capabilities that are often grouped together under scientific discovery.

**Prediction** asks whether a system can recover held-out observations of the same physical system. This is useful, but it leaves open what the system has learned.

**Global-law discovery** asks whether a shared structure can be frozen and transferred to an unseen system using a limited number of new observations. Adapting the particulars of a new orbit is allowed; relearning the shared law is not.

**Local-law discovery** asks for a state and a reusable rule for evolving it. After initialization, the observation history is removed. The same rule must then keep working under unfamiliar conditions.

The learner receives observer-centered measurements rather than hidden orbital elements or a ready-made physical state. The representation it finds may be explicit or neural. What matters is what that representation supports when the evidence changes.

## A sky we have not memorized

The Solar System is a difficult test of discovery because its answer is already in textbooks and training corpora. KeplerBench therefore also generates synthetic worlds, including systems with a hidden, modified force-law exponent. A data-blind control scrambles observations across times to check whether a score depends on evidence rather than prior knowledge.

The current release includes historical Mars observations and synthetic worlds. A historical multi-planet release is planned. The [paper](https://openreview.net/forum?id=RdErwlc7jJ), accepted at the NeurIPS 2026 Sim2Science workshop, sets out the protocol; the code makes the tests reproducible.

For NCL, this is a way to make a broad question experimentally concrete. When a neural method reconstructs an unseen physical field, what structure has it learned, and where does that structure stop transferring? We have tests to begin asking. Can a system discover a law that survives a world it has never seen?
