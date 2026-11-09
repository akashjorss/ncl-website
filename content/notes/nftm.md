---
title: Physics as Neural Turing Computation
date: 2026-11-09
description: NFTM treats a spatial field as memory and local updates as computation.
author: Akash Malhotra
slug: physics-as-neural-turing-computation
---

A physical field can be more than the output of a neural network. It can hold the state on which computation operates.

Our **Neural Field Turing Machine (NFTM)** paper, with Nacéra Seghouani at **NeurIPS 2025 ML4PS**, develops this view. A stateless neural controller reads a local region, writes an update, and moves its read/write heads. State lives in the spatial field; repeated local operations produce its evolution.

NFTM is a computational framework rather than a prescribed architecture. The paper instantiates it with standard components for Rule 110, the heat equation, and image inpainting. These experiments use discrete grids as practical approximations to the continuous-field formulation.

For physics, the question is whether a learned local update can remain useful through repeated composition. The heat-equation experiment supplies the Laplacian structure and learns diffusion coefficients; it does not discover an unknown physical law.

How far can this approach extend when the geometry, resolution, or dynamics change?

[Workshop paper](https://ml4physicalsciences.github.io/2025/files/NeurIPS_ML4PS_2025_40.pdf) · [Code](https://github.com/akashjorss/NFTM) · [Neural continuity](/notes/neural-continuity/)
