import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8 sm:p-20`}
    >
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Personal Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to my personal space on the web
          </p>
        </header>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn more about my journey, interests, and what drives me.
            </p>
          </article>

          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Latest Posts</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover my latest thoughts and experiences.
            </p>
          </article>

          <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the projects I'm working on and have completed.
            </p>
          </article>
        </section>

        <footer className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Personal Blog. Built with Next.js and Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  );
}
