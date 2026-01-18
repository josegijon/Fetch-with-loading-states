# Pokedex Explorer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

---


## 📚 Table of Contents

- [Project Description](#Project-Description)
- [Main Features](#main-features)
- [What I Learned](#what-i-learned)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)

---

## 📝 Project Description

**Pokedex Explorer** is a responsive web application built with **React and TypeScript** that allows users to browse, search, and paginate through Pokémon data fetched from **PokeAPI**.

This project focuses on clean architecture, separation of concerns, and efficient data fetching, including caching and optimized search behavior. It was developed as a practical exercise to improve React patterns, custom hooks, and real-world state management. 

---

## ⭐ Main Features

- Fetches Pokémon data from PokeAPI
- Clear UI states:
  - Loading (skeleton)
  - Error
  - Success
- Paginated Pokémon List
- Search by Pokémon name
- Search pagination independent from main pagination
- Client-side cache to avoid unnecessary re-fetching
- Debounced search input
- Retry mechanism on failed request
- Responsive layout with Tailwind CSS

---

## 🎯 What I Learned

- Fetching and handling external APIs using **async / await**
- Managing complex UI states (loading, error, success)
- Using `try / catch / finally` for robust error handling
- Optimizing performance with:
  - `useCallback()`
  - Client-side caching
  - Debounced user input
- Splitting logic using **custom hooks**
- Pagination data efficiently
- Structuring a scalable React project
- Creating reusable and strongly typed components with TypeScript
- Defining and organizing shared types and constants
- Improving UX with loading skeletons and error recovery
- Applying clean code principles
- Building responsive UIs using Tailwind CSS
- Customizing Tailwind via `@theme` in `index.css`

---

## 🧰 Tech Stack

- **Vite**
- **React + TypeScript**
- **Tailwind CSS**
- **Git**
- **PokeAPI**

---

## 📸 Screenshots

![Pokedex-explorer](/src/assets/images/image-1.png)
![Pokedex-explorer-loading](/src/assets/images/image.png)