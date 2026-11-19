# SBPS homepage mockups

Three homepage design options for the Social Baluni Public School website, ready for GitHub Pages.

- `index.html`: landing page that links to the three options
- `option-a.html`: A · Campus first
- `option-b.html`: B · Open split
- `option-c.html`: C · Crimson house
- `assets/`: photos, crest, preview thumbnails, and the background video script

These are mockups of the homepage only. Menus, links and forms are not connected.

## Publish on GitHub Pages

1. Create a new GitHub repository, for example `sbps-mockups`.
2. Upload everything in this folder to the root of the repository, including the hidden `.nojekyll` file.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then **Save**.
5. After a minute or two, the site is live at `https://<your-username>.github.io/sbps-mockups/`.

From the command line, inside this folder:

```bash
git init
git add .
git commit -m "Add SBPS homepage mockups"
git branch -M main
git remote add origin https://github.com/<your-username>/sbps-mockups.git
git push -u origin main
```

## Background video

The hero sections play a muted, looping YouTube video. To add more videos, open `assets/hero-video.js` and add YouTube video IDs to the list at the top:

```js
const HERO_VIDEOS = ['4ygbcVKNL9Q', 'NEXT_VIDEO_ID'];
```

The ID is the part after `watch?v=` in a YouTube link. The videos play in order and loop.

- The video plays only when the page is served over the web (GitHub Pages, or a local server). Opening the HTML file directly from disk shows the still photo instead, because YouTube blocks embeds without a web address.
- Each video must allow embedding (YouTube Studio → video → Show more → Allow embedding).
- Visitors with "reduce motion" turned on see the still photo. A pause button sits in the top-right corner of the video.

## Viewing

The option pages are responsive: desktop, tablet and phone layouts, with a menu button on smaller screens.

To preview locally:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.
