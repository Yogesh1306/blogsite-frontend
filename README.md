# YogeshBlogApp — Frontend

A modern, full-stack blogging platform frontend built with React 19, Vite, and Tailwind CSS. Open for anyone to read, write, and interact with blog posts — not just a personal notebook.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit + Redux Persist |
| Server State | TanStack React Query v5 |
| HTTP Client | Axios |
| Routing | React Router v7 |
| Rich Text Editor | React Quill New |
| Image/Media | ImageKit React SDK |
| Auth (Social) | Google OAuth (custom `/users/google` endpoint) |
| UI Components | Ant Design v6, Lucide React |
| Notifications | React Toastify |
| Time Formatting | timeago.js |

---

## Features

- **Public blogging platform** — anyone can read posts, no account required
- **Authentication** — register/login with email or social login via Firebase
- **Write posts** — rich text editor (React Quill) with image and video upload via ImageKit
- **Post management** — authors can delete their own posts; admins can manage all content
- **Comments system** — add, view, and delete comments with optimistic UI updates
- **Save posts** — logged-in users can bookmark posts
- **Search & filter** — search posts by keyword, filter by category via the side menu
- **Featured posts** — curated featured section on the homepage
- **Categories** — main categories section and sidebar category navigation
- **Role-based access** — admin role with elevated permissions
- **Persistent auth state** — user session survives page refresh via Redux Persist
- **Responsive design** — mobile-friendly layout

---

## Project Structure
```
blogsite-frontend/
├── src/
│ ├── components/
│ │ ├── Categories.jsx # Sidebar category list
│ │ ├── Comment.jsx # Single comment card
│ │ ├── CommentsContainer.jsx # Full comments section with form
│ │ ├── FeaturedPosts.jsx # Featured posts block
│ │ ├── ImageComponent.jsx # ImageKit image renderer
│ │ ├── MainCategories.jsx # Homepage category section
│ │ ├── Navbar.jsx # Top navigation bar
│ │ ├── PostList.jsx # Post listing with pagination
│ │ ├── PostListItem.jsx # Individual post card
│ │ ├── PostMenuActions.jsx # Save / delete action icons
│ │ ├── SearchComponent.jsx # Search bar
│ │ ├── SideMenu.jsx # Sidebar with filters & categories
│ │ └── Upload.jsx # Image/video upload to ImageKit
│ ├── layouts/ # App layout wrappers
│ ├── redux/ # Redux store, slices, persist config
│ ├── routes/
│ │ ├── About.jsx # About page
│ │ ├── HomePage.jsx # Home page
│ │ ├── LoginPage.jsx # Login page
│ │ ├── PostListPage.jsx # Search results / all posts page
│ │ ├── RegisterPage.jsx # Register page
│ │ ├── SinglePostPage.jsx # Individual post view
│ │ └── Write.jsx # Write / create post page
│ ├── App.jsx # Route declarations
│ ├── main.jsx # Entry point with Redux + Query providers
│ └── index.css # Global styles
├── index.html
├── tailwind.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- A running backend server (see [blogsite-backend](https://github.com/Yogesh1306/blogsite-backend))
- ImageKit account (for media uploads)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Yogesh1306/blogsite-frontend.git
cd blogsite-frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root with the following variables:

```env
VITE_BACKEND_URL=your_backend_url

```

### Running Locally

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server via Vite |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Landing page with featured posts, categories, and post list |
| `/posts` | PostListPage | Search results and filtered post list |
| `/posts/:slug` | SinglePostPage | Full individual post with comments |
| `/write` | Write | Create a new blog post (auth required) |
| `/login` | LoginPage | Login with email or social |
| `/register` | RegisterPage | Create a new account |
| `/about` | About | About the platform and the author |

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)