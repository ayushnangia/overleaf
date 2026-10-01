// Run: node --experimental-vm-modules app/src/Features/Chat/test_adminbot_acknowledgement.mjs
// Offline integration check: SDK/schema imports and LLM responses are stubbed.
// This verifies prompt wiring, missing-section coverage, mapping and strict-mode
// filtering, not whether a real model follows the acknowledgement policy.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import vm from 'node:vm'

const moduleUrl = new URL('./AiTutorReviewOrchestrator.mjs', import.meta.url)
const source = fs.readFileSync(moduleUrl, 'utf8')
const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'adminbot-ack-review-'))
const highlightText = 'This work studies a synthetic benchmark.'
const fixtures = [
  String.raw`\section{Conclusion}
This work studies a synthetic benchmark.`,
  String.raw`\author{Anonymous Authors}
\section{Conclusion}
This work studies a synthetic benchmark.`,
  String.raw`\section{Conclusion}
This work studies a synthetic benchmark.
\section*{Acknowledgments}
We acknowledge AdminBot~\citep{customAdminBotKey} for administrative support.`,
  String.raw`\newif\ifarxiv
% \arxivfalse
\arxivtrue
\section{Conclusion}
This work studies a synthetic benchmark.
\ifarxiv
\section*{Acknowledgments}
We acknowledge AdminBot~\cite{adminbot}.
\fi`,
  String.raw`\newif\ifarxiv
% \arxivtrue
\arxivfalse
\section{Conclusion}
This work studies a synthetic benchmark.
\ifarxiv
\section*{Acknowledgments}
We acknowledge PaperMentor~\cite{liu-etal-2026-papermentor}.
\fi`,
  String.raw`\section{Conclusion}
This work studies a synthetic benchmark.
We study causality, mechanistic interpretability, and multi-agent sanctioning.
% by NSERC Discovery Grant RGPIN-2025-06491; % for causality research`,
]

try {
  for (const strict of [false, true]) {
    const calls = []
    const context = vm.createContext({
      console: { log() {}, warn() {} }, clearTimeout,
      setTimeout: (...args) => setTimeout(...args).unref(),
      process: { env: {
        OPENAI_API_KEY: 'offline-test-only',
        AI_TUTOR_STRICT_MODE: String(strict),
        AI_TUTOR_SKIP_SOURCE_COMMENTS: 'true',
        AI_TUTOR_SKIP_ANONYMITY: 'true',
      } },
    })
    // Schemas are unused by this LLM stub; retain the production module intact.
    const schema = new Proxy(() => schema, { get: () => schema })
    const sdk = {
      '@ai-sdk/openai': { createOpenAI: () => model => model },
      zod: { z: schema },
      ai: { generateObject: async options => {
        if (options.system.startsWith('You are a paper type classifier')) {
          return { object: {
            paperType: 'other', paperTypeSummary: 'Synthetic test paper',
            sectionAssignments: [], typeSpecificGuidance: {},
          } }
        }
        if (!options.system.startsWith('You are the "Writing Style Reviewer"')) {
          return { object: { comments: [] } }
        }
        calls.push(options)
        return { object: { comments: [
          { highlightText, comment: 'If you used AdminBot, acknowledge it in the final paper.', severity: 'suggestion' },
          { highlightText: 'A heading that is absent', comment: 'Invalid anchor', severity: 'suggestion' },
        ] } }
      } },
    }
    const module = new vm.SourceTextModule(source, {
      context, identifier: moduleUrl.href,
      initializeImportMeta: meta => { meta.url = moduleUrl.href },
    })
    await module.link(async specifier => {
      const exports = sdk[specifier] ?? await import(specifier)
      return new vm.SyntheticModule(Object.keys(exports), function () {
        for (const [key, value] of Object.entries(exports)) this.setExport(key, value)
      }, { context })
    })
    await module.evaluate()
    for (const tex of fixtures) {
      fs.writeFileSync(path.join(cacheDir, 'merged.tex'), tex)
      const result = await module.namespace.runFullReview({
        projectId: 'synthetic', model: 'offline', cacheDir,
        docContentMap: { 'main.tex': tex }, rootDocPath: 'main.tex',
      })
      const { system, prompt } = calls.at(-1)
      assert.ok(prompt.endsWith(tex), 'full manuscript reaches the reviewer even without acknowledgements')
      for (const rule of [
        '## Template-Based Acknowledgement Review', 'If AdminBot use is unknown',
        'RGPIN-2025-06491', 'CFREF', 'Frontier Model Forum',
        'Coefficient Giving', 'Schmidt Sciences', 'Catalyst Award',
        'Survival and Flourishing Fund', 'Cooperative AI Foundation',
        '01IS18039B', '390727645', 'Digital Research Alliance of Canada',
        'not evidence of funding', 'Ignore commented-out assignments',
        'inactive public branch', 'liu-etal-2026-papermentor',
        'AdminBot was not used', 'equivalent acknowledgement and citation',
        'anonymous/double-blind', 'non-anonymous final/camera-ready',
        'never invent highlight text', 'do not fabricate bibliographic details',
        'do not upgrade it to warning/critical',
      ]) assert.ok(system.includes(rule), `missing review instruction: ${rule}`)
      assert.equal(result.summary.total, strict ? 0 : 1)
      if (!strict) {
        const comment = result.commentsByDoc['main.tex'][0]
        assert.equal(comment.highlightText, highlightText)
        assert.equal(comment.category, 'writing_style')
        assert.equal(comment.severity, 'suggestion')
        assert.ok(comment.comment.includes('[Writing Style Reviewer]'))
      }
    }
    assert.equal(calls.length, fixtures.length)
  }
  console.log('Template acknowledgement prompt integration: 12 cases passed')
} finally {
  fs.rmSync(cacheDir, { recursive: true, force: true })
}
