# Slekco E-Commerce Assessment

This is a modern e-commerce application built for the Slekco Web Developer Assessment. It features a custom premium UI, a robust Next.js App Router backend, and MongoDB database integration.

## Technology Stack Used

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS v4, Lucide React (Icons).
- **Backend**: Next.js API Routes.
- **Database**: MongoDB (Mongoose ODM).
- **State Management**: React Context API (`CartContext`).
- **Deployment**: Vercel (Hosting & Serverless Functions), MongoDB Atlas (Database cluster).

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd slekco-ecommerce
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/slekco
   ```
4. **Seed the Database:**
   To add mock products and categories, run the seed script:
   ```bash
   npm run seed
   # (Ensure you add "seed": "npx tsx scripts/seed.ts" to package.json scripts first)
   ```
5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Overview

- **Next.js App Router:** Utilized for both frontend pages (`src/app/page.tsx`) and backend API routes (`src/app/api/...`). This eliminates the need for a separate Node.js/Express server and ensures seamless full-stack deployment on Vercel.
- **Database (MongoDB):** The schema is structured with normalized references (e.g., Products reference a Category ID) to mimic a real-world scalable database. Mongoose is used for object modeling.
- **State Management:** The shopping cart is managed via React's Context API (`CartContext.tsx`), ensuring that adding, removing, and updating quantities instantly reflects across the app (Navbar badge, Cart page) without prop drilling. It also syncs with `localStorage` to persist the cart on reload.
- **Authentication System:** A custom user registration and login flow is implemented using Next.js API Routes, with secure password hashing via `bcryptjs`.

## AI-Assisted Development

During the development of this project, AI tools (Google Gemini / Antigravity) were utilized to accelerate boilerplate generation and optimize problem-solving.

- **Which AI tools were used:** Google Gemini.
- **Where AI helped:** AI assisted in rapidly scaffolding the Mongoose schemas and setting up the Next.js API route structures.
- **Example of modification:** The AI initially generated basic UI components with standard Tailwind colors. I significantly modified the design tokens, adjusting spacing, adding glassmorphic (`backdrop-blur-md`) navigation, and implementing custom hover micro-interactions (`group-hover:scale-105`) to achieve a premium, non-generic visual hierarchy tailored to the Slekco brand.
