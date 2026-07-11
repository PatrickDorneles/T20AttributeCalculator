![Logo](./doc/AttributesLogo.png)
# T20AC - Tormenta 20 Attribute Calculator

T20AC is a specialized web application designed for the Brazilian TTRPG **Tormenta 20 - Edição Jogo do Ano**. Its primary purpose is to assist players in character creation by streamlining the process of calculating attributes and managing the point-buy system for attribute distribution.

## ✨ Features

- **Dynamic Attribute Calculator**: Real-time calculation of character attributes following the official T20 rulebook.
- **Smart Point-Buy System**: Effortlessly distribute points with instant cost calculation and validation against point limits.
- **Racial Bonus Integration**: Automatic application of racial bonuses, including support for "Choice" and "Mixed" bonus types.
- **Character Management**: Create, save, and switch between multiple characters locally.
- **Export & Import**:
  - **JSON Export/Import**: Save your character data to a file or load an existing one.
  - **Image Export**: Generate a high-quality PNG image of your character's attribute sheet for easy sharing.
- **Customizable Configuration**: Adjust point limits and toggle the visibility of the "Other" points section.
- **Multilingual Support**: Available in both English and Portuguese.

## 🛠️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **Internationalization**: [next-intl](https://next-intl.org/)
- **Validation**: [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v24 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PatrickDorneles/T20AttributeCalculator.git
   cd T20AttributeCalculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✍️ Author

Developed by [Patrick Dorneles](https://github.com/PatrickDorneles).
