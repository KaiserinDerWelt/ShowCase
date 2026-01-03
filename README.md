# Showcase Movies
This application was created to display, search and filter a paginated collection of movies served by an API.

## Architecture
* Component based architecture.
* Service layer - Separated API logic.
* Responsive design.
* Lazy loading.
* Drawn hand wireframe became true.

## Core Technologies
* Next.js 15.
* React 18.
* TypeScript.
* Tailwind CSS v4.

## API Integration
* Movies API (URL available under request @KaiserinDrWelt).
* Token authentication for API Security.

## Getting Started
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

1. Run the development server:
```bash
npm run dev

```
2. Open [http://localhost:3000](http://localhost:3000) with your browser.
3. If the app is forked for a continuous development don't forget to tag me on X @KaiserinDrWelt 😉.

## Live Project
The live application is available here [https://show-case-lac.vercel.app/](https://show-case-lac.vercel.app/) and proudly hosted by VERCEL.

## About my experience working on this project


**My highlight: Improving app performance.**

The biggest challenge I faced was figuring out how to show detailed movie information without killing the app's performance.

When I first explored the API, I noticed the `/movies` endpoint only returns basic data—just the title, poster, and rating. To get the good stuff like the overview, runtime, and genres, I'd need to call `/movies/{id}` for each individual movie. That meant if I wanted to show all the details for 20 movies on a page, I'd be making 20+ API requests every time the page loads. That's... not great for performance.
So I came up with a lazy-loading approach that loads details on hover.

## What I'm Most Proud Of

I'm proud of transforming my hand-drawn UI design into a working application that fulfills all the requirements.

One detail I enjoyed implementing was formatting the movie runtime for better readability. The API returns runtime in minutes (e.g., "136"), but I converted it to a user-friendly format like "2h 16m". This required refactoring my API service and updating TypeScript types, but it was worth it to see the information displayed cleanly and meaningfully for users.

## What I'd Do Next

If I had more time, I'd add a movie detail page. Right now, when you click on a movie, nothing happens. I'd make it so clicking takes you to a dedicated page for that movie with all the info.

**What would be on that page:**

- The full movie description and plot.
- All the details: how long it is, when it came out, the cast, genres, etc.
- Nice big poster and backdrop images.
- An embedded trailer so you can watch it right there.
- Action buttons depending on what the app is for like "Watch Now" if it's a streaming app, or "Download" if that makes sense.

Basically, it would complete the experience. Right now you can search and browse, but this would let you actually learn about the movie and do something with it.

**SDLC & CLI**
_ The software development cycle was followed throughout this project. Planning, Analysis, Design and Software Architecture, Software Development, Testing, and Deployment were all part of my responsibilities as a software engineer._

_The design, architecture, component creation, and initial API implementation were written by me. Claude CLI was used primarily for debugging and testing, particularly to quickly optimize API calls and improve application performance._
_Thank you so much, KDW!!_