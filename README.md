# Game Store

Game Store is a modern e-commerce web application built with Next.js, Apollo Client, and Tailwind CSS. It provides a seamless shopping experience with features like product browsing, cart management, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Thought Process and Architectural Decisions](#thought-process-and-architectural-decisions)
- [Trade-offs and Assumptions](#trade-offs-and-assumptions)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JoaquinPalacios/gamebull.git
   cd game-store
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

## Usage

1. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will start the application on `http://localhost:3000`.

2. **Build for production:**

   ```bash
   npm run build
   ```

3. **Start the production server:**

   ```bash
   npm start
   ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Folder Structure

/
├── public/ # Static assets
├── src/ # Source code
│ ├── app/ # Next.js 13+ App Router
│ │ ├── product/ # Product page routes
│ │ ├── globals.css # Global styles
│ │ ├── layout.tsx # Root layout
│ │ └── page.tsx # Home page
│ ├── components/ # React components
│ │ ├── Cart/ # Cart component
│ │ ├── Navbar/ # Navigation component
│ │ └── ProductCard/ # Product card component
│ ├── features/ # Feature-specific code
│ │ ├── context/ # React Context providers
│ │ └── hooks/ # Custom hooks
│ ├── graphql/ # GraphQL queries
│ │ └── queries/ # GraphQL query definitions
│ ├── providers/ # Provider components
│ │ └── apollo-provider.tsx
│ ├── types/ # TypeScript type definitions
│ └── utils/ # Utility functions
│ └── helpers/ # Helper functions
├── .eslintrc.json # ESLint configuration
├── package.json # Project metadata and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

## Thought Process and Architectural Decisions

- **Componentization**: The application is built using reusable React components to promote modularity and reusability.
- **State Management**: Context API is used for managing global state, such as the shopping cart, to keep the application simple and performant.
- **GraphQL with Apollo**: Apollo Client is used to manage data fetching and caching, providing a seamless integration with the REST API.
- **Responsive Design**: Tailwind CSS is used to ensure the application is responsive and visually appealing across different devices.

## Trade-offs and Assumptions

- **REST API**: Chose to use a REST API with Apollo Client for simplicity, assuming the API structure will remain stable.
- **Performance vs. Complexity**: Opted for a simpler state management solution (Context API) over more complex solutions like Redux, assuming the app's state needs are minimal.
- **SEO and Accessibility**: Basic SEO and accessibility practices are implemented, with the assumption that further enhancements can be made as the app grows.
