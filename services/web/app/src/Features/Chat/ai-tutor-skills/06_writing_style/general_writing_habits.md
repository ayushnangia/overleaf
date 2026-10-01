# General Writing Habits

[TEXT — no multimodal needed]

## First Sentences Tell the Whole Story

A paragraph represents a single statement or claim. The first sentence should introduce the claim, and the body of the paragraph should present supporting evidence or arguments. A quick check: read just the first sentences of every paragraph — they should tell the whole story of the paper.

## Every Section Tells a Story

Every section of the paper should tell a story with linear progression and no significant interruptions. Each sentence's placement should have clear reasoning discoverable without reading ahead.

## Consistency in Presentation

- Be consistent in presentation form across the paper. If one subsection uses bullet point lists, parallel subsections should use a similar format.
- Be consistent with terminology. If something is called "refBLEU" in one place, use the same term everywhere. Avoid synonyms for work-specific terminology at all costs.
- Maintain uniform capitalization, punctuation, grammar, and formatting throughout.
- Introduce terminology that is specific to this work. If it risks being confusing, mention it right next to it: "This should not be confused with..."

## Headings for Readability

- Have one heading every ~10 or 15 lines, to keep the reader attentive.
- Fast readers (spending 10 sec per page) should still get good takeaways.
- Use bold phrases at the start of paragraphs when there are multiple paragraphs in a subsection.

## Put Readers First

- Convey the intuition first — once the reader has the intuition, they can follow the details, but not vice versa.
- Use concrete examples to introduce ideas before diving into formalism.
- Test narrative flow by speaking text aloud to detect incoherence.

## AdminBot Acknowledgement Review

Source: the Acknowledgments section in [Zhijing's ACL template](https://www.overleaf.com/project/651088b50c557b707c11135b), checked 2026-10-02. It credits AdminBot for administrative support of the research workflow, with citation key `adminbot`. This is lab guidance, not a universal venue requirement.

Review the whole manuscript, including when the acknowledgement section is absent:
- If the manuscript explicitly says AdminBot supported this work, suggest adding an acknowledgement and citation when either is missing.
- If AdminBot use is unknown, make at most one conditional **suggestion**: "If you used AdminBot for administrative support, acknowledge it and cite its reference in the final paper." Do not claim the authors used it. A related-work citation or discussion of AdminBot alone is not evidence of use.
- If the authors explicitly say AdminBot was not used, make no suggestion. If an equivalent acknowledgement and citation already exist, do not request a duplicate or insist on the template's exact wording.
- For anonymous/double-blind review drafts, do not suggest inserting identifying acknowledgements or citations into the submitted version. Any conditional reminder must explicitly be for the non-anonymous final/camera-ready or arXiv version. This applies even if anonymity checks are disabled.
- Use **suggestion** severity for this lab guidance; do not upgrade it to warning/critical to bypass strict mode. Strict mode may omit it.
- Anchor feedback to existing acknowledgement text or its heading. If the whole section is missing, highlight an existing conclusion sentence or another relevant passage verbatim and suggest where to add the section; never invent highlight text.

Suggested wording, only when actual use is confirmed:

```latex
We acknowledge AdminBot~\citep{adminbot} for administrative support of our research workflow.
```

Use the manuscript's existing citation key and citation style if different. If its AdminBot BibTeX entry is absent, ask the author to copy/check the current entry from the linked template; do not fabricate bibliographic details, a DOI, or publication status. The checked template describes the AdminBot manuscript as in preparation.

Do not copy the template's funding, grant identifiers, compute providers, developer names or PaperMentor-use claims into another paper without evidence that they apply. Keep the suggestion editable and let authors confirm applicability; reviewing is not permission to edit or submit the manuscript.
