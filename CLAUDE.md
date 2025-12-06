# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio minimaliste en HTML/CSS/JS vanilla, conçu pour être hébergé sur AlwaysData (ou tout hébergeur statique).

## Architecture

```
portfolio/
├── index.html              # Page d'accueil / Présentation
├── projects.html           # Liste des projets
├── curiosites.html         # Page explorations / intérêts
├── css/
│   ├── style.css           # Import principal (charge tous les modules)
│   ├── variables.css       # Design tokens (couleurs, fonts, espacements)
│   ├── base.css            # Reset et styles de base
│   ├── layout.css          # Header, footer, sections, grilles
│   ├── components.css      # Cards, boutons, tags, avatars
│   └── animations.css      # Animations et transitions
├── js/
│   └── main.js             # Navigation, animations scroll, menu mobile
├── projects/
│   └── projet-{1-6}.html   # Pages individuelles des projets
└── assets/
    └── images/             # Images du portfolio
```

## Design System

Les variables CSS dans `css/variables.css` définissent:
- Palette: noir/blanc/gris + accent configurable (`--color-accent`)
- Typographie: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)
- Espacements: `--space-{xs,sm,md,lg,xl,2xl,3xl,4xl,5xl}`
- Animations: `--transition-{fast,base,slow,slower}`, easing customs

## Personnalisation

1. **Couleur d'accent**: Modifier `--color-accent` dans `variables.css`
2. **Logo**: Remplacer "votrenom." dans le header de chaque HTML
3. **Contenu**: Chercher les commentaires `<!-- PLACEHOLDER -->` ou `<!-- Placeholder -->`
4. **Images**: Placer dans `assets/images/`, remplacer les placeholders HTML

## Conventions

- Classes CSS en BEM: `.block__element--modifier`
- Animations d'entrée: `.fade-in`, `.stagger-item` (activées par JS)
- Responsive: Mobile-first, breakpoints à 576px, 768px, 992px
