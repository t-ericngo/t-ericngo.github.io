# t-ericngo.github.io

Personal academic website of T. Eric Ngo (Anh-Tu Ngo), built with Jekyll on the
[AcademicPages](https://github.com/academicpages/academicpages.github.io) template.
Pushing to `master` rebuilds and publishes the site through GitHub Actions
(`.github/workflows/jekyll.yml`), usually within a minute or two.

## Where things live

| Page | Edit |
| --- | --- |
| About (home) | `_pages/about.md` |
| Research | one file per paper in `_research/` |
| Talks | one file per talk in `_talks/` |
| Teaching | one file per course in `_teaching/`; teaching interests are in `_pages/teaching.html` |
| CV | replace `files/NgoEric_CV.pdf`; set `cv_updated` in `_config.yml` |
| Sidebar (photo, bio, links) | `author:` section of `_config.yml` |
| Menu | `_data/navigation.yml` |
| Styles | `assets/css/custom.css` |

## Common updates

**Add a paper.** Copy any file in `_research/` (e.g. `us-versus-them.md`), rename it,
and edit the front matter. The abstract goes below the second `---`.

```yaml
---
title: "Paper title"
status: working        # published | under-review | working | ongoing  (= section)
order: 1               # position within the section
authors:               # full author list; a single author shows no author line
  - Anh-Tu Ngo
venue: ""              # journal (published papers)
year:                  # year (published papers)
link: ""               # DOI/article URL  -> "Link" button
replication: ""        # Dataverse URL    -> "Replication Data" button
open_access: false     # true -> "Open access" tag
---
Abstract text…         # -> "Abstract" button (leave empty to hide it)
```

When a paper is accepted, change `status` to `published` and fill in `venue`,
`year`, and `link`. Buttons appear only for fields that are filled in.

**Add a talk.** Add `_talks/YYYY-MM-DD-short-name.md` with `title`, `type`, `venue`,
`location`, and `date`. Use `paper: <file name in _research without .md>` to reuse a
paper's abstract, or write the abstract below the front matter. Put slides in
`files/` and set `slides: "/files/your-slides.pdf"` to show the Slides button.
A future date shows an "Upcoming" tag; `invited: true` shows "Invited".

**Add a course.** Add a file to `_teaching/` with `title`, `category` (`ta` or
`workshop`), `order`, and `meta` (e.g. `"Fall 2026"`). The text below the front
matter is the Summary.

**Update the CV.** Export the CV to PDF, save it as `files/NgoEric_CV.pdf`
(replacing the old one), and change `cv_updated` in `_config.yml`.

Direct links: every entry has an anchor that opens its abstract, e.g.
`https://t-ericngo.github.io/research/#us-versus-them`.

## Preview locally (optional)

```bash
bundle install
bundle exec jekyll serve -l -H localhost
```

Then open http://localhost:4000. Note that `_includes/base_path` uses `site.url`, so
for a local preview start the server with `--config _config.yml,_config.dev.yml`
where `_config.dev.yml` contains `url: "http://localhost:4000"`.

## Credits

Template: [AcademicPages](https://github.com/academicpages/academicpages.github.io), a fork of
[Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/) (MIT License).
The CV viewer uses [PDF.js](https://mozilla.github.io/pdf.js/) (Apache 2.0, `assets/pdfjs/`).
