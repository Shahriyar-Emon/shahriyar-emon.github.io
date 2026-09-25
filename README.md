# Md. Shahriyar — Portfolio

A personal portfolio site built around the theme **"My Journey as a CSE Student"** —
who I am, what I'm learning, what I'm building, and where I'm going.

## Project structure

```
portfolio/
├── index.html            Page structure (mostly empty containers — content is injected by JS)
├── css/
│   ├── style.css         Layout, colors, typography, responsive rules
│   └── animations.css    Keyframes + scroll-reveal system
├── js/
│   ├── data.js            ← EDIT THIS to change any content
│   ├── main.js            Renders data.js into the page, nav + form logic
│   └── animations.js      Cursor, scroll reveal, particles, tilt, parallax
├── images/
│   └── profile.jpg        ← put your photo here
└── README.md
```

## How to edit things

Everything you're likely to want to change lives in **`js/data.js`**, inside the
`portfolioData` object. You don't need to touch any HTML, CSS, or animation code
for the changes below.

### 1. Add your photo
Save your photo as `images/profile.jpg` (exact filename). If you'd rather use a
`.png`, update the `profileImage` path in `data.js` **and** the `<img src="...">`
in `index.html`'s hero section to match.

### 2. Change your name
In `js/data.js`, edit:
```js
name: "Sakib Mirza",
```

### 3. Change your social links
In `js/data.js`:
```js
social: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "mailto:you@example.com",
},
```

### 4. Add a project
In `js/data.js`, add a new object to the `projects` array:
```js
{
  number: "02",
  title: "Your Project Name",
  description: "One or two sentences about what it does.",
  technologies: ["Python", "SQL"],
  github: "https://github.com/you/repo",
  demo: "", // leave empty if there's no live demo
},
```

### 5. Remove a project
Delete its object from the `projects` array in `js/data.js`.

### 6. Add a skill
Add a string to the relevant category in the `skills` object, e.g.:
```js
web: ["HTML", "CSS", "JavaScript", "React"],
```

### 7. Update your journey timeline or learning board
Edit the `journey` array (each item has a `status` of `"done"`, `"current"`,
or `"future"`) and the `learningBoard` object in `js/data.js`.

## How the animation system works

- **`css/animations.css`** defines all keyframes and a reusable `.reveal` class.
  Any element with `class="reveal" data-reveal="fade-up|fade-left|fade-right|scale"`
  starts hidden and animates in once it scrolls into view.
- **`js/animations.js`** uses `IntersectionObserver` to add `.is-in` to `.reveal`
  elements as they enter the viewport (this is what actually triggers the CSS
  transition). It also drives the custom cursor, mouse-follow hero glow,
  magnetic buttons, project card tilt, particle drift, and the timeline's
  progressive line-fill.
- Everything respects `prefers-reduced-motion`: if a visitor has that OS setting
  on, reveals appear instantly and decorative motion (particles, spinning photo
  border, blinking dot) is turned off.
- The custom cursor and particle system are automatically disabled on touch
  devices.

### Changing animation speed
Open `css/animations.css` and change this at the top:
```css
:root {
  --anim-speed: 1; /* 1.5 = 50% slower, 0.7 = 30% faster */
}
```

## Running locally

No build step or dependencies — it's plain HTML/CSS/JS.

1. Open the `portfolio` folder.
2. Double-click `index.html`, **or** for best results (so relative paths and
   fonts behave), serve it locally:
   ```bash
   cd portfolio
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push the contents of this `portfolio`
   folder to it (the `index.html` should be at the repo root, or in a `/docs`
   folder if you prefer).
2. On GitHub, go to **Settings → Pages**.
3. Under **Source**, choose the branch (usually `main`) and the folder
   (`/root` or `/docs`).
4. Save. GitHub will give you a URL like
   `https://yourusername.github.io/your-repo-name/` within a minute or two.

### Deploying elsewhere
This is a static site (no server code), so it also works as-is on Netlify,
Vercel, or Cloudflare Pages — just point any of them at this folder and deploy.

## Notes

- The contact form is fully styled and functional in the browser but is **not**
  wired up to actually send email yet — connect it to a service like
  Formspree, EmailJS, or your own backend when you're ready.
- All content on the site reflects an actively-learning CSE student — no
  fabricated work experience, certifications, or fake stats are included by
  design. Keep it that way as you grow the site: update `data.js` as your
  real skills and projects grow.
