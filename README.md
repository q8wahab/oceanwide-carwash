# Oceanwide Car Wash Progress Checker

This is a Next.js web application that allows Oceanwide Car Wash customers to check their wash progress and rewards by entering their phone number.

## Features

- Enter an 8-digit phone number to view progress.
- Displays total washes completed.
- Visual progress tracker showing steps towards rewards (Free Wash, Special Wash, Ocean Wash).
- Connects to a Supabase backend to fetch customer data.
- Mobile-first responsive design using Tailwind CSS.
- Error handling for invalid or not-found phone numbers.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (implicitly used by template, though not heavily customized here)
- **Icons:** Lucide React
- **Backend:** Supabase (Postgres)
- **Package Manager:** pnpm

## Setup and Running Locally

1.  **Clone the repository (or extract the provided code archive).**
2.  **Install dependencies:**
    ```bash
    cd oceanwide-carwash-app
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a file named `.env.local` in the root directory (`oceanwide-carwash-app/`) and add your Supabase credentials:
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
    ```
    Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY` with the actual values from your Supabase project settings (API section).

4.  **Ensure your Supabase `customers` table is set up:**
    - The table should be named `customers`.
    - It needs columns: `phone` (TEXT, unique), `normal` (INT), `special` (INT), `external` (INT), `ocean` (INT).
    - Make sure Row Level Security (RLS) is enabled and configured to allow read access based on the provided phone number if needed, or ensure the anon key has read permissions on the table.

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Due to limitations in the execution environment (encountered 'Bus error' during build/dev), the application could not be fully tested with the live development server. Manual code review has been performed.

Please test thoroughly in your local environment by:
- Entering valid phone numbers present in your Supabase `customers` table.
- Entering phone numbers *not* present in the table to check the "Not Found" error handling.
- Entering invalid input formats.
- Checking responsiveness on different screen sizes.

## Deployment (Manual Instructions)

Direct deployment from this environment failed due to build errors ('Bus error'). You can deploy this application manually using platforms like Vercel, Netlify, or Cloudflare Pages by connecting your GitHub repository.

**General Steps:**

1.  **Push the code to a GitHub repository.** (See GitHub section below).
2.  **Choose a hosting platform (Vercel, Netlify, Cloudflare Pages).**
3.  **Connect your GitHub repository to the platform.**
4.  **Configure the build settings:**
    *   **Build Command:** `pnpm build` (or `npm run build` if you switch to npm)
    *   **Publish/Output Directory:** `.next`
    *   **Install Command:** `pnpm install` (or `npm install`)
5.  **Add Environment Variables:**
    In your hosting platform's project settings, add the following environment variables:
    *   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key.
6.  **Deploy the site.**

Refer to the specific documentation of your chosen platform (Vercel, Netlify, Cloudflare Pages) for detailed instructions on deploying Next.js applications.

## GitHub

This codebase is ready to be pushed to a GitHub repository.

1.  Navigate to the `oceanwide-carwash-app` directory in your terminal.
2.  Initialize a git repository if one doesn't exist:
    ```bash
    git init
    ```
3.  Add the files and commit them:
    ```bash
    git add .
    git commit -m "Initial commit of Oceanwide Car Wash app"
    ```
4.  Create a new repository on GitHub.
5.  Add the GitHub repository as a remote and push:
    ```bash
    git remote add origin YOUR_GITHUB_REPOSITORY_URL
    git branch -M main
    git push -u origin main
    ```
    Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL provided by GitHub.

