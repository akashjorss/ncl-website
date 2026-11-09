---
title: Neural Continuity
date: 2026-11-09
description: Finite parameters, continuous evaluation, differentiable dynamics.
author: Akash Malhotra
slug: neural-continuity
---

In the [NFTM workshop paper](https://ml4physicalsciences.github.io/2025/files/NeurIPS_ML4PS_2025_40.pdf), we use *neural continuity* to describe computation with three properties:

- **Finite parameterization:** a finite set of parameters encodes the representation and update rules.
- **Continuous evaluation:** the state is a function over a continuous spatial domain, queryable between sampled locations.
- **Differentiable dynamics:** state transitions admit gradients with respect to state and parameters.

A compact notation is

$$
f_t : \mathbb{R}^{d} \to \mathbb{R}^{m}, \qquad f_{t+1}=\Phi_{\theta}(f_t).
$$

The representation has continuous semantics while its implementation uses finite hardware and numerical precision. NFTM explores local read/write computation within this setting; the paper’s demonstrations use discretized approximations.

This is a proposed framework for asking which computations neural fields support. Continuous representation alone guarantees neither accurate physics nor efficient generalization.

Appendix B leaves the theory open: how does neural continuity behave under composition, and when can one such system efficiently simulate another?

[Physics as neural Turing computation](/notes/physics-as-neural-turing-computation/) · [Paper, Section 3 and Appendix B](https://ml4physicalsciences.github.io/2025/files/NeurIPS_ML4PS_2025_40.pdf)
