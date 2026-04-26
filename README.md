# Islam-QA UI

> ⚠️ This project is in early development. Contributions and feedback are welcome.

🌐 **Live Demo:** [islam-qa-ui.vercel.app](https://islam-qa-ui.vercel.app)

## Related Repositories

| Service | Repository |
|---|---|
| ⚙️ Backend Service | [Islam-QA](https://github.com/alikashlan10/Islam-QA) |
| 🔍 Search Service | [Islam-QA-Search](https://github.com/alikashlan10/Islam-QA-Search) |

---

## Overview

Islam-QA UI is the frontend of the Islam-QA system. It provides a clean Arabic interface for searching Islamic knowledge extracted from scholarly lecture videos. Users submit a query and receive a grounded answer alongside the source videos.

---

## Features

- Arabic RTL interface with automatic LTR detection for non-Arabic queries
- Hybrid search powered by the Islam-QA Search Service
- Answer displayed alongside scrollable source cards
- Each source links directly to the relevant YouTube video
- Responsive and minimal design

---

## Tech Stack

| Component | Technology |
|---|---|
| Framework | React + Vite |
| Styling | Plain CSS |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/alikashlan10/Islam-QA-UI
cd Islam-QA-UI
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

All required variables are documented in `.env.example`.

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Deployment

The UI is deployed on Vercel. Every push to `main` triggers an automatic deployment.

To deploy your own instance:

1. Fork this repository
2. Import it into [Vercel](https://vercel.com)
3. Add the environment variables in Vercel project settings
4. Deploy

---

## License

MIT
