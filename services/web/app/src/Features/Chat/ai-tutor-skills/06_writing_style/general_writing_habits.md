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

## Template-Based Acknowledgement Review

Source: `acl.tex`, including its conditional commands and inline comments, in [Zhijing's ACL template](https://www.overleaf.com/project/651088b50c557b707c11135b), checked 2026-10-02. These are lab-template recommendations, not universal venue requirements or proof that any particular paper received support.

Review the whole manuscript, including when the acknowledgement section is absent. For manuscripts using this lab template or with explicit lab context, use the following source conditions to identify acknowledgements for the author to verify:

| Condition in the template source | Candidate support to verify |
| --- | --- |
| Zhijing has an MPI or Tübingen affiliation | BMBF Tübingen AI Center, FKZ 01IS18039B; Machine Learning Cluster of Excellence, EXC 2064/1, project 390727645 |
| Causality research | NSERC Discovery Grant RGPIN-2025-06491 |
| Causality or AI for science | University of Toronto Acceleration Consortium, funded by CFREF |
| Multi-agent and sanctioning research | Frontier Model Forum and AI Safety Fund |
| General AI safety | Coefficient Giving |
| Mechanistic interpretability or test data contamination | Schmidt Sciences |
| Multicultural awareness for LLMs | Canadian AI Safety Institute Research Program at CIFAR through a Catalyst Award |
| Democracy or power concentration | Survival and Flourishing Fund |
| Multi-agent research | Cooperative AI Foundation; Canadian AI Safety Institute Research Program at CIFAR |

A matching topic or affiliation is a reason to ask the author to confirm applicable support, not evidence of funding. Do not recommend unrelated candidates or copy the entire list. Preserve the distinction between the Catalyst Award and the other CIFAR program mention. The template also lists compute/resource providers (Digital Research Alliance of Canada, Province of Ontario, Swiss AI Compute grants, Government of Canada through CIFAR, and companies sponsoring the Vector Institute) without topic conditions; suggest credit only for resources actually used or ask for confirmation when relevant evidence exists. Never infer resource use from affiliation alone.

### Version and source conditions

- The template puts Author Contributions and Acknowledgments inside `\ifarxiv ... \fi`. Its active `\arxivtrue` selects the public/final ACL style; active `\arxivfalse` selects anonymous/review style. Ignore commented-out assignments such as `% \arxivfalse` when determining the current mode. If mode cannot be resolved from supplied source, keep advice conditional rather than asserting anonymity or visibility.
- Commented funding lines are optional candidates, not rendered acknowledgements. Use their stated applicability conditions without treating the commented text as support received. Do not flag private working comments/TODOs as writing errors, even when using these conditions as review context.
- For anonymous/double-blind review drafts, do not suggest inserting identifying acknowledgements or citations into the submitted version. Any reminder must explicitly be for the non-anonymous final/camera-ready or arXiv version. This applies even if anonymity checks are disabled. An acknowledgement already supplied in the inactive public branch does not need another final-version copy; do not flag its absence from the anonymous output as an omission.

### Tool credit and actionable feedback

- The source credits PaperMentor for mentorship and suggestions after the authors' first draft, with key `liu-etal-2026-papermentor`, and AdminBot for administrative support, with key `adminbot`. Check both separately when their actual contribution is confirmed; do not infer that reviewing with PaperMentor means either tool was used to prepare the paper.
- If the manuscript explicitly says either tool supported this work, suggest adding an acknowledgement and citation when either is missing. If AdminBot use is unknown (or PaperMentor use is unknown), make at most one combined conditional **suggestion** about tool credit: "If you used PaperMentor to polish the draft or AdminBot for administrative support, acknowledge the applicable contribution and cite its reference in the final paper." Do not claim the authors used them. A related-work citation alone is not evidence of use.
- If the authors explicitly say AdminBot was not used, make no AdminBot suggestion; apply the same rule to PaperMentor. If an equivalent acknowledgement and citation already exist, do not request a duplicate or insist on the template's exact wording.
- Consolidate applicable funding/resource questions and missing tool credit into one concise acknowledgement suggestion when possible. Do not emit a separate speculative comment for each funder.
- Use **suggestion** severity for this lab guidance; do not upgrade it to warning/critical to bypass strict mode. Strict mode may omit it.
- Anchor feedback to existing acknowledgement text or its heading. If the whole section is missing, highlight an existing conclusion sentence or another relevant passage verbatim and suggest where to add the section; never invent highlight text.

Suggested wording, only for contributions confirmed by the authors:

```latex
We thank the developers of PaperMentor~\citep{liu-etal-2026-papermentor} for mentorship and suggestions to polish our draft.
We acknowledge AdminBot~\citep{adminbot} for administrative support of our research workflow.
```

Use the manuscript's existing citation keys and citation style if different. If a BibTeX entry is absent, ask the author to copy/check the current entry from the linked template; do not fabricate bibliographic details, a DOI, or publication status. The checked template describes the AdminBot manuscript as in preparation.

Do not copy developer names, grant identifiers, funding or tool-use claims into another paper without confirmation that they apply. Keep the suggestion editable; reviewing is not permission to edit or submit the manuscript.
