---
title: Können Maschinen die Gesetze der Physik entdecken?
date: 2026-11-09
description: Physiker stellen aus erstaunlich wenigen Beobachtungen allgemeine Gesetze auf. Können Maschinen das auch?
slug: can-a-machine-rediscover-keplers-laws
---

Aus wenigen, verrauschten Beobachtungen können Physiker allgemeine Gesetze entwickeln. Ein frühes Beispiel sind die Keplerschen Gesetze. Messungen der Planetenpositionen, aufgenommen von der selbst bewegten Erde aus, führten zu einer Beschreibung, die über die beobachteten Bahnen hinausging.

Die Planetenbewegung eignet sich deshalb als erster Prüfstein für die maschinelle Entdeckung physikalischer Gesetze. KeplerBench verlangt von einem lernenden System, aus beobachterabhängigen Messungen allgemeine Gesetze zu gewinnen. Die Koordinaten und Gleichungen, die das Problem vereinfachen, werden dabei nicht vorgegeben. Bisherige Systeme haben diese Aufgabe noch nicht gelöst.

Der Vorversuch zeigt, warum eine gute Datenanpassung allein nicht genügt. Ein Gaußprozessmodell erreicht bei den Trainingsdaten einen medianen Fehler von 0,72 Bogenminuten, bei den zurückgehaltenen Testbeobachtungen jedoch rund 1174. Ein elliptisches Bahnmodell erreicht dagegen 2,66 beziehungsweise 13,31 Bogenminuten. Seine physikalische Struktur war allerdings vorgegeben. Es hat die Gesetze nicht selbst entdeckt.

Diese Struktur zu finden und auf unbekannte Planetensysteme zu übertragen, ist die Herausforderung, die der Benchmark stellt.

Angenommen bei Machine Learning with Imperfect Scientific Models (Sim2Science), einem Workshop der Conference on Neural Information Processing Systems (NeurIPS) 2026.

[Code](https://github.com/Neural-Continuity-Labs/keplerbench)
