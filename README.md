# Founder OS

A Dutch workspace for a solo builder: product focus, tasks, a GitHub workbench, decisions, and weekly reviews with evidence. Try the [public demo](https://phlppgdfry.github.io/founder-os/).

## Run locally

```sh
python3 -m http.server 8787 --bind 127.0.0.1 --directory .
node --test contract.test.cjs
```

Open http://localhost:8787. No install or build is needed. JavaScript is required. The app also works at a GitHub Pages project subpath.

## GitHub workbench

The workbench separates products, portfolio/career cases, learning, personal tools and other work. Search by name, description or primary language; filter by category, watchlist, visibility, archives or forks. Follow repositories and create a linked next-step task. Watchlist choices never alter repository settings on GitHub.

In the **private Founder Brain repository**, run:

```sh
just dashboard-github     # existing gh login; all owned repositories, fully paginated
# or
just dashboard-export     # offline: product register and existing DuckDB snapshot only
```

Import `tmp/founder-dashboard.json` using **Importeren**. GitHub identity must match the configured owner; the app never asks for or stores a GitHub token. The export selects metadata only: no source code, issue bodies, collaborator permissions or approval payloads. Real API data and the source report remain private.

Counts come from `analytics/github-workspace.sql` through `brain.github_workspace`. Recent-work counts exclude archives and forks and use the fetch timestamp, never import time. Categories reuse the product register and explicit/name rules. Those rules are adjustable approximations. A push is not a work hour, a release, revenue, customer value or evidence of skill.

## Refresh without losing work

**Brongegevens verversen** refreshes source metadata while preserving browser tasks, product focus, the watchlist, existing decisions and weekly reviews. It keeps products still referenced by old tasks, adds newly imported decisions, and retains the previous GitHub snapshot when an offline export contains none. Existing decision entries win on ID conflicts. New imports do not auto-select your focus or perform approvals.

**Workspace volledig vervangen** restores the chosen backup exactly. Defaults: private-to-private import refreshes; other imports replace. Inspect the choice before confirming. Import is validated before any state changes. Download a backup before replacing a workspace.

Tasks can be edited, filtered or completed. A deleted task can be restored with **Ongedaan maken** for ten seconds. Weekreviews can include a concrete test result, demo, release or customer response as evidence.

## Storage and privacy

The public workspace contains fictional data only. Workspace changes and imports stay in browser localStorage; there is no backend, analytics, account or automatic sync. GitHub receives normal page requests. Storage is unencrypted and accessible to others using the same browser profile. Different browsers, devices and site addresses have separate workspaces. Clearing browser data removes your work. Use **Back-up downloaden** regularly and keep backups private.

Browser changes do not write back to DuckDB or GitHub. Approval requests are read-only. Never copy `tmp/`, exports, databases, internal documents or real inventory data into this directory or the public repository. Only explicitly selected app assets are deployed by the Pages workflow.

## Backup compatibility

Version 1 backups remain supported. Fields: `version`, `mode`, `generated_at`, `products`, `tasks`, `decisions`, `reviews`, `snapshot`; optional `github`, `watchlist`, task `repository`, and review `evidence`. Import validates dates, identifiers, product references, statuses, array limits, GitHub owner/URLs, counts and the three-product focus limit. Limit: 5 MB. Imported text is escaped; repository links must be exact HTTPS github.com owner/repo URLs.

Metrics retain their own source and observation dates. Export time is not collection time. Empty data does not mean zero revenue or healthy systems. Authentication and missing external integrations remain in Founder Brain's setup checklist.
