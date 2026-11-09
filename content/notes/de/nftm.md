---
title: Rechnen mit neuronalen Feldern
date: 2026-11-09
description: Die Entwicklung physikalischer Felder durch lokale Aktualisierungen lernen.
slug: physics-as-neural-turing-computation
---

Ein neuronales Feld beschreibt den Zustand eines Systems durch räumlich verteilte Werte. Rechnen lässt sich dann als lokaler Vorgang auffassen. Ein kleiner Bereich wird gelesen, nach einer gelernten Regel verändert und in das Feld zurückgeschrieben.

Die Neural Field Turing Machine (NFTM) beschreibt dieses Vorgehen als Rechenmodell. Ihre Steuereinheit liest und verändert lokale Bereiche über bewegliche Köpfe. Sie besitzt keinen eigenen Speicher. Der Zustand liegt im räumlichen Feld.

Lokale Aktualisierungen stellen die Verbindung zur physikalischen Entwicklung her. Im Versuch zur Wärmeleitungsgleichung bestimmen ein vorgegebener Diffusionsoperator und gelernte Koeffizienten, wie sich die Temperatur verändert. Jedes vorhergesagte Feld dient als Eingabe für den nächsten Zeitschritt. Weitere Beispiele übertragen das Prinzip auf zelluläre Automaten und die Vervollständigung von Bildern.

Bei wiederholten Aktualisierungen wird die Fehlerfortpflanzung entscheidend. Eine brauchbare Regel muss auch dann zuverlässig bleiben, wenn sie ihre eigenen Vorhersagen als Eingabe erhält. Diese Zuverlässigkeit für neue Geometrien und Betriebsbedingungen zu prüfen, gehört zu den nächsten Aufgaben.

Vorgestellt bei Machine Learning and the Physical Sciences (ML4PS), einem Workshop der Conference on Neural Information Processing Systems (NeurIPS) 2025.

[Code](https://github.com/akashjorss/NFTM) · [Neuronale Kontinuität](/notes/neural-continuity/)
