---
title: Neural Continuity
date: 2026-11-09
description: A continuous description of the world, represented and learned on finite hardware.
slug: neural-continuity
---

A neural network can represent a field that can be queried at any coordinate in its domain. A finite set of parameters gives that field a continuous description, even though the computer evaluates it with finite precision.

Neural continuity brings this representation together with differentiable dynamics. The field evolves through an update rule whose gradients allow its parameters to be learned from observations. In symbols,

$$
f_{t+1}=\Phi_{\theta}(f_t),
$$

where $f_t$ is the field at the current step and $\theta$ contains the learned parameters. Finite parameterization, continuous evaluation, and differentiable updates define the proposed framework.

Differentiable updates let us train the behavior of a field over time. Their usefulness depends on what happens when those updates are repeated. Small numerical errors may accumulate, and a smooth representation can still predict the wrong physics.

Understanding when learned field dynamics remain accurate is one reason to study neural continuity.

[Paper](https://ml4physicalsciences.github.io/2025/files/NeurIPS_ML4PS_2025_40.pdf) · [Neural Field Computations](/notes/physics-as-neural-turing-computation/)
