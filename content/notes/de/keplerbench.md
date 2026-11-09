---
title: Können Maschinen die Gesetze der Physik entdecken?
date: 2026-11-09
description: Physiker stellen aus erstaunlich wenigen Beobachtungen allgemeine Gesetze auf. Können Maschinen das auch?
slug: can-a-machine-rediscover-keplers-laws
---

Kepler entwickelte aus Beobachtungen der Planetenbewegung Gesetze, die über die gemessenen Bahnen hinaus galten. KeplerBench fragt, ob eine Maschine denselben Schritt machen kann, ohne die Gleichungen vorab zu erhalten.

Der Benchmark nutzt historische astronomische Beobachtungen und synthetische Planetensysteme mit veränderten physikalischen Gesetzen. Er prüft getrennt, ob ein Modell neue Beobachtungen vorhersagen, auf andere Systeme übertragbare Gesetze finden oder wiederverwendbare lokale Regeln lernen kann.

Ein Vorversuch mit historischen Marsbeobachtungen zeigt, warum eine gute Datenanpassung nur ein erster Schritt ist. Ein Gaußprozessmodell erreichte bei den Trainingsdaten einen medianen Fehler von 0,72 Bogenminuten, bei den zurückgehaltenen Testbeobachtungen jedoch rund 1174. Ein Modell mit einer Keplerschen Ellipse erreichte dagegen 2,66 beziehungsweise 13,31 Bogenminuten.

Die physikalische Struktur des Ellipsenmodells war vorgegeben. Das Ergebnis zeigt ihren Nutzen, lässt aber offen, wie eine Maschine sie selbst finden könnte. Der schwierigere Test besteht darin, ein Gesetz zu entdecken und auf ein Planetensystem anzuwenden, das dem Modell noch unbekannt ist.

Angenommen für den Workshop Machine Learning with Imperfect Scientific Models (Sim2Science) auf der Conference on Neural Information Processing Systems (NeurIPS) 2026.

[Code](https://github.com/Neural-Continuity-Labs/keplerbench)
