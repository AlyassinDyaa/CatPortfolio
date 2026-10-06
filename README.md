# Catarina Silva — website

Portfolio site for the artist, illustrator and animator Catarina Silva ([@catherinejsart](https://www.instagram.com/catherinejsart/)),
with her shop on [Ko-fi](https://ko-fi.com/catherinejsart).

Built with Vite, React 19, React Router, Framer Motion and Lenis. Fonts are bundled with the site.
Content is edited through an admin panel at `/admin` (see below).

## Run it

```
npm install
npm run dev        # http://localhost:5176
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: her name in cut-out letters on a band of pink gingham, a pile of three prints on a paper doily (they can be picked up and moved with a mouse), a moving strip of pink tape, what is on her desk right now, the latest pieces on a sheet of stickers, the shop as photocards with the discount code on a ticket, step-by-step comparisons, commissions, events |
| `/work` | Every piece as a print with a white edge, with category filters; a piece opens large with its details |
| `/gallery` | Pictures in sections, each a page of the scrapbook, shown uncropped; four layouts to switch between |
| `/commissions` | The offers as a spread of tarot cards, how it works as numbered sticky notes, and where to ask |
| `/about` | Her story as diary entries, a slam-book page of answers, and where to find her |
| `/contact` | A note on lined paper, email and social links. With no contact email set, the form copies the message and opens Instagram |

## Edit the content: the admin panel

The site is edited at **`/admin`** (for example `https://your-site.com/admin/`).
It is a content manager (Decap CMS) that saves every change as a commit to this repository.
The site rebuilds itself about a minute later. No code involved.

The panel is the site's own backstage in its night look (`public/admin/admin.css`): plum paper,
pink pen, Shrikhand and DM Sans, with the fonts kept beside it in `public/admin/fonts/`.

| Section | What you control |
|---|---|
| Work | Every piece: picture, title, category, date, link to the post or shop page, a note, whether it is on the home page and in which place |
| Gallery | Sections of the gallery page and the pictures in each. A section can also fill itself from a category of Work, so a piece is only uploaded once |
| Step by step | Sets of one piece at each stage (sketch, lines, colours), or an old drawing next to its redraw |
| Events | Markets, conventions and signings, with dates and where to find her |
| Home page | The words at the top, the pink tape, what is on the desk right now, and **the shop**: what is sold, the discount code, the shop link and the products shown as photocards (name, picture, price, link) |
| Work and Gallery, Commissions, About, Contact pages | The words on each page. Commissions also holds open or closed, the offers and prices, and where "Get a quote" goes; About holds the diary entries and the slam-book answers |
| Name and contact | Site name, tagline, logo, email, social links, footer text |
| Show or hide | Switch whole pages, dark or light mode, or parts of the home page (the shop included), on and off |

Pictures upload straight from the panel into `public/uploads/`. Every piece, gallery section, set
and event also has a **Hide from the site** switch, which takes it off the site without deleting it.

### Get a quote

Every offer and quote button goes to her Instagram (the Instagram link under **Name and contact**).
Commissions page → *Where the quote button goes* sends them somewhere else. With no contact email and
no form service set, the request and contact forms are replaced by a button to Instagram as well.

### The pictures on the home page

Pieces ticked **Show on the home page** fill it. **Place on the home page** orders them: 1 is the
print on top of the pile beside her name, 2 and 3 the ones under it; 4 to 9 are the stickers of
"Latest". The "On the desk right now" block counts the pieces of the category it is named after
(name it "Inktober" and it shows how many Inktober pieces are drawn so far).

### Editing on this computer

```
npm run dev
```

Then open http://localhost:5176/admin/ and edit; changes land directly in `content/`.
(`npm run dev` also starts the small helper the panel saves through, on port 8084.)

### Editing files by hand

Everything the panel edits is plain JSON under `content/`. Editing those files and pushing
has the same effect as using the panel.

## Design

- The site is Cat's scrapbook, after the covers of her reels: headings are letters cut from magazines, each on its own scrap of paper in its own face and angle (`components/Ransom.jsx`), and pictures are prints, die-cut stickers and photocards stuck down with washi tape (`components/Print.jsx`).
- It opens in a **light** look: a white page with pink dots, bands of pink gingham with a lace trim at the top of every page and in the footer, pastel scraps (pink, lilac, butter, sky, mint) and one red pen (`--berry`) for buttons and small writing. The switch in the top bar turns it to night: the same pinks on plum paper. The visitor's choice is remembered in their browser.
- Type: Shrikhand for headings, DM Sans for reading, Caveat for handwriting; the cut-out letters also use Abril Fatface, Alfa Slab One, Anton and Special Elite.
- Tokens for both themes are at the top of `src/styles/global.css`.
- Commission offers are tarot cards; the steps are sticky notes; the About facts are a slam-book page.
- The shop's discount code is a ticket: a tap copies it.
- Buttons that ask for a commission open her Instagram, where quotes are given (`components/QuoteLink.jsx`).
- Everything respects `prefers-reduced-motion`: smooth scroll, the opening sheet and the moving tape switch off.

## Deploy on Vercel (site and admin)

`vercel.json` holds the build settings and routing, so the site itself needs no setup:

1. On vercel.com: **Add New → Project**, import this GitHub repository, press **Deploy**.

The admin at `/admin/` needs two values. It logs in with **a passcode you choose**, and the site
saves changes to GitHub with **a token of its own** (the small files in `/api`). Nobody logging
in needs a GitHub account.

2. Make the token, once, with the GitHub account that owns this repository:
   **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new
   token**. Repository access: **Only select repositories** → this repository.
   Permissions → Repository permissions → **Contents: Read and write**. Generate and copy it.
3. On Vercel: project **Settings → Environment Variables**, add
   `ADMIN_PASSCODE` (the passcode: long and hard to guess, 12 characters or more) and
   `GITHUB_TOKEN` (the token from step 2), then **Deployments → Redeploy**.

To change the passcode later, change `ADMIN_PASSCODE` on Vercel and redeploy; everyone is
logged out and uses the new one. A login lasts a week. Pictures uploaded through the admin on
Vercel can be about 3 MB at most.

Every **Save** in the admin is a commit to the branch the site was built from; Vercel rebuilds
and the change is live about a minute later. In a browser that is logged in to the admin, the
site shows anything saved since its last build straight away (`api/content.js`).

Any other static host works for the site itself: build command `npm run build`, output directory
`dist`, SPA fallback to `index.html`. On Netlify the admin can use Netlify Identity with Git
Gateway instead of the passcode (`netlify.toml` is included).
