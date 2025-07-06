---
title: Vite + React
description: The default Vite + React starter, utilizing `Caddy` to serve the built app
tags:
  - node
  - vite
  - react
---

# Vite + React + Caddy

This is a [Vite + React](https://vitejs.dev/guide/#trying-vite-online) starter that uses [Caddy](https://caddyserver.com/).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/NeiLty?referralCode=ySCnWl)

## ✨ Features

- Vite + React
- [Caddy](https://caddyserver.com/)

## 💁‍♀️ How to use

- Install required dependencies with `npm install`
- Start the server for local development `npm run dev`

## ❓ Why use `Caddy` when deploying to Railway?

Caddy is a powerful, enterprise-ready, open source web server, and therefore Caddy is far better suited to serve websites than Vite is, using Caddy will result in much less memory and cpu usage compared to serving with Vite (much lower running costs too)

To see how this is achieved with nixpacks, check out the fully documented nixpacks.toml file in this repository

The configuration for Caddy is called a Caddyfile, and you can edit that file to further suite your needs, by default it comes configured to serve a single page app for React, and to also gzip the responses

**Relevant Caddy documentation:**

- [The Caddyfile](https://caddyserver.com/docs/caddyfile)
- [Caddyfile Directives](https://caddyserver.com/docs/caddyfile/directives)
- [root](https://caddyserver.com/docs/caddyfile/directives/root)
- [encode](https://caddyserver.com/docs/caddyfile/directives/encode)
- [file_server](https://caddyserver.com/docs/caddyfile/directives/file_server)
- [try_files](https://caddyserver.com/docs/caddyfile/directives/try_files)

# Mon Trello – Frontend

Ce projet est un clone simplifié de Trello, réalisé avec React, Tailwind CSS et Context API. Il est prêt à être connecté à un backend Node.js.

## Installation

1. **Cloner le projet**
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## Structure du projet
- **src/App.tsx** : Composant principal (Kanban)
- **src/context/** : (à venir) Gestion d'état globale
- **src/api/** : (à venir) Fonctions pour communiquer avec le backend

## Connexion au backend Node.js

1. **Préparer votre backend**
   - Créez un backend Node.js (Express recommandé)
   - Prévoyez des routes REST pour :
     - Récupérer les colonnes et cartes (`GET /kanban`)
     - Ajouter/éditer/supprimer une colonne ou une carte (`POST`, `PUT`, `DELETE`)

2. **Modifier le frontend pour utiliser l'API**
   - Dans `src/api/kanban.ts` (à créer), ajoutez des fonctions pour appeler votre backend avec `fetch` ou `axios`.
   - Remplacez la gestion d'état locale par des appels à ces fonctions dans le Context API.

3. **Exemple d'intégration**
   ```ts
   // src/api/kanban.ts
   export async function getKanban() {
     const res = await fetch('http://localhost:3000/kanban');
     return res.json();
   }
   ```

4. **Adapter le Context**
   - Utilisez les fonctions de l'API pour charger et modifier les données.

## Personnalisation
- Le design est facilement modifiable via Tailwind.
- L'interface est en français.

## À venir
- Drag & drop
- Ajout/édition/suppression de colonnes et cartes
- Connexion réelle au backend

---
N'hésitez pas à adapter ce projet à vos besoins !
