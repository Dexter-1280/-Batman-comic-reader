# Gotham Archive — The Batman Files

An animated, responsive Batman/Gotham fan experience built with React, Vite, React Router, Framer Motion, Canvas 2D and Lucide icons.

## Features

- Gotham City landing page with animated rain, city atmosphere and a Bat-Signal-inspired visual identity.
- Bat-Family directory featuring Batman, Alfred, Nightwing, Red Hood, Tim Drake, Damian Wayne, Batgirl, Cassandra Cain, Stephanie Brown, Batwoman and Catwoman.
- A dedicated Robin Legacy page covering Dick Grayson, Jason Todd, Tim Drake, Stephanie Brown and Damian Wayne, plus Carrie Kelley from the alternate-future story The Dark Knight Returns.
- Rogues Gallery with Joker, Bane, Penguin, Riddler, Scarecrow, Mr. Freeze, Poison Ivy, Ra's al Ghul, Two-Face, Harley Quinn, Black Mask and Killer Croc.
- Expanded Batman variants directory with comic multiverse versions plus live-action screen portrayals from the 1943 serials through the Robert Pattinson era. Each live-action profile includes a filmography.
- Search, category filters, sorting, individual profile pages and Bat-Signal / case-file transitions inspired by Gotham’s emergency spotlight rather than a multiverse portal.
- A 146-title Batman and Bat-Family comic catalogue with search, category filters, beginner reading paths, BatCave event reading orders and automatic infinite-scroll loading. Each title links to its matching BatCave series entry or a verified issue reader.
- Responsive layouts and reduced-motion support.
- Netlify and Vercel single-page-app routing configuration.

## Run locally

Use Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deploy

### Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Select the Vite framework preset.
4. Set the build command to `npm run build` and output directory to `dist`.
5. Deploy. `vercel.json` includes the SPA rewrite for nested routes.

### Netlify

1. Push this folder to a GitHub repository and import it in Netlify, or upload the built `dist` folder.
2. Set the build command to `npm run build` and publish directory to `dist`.
3. `netlify.toml` includes the SPA rewrite for nested routes.

## Character information and artwork

Character summaries are original short descriptions written for this fan-made directory. DC's official character pages are linked from individual profile pages where available. Artwork is loaded from external image hosts, including DC's public image CDN and other reference sources; an internet connection is required and external hosts may change or restrict image URLs. If an image host blocks an image, the profile retains its themed fallback styling.

DC characters, comic artwork, logos and trademarks belong to DC and their respective rights holders. This is an unofficial, non-commercial fan/student project and is not affiliated with or endorsed by DC or Warner Bros. Discovery.

## Project structure

```text
src/
  components/
    CharacterCard.jsx
    Footer.jsx
    GothamCanvas.jsx
    Navbar.jsx
    GothamTransition.jsx
  data/
    characters.json
    comics.json
  pages/
    CharacterDetail.jsx
    Gallery.jsx
    Home.jsx
    RobinHall.jsx
  App.jsx
  index.css
  main.jsx
public/
  favicon.svg
```


## Comic Vault

The `/comics` page contains a 146-title Batman and Bat-Family catalogue based on BatCave.biz title listings, Batman community reading guides and event chronologies. It includes 146 story and event cards, category filters, cover artwork with local Gotham-style image fallbacks, beginner reading paths and infinite-scroll loading, including 26 linked crossover and event chronologies.

Each comic card opens the matching BatCave title or series page. Where a direct first-issue reader URL was verified, the card opens that reader directly; crossover cards open their full chronological event page. The Comic Vault itself remains an infinite-scroll catalogue inside Gotham Archive, while comic pages and issue sequences are hosted by BatCave. No comic PDFs or page scans are downloaded, copied, embedded or stored locally by this project.

The BatCave title and event links include the Batman reading guide, comprehensive reading order, Post-Crisis guide and event sequences such as Knightfall, No Man's Land, War Games, Zero Year, Death of the Family, Fear State, Night of the Owls, Joker War, City of Bane, Bruce Wayne: Murderer? and Grant Morrison's Batman run. Availability, reader behavior and issue sequence are controlled by BatCave and may change.

Useful source indexes:
- https://batcave.biz/folder/11996/
- https://batcave.biz/folder/9956/
- https://batcave.biz/folder/12312/
- https://batcave.biz/folder/4217/
- https://batcave.biz/comix/

The film-era profiles are organized using DC's Batman live-action film chronology: https://www.dc.com/blog/2024/09/18/how-to-watch-batman-s-live-action-movies-in-order
