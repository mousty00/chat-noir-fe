# Chat Noir Front End

**A modern web client for the Chat Noir API - Browse and download cat media with style**

---

## Quick Start

```bash
git clone https://github.com/mousty00/chat-noir-fe.git
cd chat-noir-fe
bun install
bun run dev
```

**App:** `http://localhost:3000`

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15+ |
| Language | TypeScript |
| Styling | TailwindCSS |
| API Client | Apollo Client (GraphQL) + TanStack Query |
| UI Components | Shadcn UI |
| Icons | React Icons |

---

## Features

- **Browse cats** - Paginated gallery of adorable cats
- **Media preview** - View images directly in browser
- **One-click download** - Save cat media to your device
- **Responsive design** - Works on desktop & mobile
- **GraphQL powered** - Efficient data fetching

---

## Screenshots

<img width="1710" height="979" alt="Screenshot 2026-02-18 at 15 01 21" src="https://github.com/user-attachments/assets/98b9fcb3-9b5f-4125-a9f4-516ada148fd3" />

---

## Project Structure

```
chat-noir-fe/
├── components/     # Reusable UI components
│   └── cat/        # Cat-related components
│   └── ui/         # Shadcdn UI components
├── hooks/          # Custom React hooks
├── lib/            # API clients & configs
├── types/          # TypeScript definitions
└── app/            # Next.js app router
```

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## API Integration

The client connects to the Chat Noir API using:

- **GraphQL** for cat listings and metadata
- **REST streaming** for direct media downloads

```typescript
// Example: Fetch cats with GraphQL
const { data } = useQuery(GET_CATS, {
  variables: { page: 0, size: 10 }
});

// Download media directly
const handleDownload = (id: string) => {
  window.open(`/api/cats/${id}/media/stream`, '_blank');
};
```

---

## UI Components

- **CatCard** - Beautiful card layout with hover effects
- **Download button** - One-click media download
- **View button** - Preview images in new tab
- **Pagination** - Browse through cat collection
- **Loading states** - Smooth loading indicators

---

## Work in Progress

- [ ] Search & filters
- [ ] Favorites collection
- [ ] User authentication
- [ ] Dark mode toggle
- [ ] Infinite scroll
- [ ] Media type badges

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |

---

## Connect with Backend

This client is designed to work with the [Chat Noir API](https://github.com/mousty00/chat-noir-api) - make sure it's running locally or update the `NEXT_PUBLIC_API_URL` to point to an environment.

