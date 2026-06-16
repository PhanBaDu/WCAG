# WCAG Competition Report

## Files
- `main.tex`: XeLaTeX report template for the WCAG 2.2 competition.
- `outline.md`: editable report outline that follows the seven-part structure in the brief.

## Build
Run the following from this folder on a machine with XeLaTeX installed:

```bash
xelatex main.tex
xelatex main.tex
```

If you use `latexmk`:

```bash
latexmk -xelatex main.tex
```

## Notes
- The document is written in Vietnamese Unicode.
- It is designed as a polished competition report for the current project.
- Update the title, team information, screenshots, and submission details before exporting the final PDF.
- If you want a faster draft workflow, fill `outline.md` first, then sync the content into `main.tex`.
