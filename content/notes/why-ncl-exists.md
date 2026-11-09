---
title: Why NCL Exists
date: 2026-11-09
description: Discovering what neural physics looks like, from the bottom up.
author: Akash Malhotra
slug: why-ncl-exists
---

NCL exists to discover what **neural physics** looks like: which representations and computations let a learned system reconstruct, evolve, and reason about the physical world.

We approach this from the bottom up. Start with a concrete system, limited observations, and a question we can test. Examine what the model learns. Change the conditions. Keep the methods that survive, and make the failures informative.

Industrial observability gives this inquiry contact with real systems. Can sparse temperature or flow measurements reveal a field between sensors? Does the learned structure carry to another geometry or operating regime? Where should the estimate be distrusted?

[KeplerBench](/notes/can-a-machine-rediscover-keplers-laws/) tests transfer beyond a good fit. [NFTM](/notes/physics-as-neural-turing-computation/) investigates computation through local field updates. Neither settles which architecture will work best.

The aim is to turn these experiments into models, benchmarks, software, and knowledge others can build upon. What structure must a neural system learn for its physics to remain useful outside the conditions we gave it?
