# CSE 213 — Software Engineering Term Final Notes

📘 **Read online: [tj-paul.github.io/CSE213-SWE-TF](https://tj-paul.github.io/CSE213-SWE-TF/#/)**

Study notes for the BUET CSE 213 term final, covering IJ ma'am's and AI sir's slides. They include design patterns, SOLID, UML, testing, refactoring, process models and ethics, plus full solutions of the 2023-24 and 2022-23 term finals.

Start with **00 Start Here**, which gives the study order. Read the **TF Solves** folder last, as a final check.

## Reading offline

1. Download the repo: **Code → Download ZIP** on GitHub, then unzip it. You can also use `git clone`.
2. Open a terminal in the unzipped folder and start a small local server:

   ```bash
   python3 -m http.server
   ```

3. Open **http://localhost:8000** in your browser. Press Ctrl+C in the terminal when you're done.

Double-clicking `index.html` won't work, because browsers block a page opened from disk from reading the notes. The first visit also needs internet, to load fonts and the diagram library.

## Updating the site

After editing a note, just commit and push. The site updates in a minute or two.

If you **add, rename or delete** a note, rebuild the note list before committing:

```bash
python3 build-site-index.py
```

Then commit the updated `notes.json` along with your notes.
