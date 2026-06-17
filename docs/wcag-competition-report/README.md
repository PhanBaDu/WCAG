# WCAG Competition Report

## Files
- `main.tex`: XeLaTeX report template for the WCAG 2.2 competition.
- `outline.md`: working outline that matches the 7-part report structure.
- `usecases/`: Mermaid files for the core business use cases and accessibility flow.

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
- The report now follows the 7-part structure from the outline.
- Add screenshots to the appendix before the final submission if you want the PDF to be fully illustrated.
- The Mermaid use case files are separated by actor so they can be rendered independently or embedded later.
