import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const toolRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(toolRoot, '../..');
const resultsPath = join(toolRoot, 'results/baseline-results.json');
const catalogueSignatures = [
    '.sap-icon--accept:before',
    '.sap-icon-TNT--exceptions:before',
    '.sap-icon-businessSuiteInAppSymbols--3D:before'
];
const maxInitialRawBytes = 460_000;
const expectedInitialProbes = [
    { testId: 'fd-sap-icon', fontFamily: 'SAP-icons', content: String.fromCharCode(0xe05b) },
    { testId: 'fd-tnt-icon', fontFamily: 'SAP-icons-TNT', content: String.fromCharCode(0xe00d) },
    { testId: 'fd-business-suite-icon', fontFamily: 'SAP-icons-Business-Suite', content: String.fromCharCode(0xe0ff) },
    { testId: 'raw-sap-icon', fontFamily: 'SAP-icons', content: String.fromCharCode(0xe05b) }
];
const expectedLazyProbes = [
    ...expectedInitialProbes,
    { testId: 'lazy-sap-icon', fontFamily: 'SAP-icons', content: String.fromCharCode(0xe00d) }
];

function assertBrowserProbes(probes, expectedProbes, stage) {
    const probesByTestId = new Map(probes.map((probe) => [probe.testId, probe]));

    assert.equal(
        probesByTestId.size,
        expectedProbes.length,
        `Expected ${stage} probes to contain only the required test IDs; observed ${[...probesByTestId.keys()].join(', ')}.`
    );

    for (const expectedProbe of expectedProbes) {
        const probe = probesByTestId.get(expectedProbe.testId);

        assert.ok(probe, `Expected ${stage} probe ${expectedProbe.testId} to be present.`);
        assert.equal(
            probe.fontFamily,
            expectedProbe.fontFamily,
            `Expected ${stage} probe ${expectedProbe.testId} to use ${expectedProbe.fontFamily}; observed ${probe.fontFamily}.`
        );
        assert.notEqual(
            probe.content,
            '""',
            `Expected ${stage} probe ${expectedProbe.testId} to have non-empty glyph content.`
        );
        assert.equal(
            probe.content,
            `"${expectedProbe.content}"`,
            `Expected ${stage} probe ${expectedProbe.testId} to render its expected glyph; observed ${probe.content}.`
        );
    }
}

test('emits the icon catalogue once while retaining the global catalogue', () => {
    execFileSync('node', ['tools/icon-css-dedup-baseline/scripts/run-baseline.mjs'], {
        cwd: repoRoot,
        stdio: 'inherit'
    });

    const result = JSON.parse(readFileSync(resultsPath, 'utf8'));
    const observedCount = result.iconCss.emittedSignatureCount;

    assertBrowserProbes(result.browserProbes.initial, expectedInitialProbes, 'initial');
    assertBrowserProbes(result.browserProbes.lazy, expectedLazyProbes, 'lazy route');

    assert.equal(observedCount, 1, `Expected one emitted icon catalogue signature; observed ${observedCount}.`);
    assert.ok(
        result.sizes.initialRawBytes <= maxInitialRawBytes,
        `Expected initial JS/CSS payload at or below ${maxInitialRawBytes} bytes; observed ${result.sizes.initialRawBytes}.`
    );

    const globalCssFiles = result.emittedFiles.filter((file) => file.extension === 'css');
    for (const signature of catalogueSignatures) {
        const observedGlobalCount = globalCssFiles.reduce(
            (count, file) => count + file.catalogueSignatureCounts[signature],
            0
        );

        assert.equal(
            observedGlobalCount,
            1,
            `Expected global CSS to retain ${signature} once; observed ${observedGlobalCount}.`
        );
    }
});
