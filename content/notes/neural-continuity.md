---
title: Neural Continuity
date: 2026-11-09
description: A continuous description of the world, represented and learned on finite hardware.
slug: neural-continuity
---

A temperature field assigns a value to every point in a region of space. A computer needs a finite way to represent those values.

A neural network provides one such representation. It takes a coordinate and returns a field value, using a finite set of parameters. The field can then be evaluated between the locations used for training.

Neural continuity combines this spatial representation with a differentiable rule for changing the field over time,

$$
f_{t+1}=\Phi_{\theta}(f_t).
$$

Here $f_t$ is the current field and $\theta$ contains the learned parameters. The field is continuous in space, while the rule advances it in discrete steps. The computer still evaluates both with finite precision.

Because the update rule is differentiable, we can train its parameters from observations. That lets us learn how the field changes as well as how to represent it.

Being able to evaluate a field anywhere does not mean it is correct everywhere. We still have to test what it predicts away from the measurements.

[Code](https://github.com/akashjorss/NFTM) · [Neural Field Computations](/notes/physics-as-neural-turing-computation/)
