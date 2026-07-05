# Adding your project files

This folder is served directly by the website — anything you put here can
be linked to, viewed, or downloaded from a project card on the site.

## How the project cards work

Each project can have:
- `image` — the branded cover graphic shown on the card grid (not a doc screenshot)
- `docViews` — one or more real page-render images shown when someone clicks
  "View" on the card (a lightbox, with a Download button alongside it)
- `file` — the actual downloadable file
- `note` — shown instead of buttons for "capability" projects that don't have
  a file (e.g. work done directly in Jira or in-app, with no standalone doc)

## Adding a project with a real file

1. Drop the file in here, e.g. `/public/projects/my-file.docx`
2. Generate a doc-view preview (what people see when they click "View"):
       soffice --headless --convert-to pdf my-file.docx
       pdftoppm -jpeg -r 120 -f 1 -l 2 my-file.pdf docviews/my-file-doc
   This makes `my-file-doc-1.jpg`, `my-file-doc-2.jpg`, etc. Put them in
   `/public/projects/docviews/`.
3. (Optional) generate a branded cover graphic for the card grid — see
   `gen_covers.py`-style scripts if you want the same look, or just use a
   screenshot/mockup image.
4. In `lib/portfolio-data.ts`, add an entry to the `projects` array:
   - `image`: `/projects/my-cover.jpg`
   - `docViews`: `['/projects/docviews/my-file-doc-1.jpg', '/projects/docviews/my-file-doc-2.jpg']`
   - `file`: `{ path: '/projects/my-file.docx', label: 'Download (DOCX)' }`

## Adding a "capability" project with no file

Some real work (Jira process design, in-app automation, live dashboards)
doesn't have a document to attach. For these, set `file: null` and add a
short `note` instead — it'll display in place of the buttons, e.g.:

    note: 'Lives in Jira as the live process, not a static document.'

That's it — the card, viewer, download button, and note all update
automatically from that one data file. No other code needs to change.
