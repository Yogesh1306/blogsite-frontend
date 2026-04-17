const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#e6e6ff] text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col gap-16 px-4 py-16 md:px-8 lg:px-0">
        {/* Page header */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-500">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            A space for clean code, real projects, and honest notes on learning.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            This blog collects hands‑on lessons from building full‑stack apps,
            studying core CS, and shipping things that actually run in
            production.
          </p>
        </header>

        {/* Grid: about site + about me */}
        <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-start">
          {/* About the site */}
          <div className="space-y-6 rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm shadow-indigo-100 md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
              About the blog
            </h2>
            <p className="text-sm text-slate-700 md:text-base">
              This site is a shared space for modern web development and computer science. You will find deep‑dive posts on backend architecture, database design, and production‑ready patterns, along with practical tutorials and small experiments that anyone can follow.
            </p>
            <p className="text-sm text-slate-700 md:text-base">
              The goal is simple: make real-world lessons from projects like social apps, school platforms, auth services, and content sites available to everyone—without the filler. Each article aims to be actionable, code-focused, and honest about trade‑offs so readers can reuse the ideas in their own work.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-70000">
              <li>
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span>
                  Architecture notes from MERN/Next.js, Node, and modern backend
                  work.
                </span>
              </li>
              <li>
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span>
                  Database thinking: schema design, queries, and performance
                  basics.
                </span>
              </li>
              <li>
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span>
                  Study logs from DBMS, algorithms, math, and
                  more.
                </span>
              </li>
            </ul>
          </div>

          {/* About the author */}
          <aside className="space-y-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm shadow-indigo-100 md:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-sky-400 text-lg font-semibold text-white">
                YJ
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  About the author
                </h2>
                <p className="text-xs text-slate-500">
                  Full‑stack developer & CS student
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 md:text-base">
              Hey, I&apos;m Yogesh — a full‑stack dev from Ghaziabad who enjoys
              building real products more than toy demos. Most days are split
              between shipping features, refactoring old code, and preparing for
              GATE CS.
            </p>
            <p className="text-sm text-slate-700 md:text-base">
              I work mainly with Next.js, Node, TypeScript, Prisma, and
              SQL/NoSQL databases, and I like projects that touch auth, RBAC,
              and clean backend design. This blog is where I document what
              worked, what broke, and what was worth keeping.
            </p>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  What to expect
                </p>
                <p>
                  Practical breakdowns, code snippets, and honest notes from
                  real builds.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Elsewhere
                </p>
                <p>
                  You can usually find me pushing to GitHub or replaying
                  lectures with VS Code still open.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* Tiny footer note */}
        <footer className="border-t border-indigo-100 pt-6 text-xs text-slate-500">
          Built in public. Updated as the projects — and mistakes — grow.
        </footer>
      </section>
    </main>
  );
};

export default AboutPage;
