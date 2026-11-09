---
title: Neuronale Kontinuität
date: 2026-11-09
description: Kontinuierliche Beschreibungen der Welt mit endlichen Rechenmitteln darstellen und lernen.
slug: neural-continuity
---

Ein neuronales Netz kann ein Feld darstellen, dessen Wert sich an jeder beliebigen Koordinate im Definitionsbereich auswerten lässt. Eine endliche Zahl von Parametern liefert damit eine kontinuierliche Beschreibung, obwohl der Rechner mit endlicher Genauigkeit arbeitet.

Neuronale Kontinuität verbindet diese Darstellung mit einer differenzierbaren Dynamik. Das Feld entwickelt sich nach einer Aktualisierungsregel, deren Gradienten es erlauben, die Parameter aus Beobachtungen zu lernen. Formal gilt

$$
f_{t+1}=\Phi_{\theta}(f_t),
$$

wobei $f_t$ das Feld im aktuellen Schritt bezeichnet und $\theta$ die gelernten Parameter enthält. Endliche Parametrisierung, kontinuierliche räumliche Auswertung und differenzierbare Aktualisierungen bestimmen den vorgeschlagenen Rahmen.

Mit solchen Aktualisierungen lässt sich die zeitliche Entwicklung eines Feldes lernen. Entscheidend ist jedoch, was bei wiederholter Anwendung geschieht. Kleine numerische Fehler können sich aufsummieren. Auch eine glatte Darstellung kann die Physik falsch vorhersagen.

Zu verstehen, unter welchen Bedingungen gelernte Felddynamiken das physikalische System weiterhin richtig beschreiben, ist ein Grund, neuronale Kontinuität zu untersuchen.

[Code](https://github.com/akashjorss/NFTM) · [Rechnen mit neuronalen Feldern](/notes/physics-as-neural-turing-computation/)
