# Math Logic Hub · 25 Visual Glossaries

A responsive, local-first geometry studio following the supplied Visual Glossary archive: restrained blue/white styling, 9:16 cards, a prominent mathematical feature, and title → term → definition → four real-life connections → recap → outro.

## Collection

The original six archived terms are preserved: Radius, Chord, Diameter, Circumference, Arc and Semicircle. Nineteen proposed additions complete entries #007–#025: Sector, Circular segment, Tangent, Secant, Point, Line, Line segment, Ray, Angle, Acute angle, Right angle, Obtuse angle, Straight angle, Reflex angle, Perpendicular lines, Parallel lines, Triangle, Quadrilateral and Polygon.

Browse/search all 25 entries, filter by topic, preview every card, select one of ten template directions, edit production briefs, and save independent per-term drafts. Download an individual 9:16 SVG, a complete term ZIP, or all 225 sheets with project JSON, prompt briefs and descriptions. Collection JSON backup/restore preserves browser edits. Older single-project backups still work.

The SVG sheets are deterministic mathematical diagrams and layouts, not photographs or reconstructions of the missing original images. Real-life objects are specified in the editable production briefs. Exports are drafts, and approval is never inferred from the archive. No voiceover is invented.

## Run and validate

Use the existing checkout; no additional worktree is needed. No dependency installation or API key is required.

```sh
cd /workspace/MHL143
npm test
npm start
```

The server uses port 8000. Serve over HTTP; direct HTML file opening cannot load JavaScript modules. Restart the server in new sessions. Browser QC covers library navigation, filters, all 225 card previews, independent term editing, reload persistence, collection backup/restore, SVG and ZIP downloads, invalid imports, template selection, and mobile overflow.

## Publish

GitHub Actions tests and publishes only the public app assets to GitHub Pages on pushes to `main`. Pages should be configured with **GitHub Actions** as the source. Expected site: `https://dushendra1986.github.io/MHL143/`. Deployment readiness is determined by the current workflow result and HTTP/browser validation, not by the URL alone.

## Data and review boundaries

Drafts stay in this browser's localStorage; storage is unencrypted, limited and can be cleared. Export collection backups. Do not enter secrets or sensitive personal information on a shared browser. No analytics, remote fonts, AI service or cloud source uploads are required.

Imports are schema-validated and rendered as text. Source uploads support bounded text, Markdown and CSV only. PDF/image analysis and access to private ChatGPT history are not provided. App quality checks detect incomplete fields and unset review flags; they cannot certify mathematical truth or rendered fidelity. Edited content resets relevant review gates. Template changes reset production statuses. Exported prompts include outstanding checks and exact speech, or explicit silence.

See ARCHIVE_ANALYSIS.md for original source coverage and QC.md for validation evidence. The raw private chat archive is not published in this repository. New entries #007–#025 are authored continuations, not claims about additional approved archive content.
