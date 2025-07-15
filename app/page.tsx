"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header"; // Assuming you have a Header component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Code,
  Database,
  Github,
  Layout,
  Linkedin,
  Palette,
  Shield,
  Film,
  Folder,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleDemoClick = () => {
    router.push("/all-movies"); // Assuming /all-movies is your main movie listing page
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Assuming Header is a component you have, if not, you might need to create a placeholder or remove it */}
      <Header
        title="Movie Hub"
        user={{
          name: "Guest", // Or dynamically fetch user if this page is accessible when logged in
          email: "guest@example.com",
        }}
      />
      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Movie Explorer App: Discover, Search, Favorite
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive movie browsing application built with Next.js,
              featuring robust authentication, dynamic search, and a personal
              favorite movies collection.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Badge variant="outline" className="px-3 py-1">
                <Layout className="mr-1 h-3 w-3" />
                Next.js 14
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Palette className="mr-1 h-3 w-3" />
                Tailwind CSS
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Database className="mr-1 h-3 w-3" />
                Prisma &#43; Neon DB
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Shield className="mr-1 h-3 w-3" />
                JWT Auth
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Film className="mr-1 h-3 w-3" />
                TMDB API
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Code className="mr-1 h-3 w-3" />
                shadcn/ui
              </Badge>
            </div>
          </section>

          {/* Features */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="setup">Setup Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Authentication System</CardTitle>
                    <CardDescription>
                      Secure user access and session management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Login & Register functionality
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        JWT token-based authentication
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Session management using cookies
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Protected routes for logged-in users
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Movie Browsing & Search</CardTitle>
                    <CardDescription>
                      Explore and find movies effortlessly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Fetch movies from TMDB API
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Display poster, title, and rating
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Dynamic search bar for movies
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Infinite scrolling or pagination
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Movies Feature</CardTitle>
                    <CardDescription>
                      Personalized movie collection management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Add/remove movies to/from favorites
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Favorites stored in PostgreSQL via Prisma
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Dedicated My Favorites page
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Seamless favorite management
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>UI/UX & Performance</CardTitle>
                    <CardDescription>
                      Optimized for a smooth user experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Fully responsive design
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Next.js Image Optimization
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Loading skeletons for better UX
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Dark and Light mode support
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technology Stack</CardTitle>
                  <CardDescription>
                    Core technologies used in this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Framework & Frontend</h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          Next.js 14 (App Router) for server and client-side
                          rendering
                        </li>
                        <li>TypeScript for robust type safety</li>
                        <li>Tailwind CSS for utility-first styling</li>
                        <li>shadcn/ui components for a modern UI</li>
                        <li>Framer Motion for smooth animations</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Backend & Database</h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>Prisma ORM for database access and management</li>
                        <li>
                          Neon PostgreSQL for storing user and favorite data
                        </li>
                        <li>JWT token-based authentication for API security</li>
                        <li>TMDB API for movie data fetching</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Code Structure</h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          Modular components for reusability and maintainability
                        </li>
                        <li>
                          Clear separation of Server and Client Components
                        </li>
                        <li>
                          Protected routes with server-side authentication
                          checks
                        </li>
                        <li>
                          Custom hooks for shared logic and state management
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Structure Overview</CardTitle>
                  <CardDescription>
                    Understanding the folder and file organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        <code className="bg-muted px-1 rounded-sm">
                          app/
                        </code>{" "}
                        Directory
                      </h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            (main)/
                          </code>
                          : A route group for authenticated pages, ensuring a
                          consistent layout and protection.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            all-movies/
                          </code>
                          : Contains the main movie listing page and dynamic
                          routes for individual movie details (
                          <code className="bg-muted px-1 rounded-sm">
                            [id]/page.tsx
                          </code>
                          ).
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            favorites/page.tsx
                          </code>
                          : Displays the user favorite movies.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            profile/page.tsx
                          </code>
                          : Shows the user profile information and recent
                          activity.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            login/page.tsx
                          </code>{" "}
                          &{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            register/page.tsx
                          </code>
                          : Pages for user authentication.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            layout.tsx
                          </code>
                          : Root layout for the entire application, and specific
                          layouts for route groups (e.g.,{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            (main)/layout.tsx
                          </code>{" "}
                          for authenticated routes).
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        <code className="bg-muted px-1 rounded-sm">
                          app/api/
                        </code>{" "}
                        Directory
                      </h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            favorite/route.ts
                          </code>
                          : API endpoint for adding and removing movies from
                          favorites.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            favorite/check/route.ts
                          </code>
                          : API endpoint to check if a movie is already
                          favorited by the user.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            login/route.ts
                          </code>
                          : Handles user login requests and JWT token
                          generation.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            register/route.ts
                          </code>
                          : Manages new user registration and account creation.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        <code className="bg-muted px-1 rounded-sm">
                          components/
                        </code>{" "}
                        Directory
                      </h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            auth-layout.tsx
                          </code>
                          : A layout component specifically for authentication
                          pages (login/register).
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            FavoritesClient.tsx
                          </code>
                          : A client component responsible for rendering and
                          managing the favorites list on the client-side.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            Header.tsx
                          </code>
                          : The applications header, providing navigation and
                          user information.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            MovieCard.tsx
                          </code>
                          : A reusable component to display individual movie
                          information (poster, title, rating).
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            MovieCardSkeleton.tsx
                          </code>
                          : Provides a loading skeleton for movie cards to
                          improve perceived performance.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            MovieDetailClient.tsx
                          </code>
                          : A client component for interactive elements on the
                          movie detail page.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            Sidebar.tsx
                          </code>
                          : The applications sidebar for navigation (if
                          implemented).
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        Other Important Files
                      </h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            lib/prisma.ts
                          </code>
                          : Initializes the Prisma client for database
                          interactions.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            globals.css
                          </code>
                          : Global CSS styles, including Tailwind CSS base
                          styles.
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            tailwind.config.ts
                          </code>
                          : Tailwind CSS configuration file.
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="setup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    How to set up and run the project locally
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Prerequisites</h3>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>Node.js 16.8 or later</li>
                        <li>npm or yarn package manager</li>
                        <li>
                          Neon PostgreSQL database (or another PostgreSQL
                          instance)
                        </li>
                        <li>TMDB API Key (get one from themoviedb.org)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Installation Steps</h3>
                      <ol className="space-y-1 ml-6 list-decimal text-muted-foreground">
                        <li>Clone the repository from GitHub</li>
                        <li>
                          Run{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            npm install
                          </code>{" "}
                          or{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            yarn install
                          </code>{" "}
                          to install dependencies
                        </li>
                        <li>
                          Configure environment variables (create a{" "}
                          <code className="bg-muted px-1 rounded-sm">.env</code>{" "}
                          file)
                        </li>
                        <li>
                          Run{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            npx prisma migrate dev
                          </code>{" "}
                          to set up the database schema
                        </li>
                        <li>
                          Start the development server with{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            npm run dev
                          </code>{" "}
                          or{" "}
                          <code className="bg-muted px-1 rounded-sm">
                            yarn dev
                          </code>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">
                        Environment Variables
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Required environment variables for the project:
                      </p>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            DATABASE_URL
                          </code>
                          : Your Neon PostgreSQL connection string
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            JWT_SECRET
                          </code>
                          : A strong secret key for JWT token generation
                        </li>
                        <li>
                          <code className="bg-muted px-1 rounded-sm">
                            TMDB_API_KEY
                          </code>
                          : Your API key from The Movie Database (TMDB)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Deployment</CardTitle>
                  <CardDescription>
                    How to deploy the Movie Explorer App
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Vercel Deployment</h3>
                      <p className="text-sm text-muted-foreground">
                        This project is configured for easy deployment on
                        Vercel:
                      </p>
                      <ol className="space-y-1 ml-6 list-decimal text-muted-foreground mt-2">
                        <li>Connect your GitHub repository to Vercel</li>
                        <li>
                          Configure environment variables in the Vercel
                          dashboard
                        </li>
                        <li>Deploy automatically from your main branch</li>
                      </ol>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">
                        Other Hosting Options
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The project can also be deployed to:
                      </p>
                      <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                        <li>Netlify</li>
                        <li>AWS Amplify</li>
                        <li>Any hosting service supporting Next.js</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="border-dashed">
            <CardHeader className="text-center">
              <CardTitle>Ready to explore movies?</CardTitle>
              <CardDescription>
                Dive into the world of cinema and manage your favorites!
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <Button size="lg" className="gap-2" onClick={handleDemoClick}>
                <Film className="h-4 w-4" />
                Discover Movies
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 md:py-8 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="ext-center text-sm text-muted-foreground md:text-left">
              🌟 Movie Explorer App - Crafted with Next.js and shadcn/ui 🌟
            </p>
            <div className="flex gap-4 items-center mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/sagar-manchakatla-4163-523b44284/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/sagarmanchakatla/movies-hub" // Update this to your Movie Explorer App repo
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} Sagar Manchakatla. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
