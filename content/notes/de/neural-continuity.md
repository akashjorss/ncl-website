---
title: Neuronale Kontinuität
date: 2026-11-09
description: Kontinuierliche Beschreibungen der Welt mit endlichen Rechenmitteln darstellen und lernen.
slug: neural-continuity
---

Ein Temperaturfeld ordnet jedem Punkt in einem Raumbereich einen Wert zu. Ein Rechner braucht eine endliche Beschreibung, um diese Werte darzustellen.

Ein neuronales Netz kann eine solche Beschreibung liefern. Es nimmt eine Koordinate entgegen und gibt einen Feldwert aus. Dafür verwendet es eine endliche Zahl von Parametern. So lässt sich das Feld auch zwischen den Trainingspunkten auswerten.

Neuronale Kontinuität verbindet diese räumliche Darstellung mit einer differenzierbaren Regel für die zeitliche Entwicklung des Feldes,

$$
f_{t+1}=\Phi_{\theta}(f_t).
$$

Dabei bezeichnet $f_t$ das aktuelle Feld und $\theta$ die gelernten Parameter. Das Feld ist räumlich kontinuierlich, während die Regel es in diskreten Schritten weiterentwickelt. Der Rechner wertet beides mit endlicher Genauigkeit aus.

Da die Regel differenzierbar ist, können wir ihre Parameter aus Beobachtungen lernen. Damit lernen wir neben der Darstellung auch, wie sich das Feld verändert.

Dass sich ein Feld überall auswerten lässt, bedeutet noch nicht, dass es überall stimmt. Seine Vorhersagen müssen wir auch abseits der Messpunkte prüfen.

[Code](https://github.com/akashjorss/NFTM) · [Rechnen mit neuronalen Feldern](/notes/physics-as-neural-turing-computation/)
