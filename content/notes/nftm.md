---
title: Neural Field Computations
date: 2026-11-09
description: Learning how a physical field changes through local updates.
slug: physics-as-neural-turing-computation
---

In the Neural Field Turing Machine (NFTM), a controller supplies the rule and a spatial field holds the state. The controller has no internal memory. It reads a local region through movable heads, computes an update, and writes the result back.

The field can hold temperatures, the state of a cellular automaton, or an image. Repeated updates change that state over time. For a physical system, the aim is to learn updates that follow its evolution.

In the heat-equation experiment, we supplied a diffusion operator and learned its coefficients. Each predicted temperature field became the input to the next step. Other experiments tested the same read-and-write idea on cellular automata and image completion.

The heat experiment starts with a known equation. A harder test would start with measurements and ask the controller to learn how the field should change.

Presented at Machine Learning and the Physical Sciences (ML4PS), a workshop at the 2025 Conference on Neural Information Processing Systems (NeurIPS).

[Code](https://github.com/akashjorss/NFTM) · [Neural Continuity](/notes/neural-continuity/)
