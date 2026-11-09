---
title: Neural Continuity Labs
date: 2026-11-09
description: Discovering what neural physics looks like, from the bottom up.
slug: why-ncl-exists
---

A model can reproduce its training measurements and still fail when the physical system changes. Neural Continuity Labs (NCL) investigates what neural networks must learn to remain useful under those changes.

Industrial systems give us a concrete place to start. A few sensors measure temperature or flow, leaving most of the physical state unobserved. We investigate how to reconstruct the fields between those sensors.

We can test a reconstruction by moving sensors, changing the geometry, or trying another operating regime. These tests help us judge which representations and learning rules carry over to new conditions.

This is what we mean by working from the bottom up. We use physical problems to choose the experiments, and experiments to choose the models. The useful results should become methods, software, and benchmarks that others can test and build on.
