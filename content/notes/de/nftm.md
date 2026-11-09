---
title: Rechnen mit neuronalen Feldern
date: 2026-11-09
description: Die Entwicklung physikalischer Felder durch lokale Aktualisierungen lernen.
slug: physics-as-neural-turing-computation
---

In der Neural Field Turing Machine (NFTM) gibt eine Steuereinheit die Rechenregel vor, während ein räumliches Feld den Zustand speichert. Die Steuereinheit besitzt keinen eigenen Speicher. Über bewegliche Köpfe liest sie einen lokalen Bereich, berechnet eine Aktualisierung und schreibt das Ergebnis zurück.

Das Feld kann Temperaturen, den Zustand eines zellulären Automaten oder ein Bild enthalten. Wiederholte Aktualisierungen verändern diesen Zustand mit der Zeit. Bei einem physikalischen System sollen die gelernten Aktualisierungen dessen Entwicklung wiedergeben.

Im Versuch zur Wärmeleitungsgleichung haben wir einen Diffusionsoperator vorgegeben und seine Koeffizienten gelernt. Jedes vorhergesagte Temperaturfeld diente als Eingabe für den nächsten Schritt. Weitere Versuche prüften dasselbe Lese- und Schreibprinzip an zellulären Automaten und bei der Vervollständigung von Bildern.

Der Wärmeleitungsversuch beginnt mit einer bekannten Gleichung. Ein schwierigerer Test würde bei den Messungen ansetzen und die Steuereinheit lernen lassen, wie sich das Feld verändern soll.

Vorgestellt im Workshop Machine Learning and the Physical Sciences (ML4PS) auf der Conference on Neural Information Processing Systems (NeurIPS) 2025.

[Code](https://github.com/akashjorss/NFTM) · [Neuronale Kontinuität](/notes/neural-continuity/)
