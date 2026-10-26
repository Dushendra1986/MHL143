# Math Logic Hub · Visual Glossary Studio

A responsive, local-first static app for defining mathematical concepts, collecting text references, planning scenes, reviewing production readiness, and exporting project backups and standalone image/video prompt templates. No backend, API key, dependency installation or AI service is required.

## Run and check

Use the existing checkout; no extra worktree is needed.

```sh
cd /workspace/MHL143
npm test
npm start
```

Serve over HTTP; opening the HTML directly from disk does not support the JavaScript modules. The server uses port 8000. Check that the page renders, add a source and scene, and round-trip an exported JSON backup. Processes need restarting in new sessions.

## Publish

The GitHub Actions workflow tests and deploys only the five public app assets to GitHub Pages on pushes to `main`. In repository Settings → Pages select **GitHub Actions** as the source, then run the workflow if needed. Pages availability depends on repository visibility and account plan. Never add private sources or chat exports to the public repository. If deployment succeeds the conventional URL is `https://Dushendra1986.github.io/MHL143/`; verify it before sharing as live.

## Data and review boundaries

Data stays in this browser's localStorage, which is not encrypted and can be cleared. Use JSON exports for backups. Do not store secrets or sensitive personal information on a shared browser. No remote fonts, analytics, API requests, or uploaded reference files are required. Project imports are schema-validated and displayed as text, never inserted as HTML. Source uploads accept bounded plain-text, Markdown and CSV files only. PDF, image and private ChatGPT history analysis are not implemented.

Quality checks detect incomplete fields and review flags; they do not establish mathematical truth or rendered fidelity. Production status is a manual record, not evidence of generation. Editing concept or scene content resets approval records. Prompt exports include outstanding checks and preserve exact speech; empty speech produces a silent scene.

The supplied Visual Glossary chat archive has been reviewed. Six numbered term presets, ten selectable template directions, per-card 9:16 schematic SVG downloads, and description exports now follow its workflow. See ARCHIVE_ANALYSIS.md for source coverage and limitations. The original generated images were not embedded in that archive; the templates are new schematic interpretations. The reference storyboard URL returned proxy HTTP 403, so exact design parity remains unverified. The perpendicular example remains illustrative.

Existing version 1 project backups migrate with the new template and feature review gates unset. Approval is never inferred from the archive.
