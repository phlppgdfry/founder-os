# Founder OS

A Dutch personal workspace for a solo founder: focus (maximum three products), tasks, portfolio search and status filters, a decision journal, and weekly reviews.

The public workspace starts with **fictional demonstration data**. All edits and imported files stay in the browser's localStorage. There is no backend, telemetry, account system or automatic sync. GitHub receives normal page requests. Local storage is unencrypted and accessible to anyone using the same browser profile. Browser data deletion removes the workspace; use **Back-up downloaden** regularly.

## Run

Serve this directory with any static HTTP server. No dependencies or build step:

```sh
python3 -m http.server 8787 --bind 127.0.0.1 --directory .
```

Open http://localhost:8787. The app works at a GitHub Pages project subpath. JavaScript is required.

## Private Founder Brain import

In the private Founder Brain repository run `just dashboard-export`, then import `tmp/founder-dashboard.json` through the app. This exports a read-only snapshot, not approval permissions. Import **replaces** the current workspace, so download a backup first. New private exports do not contain browser-only tasks or reviews.

Never copy `tmp/`, databases, internal documents or exports into this directory or the public repository. Only this directory's app files may be published. Metrics keep their original source and observation dates; export time is not collection time. Empty metrics indicate missing data, not zero revenue or healthy systems.

## Backup format

JSON version 1 has `mode` (`demo`/`private`), `generated_at` (ISO timestamp), `products`, `tasks`, `decisions`, `reviews`, and `snapshot` arrays (`metrics`, `alerts`, `health`, `approvals`, `deadlines`). Imports validate the version, dates, identifiers, product references, statuses, array sizes and focus limit before replacing data; the file limit is 5 MB. Text is rendered as escaped text, never imported HTML.

Approvals remain read-only. The decision journal does not execute actions or approve policy requests. Complete those in the original Founder Brain workflow.
