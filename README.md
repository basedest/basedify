# Basedify

A React Native mobile application for habit tracking and personal development.

## Features

-   Habit tracking and program management
-   Dark/Light theme support
-   Progress tracking and achievements
-   Task filtering and day navigation
-   SQLite database integration with Prisma
-   Multi-platform support (iOS, Android)
-   Internationalization (i18n) with support for English and Russian locales

## Tech Stack

-   React Native with Expo
-   TypeScript
-   TailwindCSS/NativeWind for styling
-   Prisma for database management
-   React Query for data fetching
-   Zustand for state management
-   Expo Router for navigation
-   i18next for internationalization

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm
-   Expo CLI

### Installation

1. Install dependencies:

```bash
npx expo install
```

2. Prebuild app (otherwise SQLite won't work):

```bash
npx expo prebuild --clean
```

3. Start the development server

```bash
npx expo start
```
