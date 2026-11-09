---
title: Neural Field Computations
date: 2026-11-09
description: Learning how a physical field changes through local updates.
slug: physics-as-neural-turing-computation
---

A neural field stores a system’s state as values across space. Computation can then proceed by reading a small region, applying a learned rule, and writing the result back.

The Neural Field Turing Machine (NFTM) gives this process a computational model. Its controller reads and updates local regions through movable heads. The controller has no internal memory; the spatial field holds the state.

Local updates connect this model to physical evolution. In the heat-equation experiment, a supplied diffusion operator and learned coefficients determine how temperature changes. Each predicted field becomes the input to the next step. Other demonstrations apply the same idea to cellular automata and image completion.

Repeated updates make error accumulation a central concern. A useful rule must remain reliable as its own predictions become its inputs. Testing that reliability across new geometries and operating conditions is part of the work ahead.

Presented at Machine Learning and the Physical Sciences (ML4PS), a workshop at the 2025 Conference on Neural Information Processing Systems (NeurIPS).

[Paper](https://ml4physicalsciences.github.io/2025/files/NeurIPS_ML4PS_2025_40.pdf) · [Code](https://github.com/akashjorss/NFTM) · [Neural Continuity](/notes/neural-continuity/)
