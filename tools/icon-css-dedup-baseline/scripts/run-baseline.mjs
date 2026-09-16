import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { basename, dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const require = createRequire(import.meta.url);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const toolRoot = join(repoRoot, 'tools/icon-css-dedup-baseline');
const fixtureRoot = join(toolRoot, 'fixture');
const resultsRoot = join(toolRoot, 'results');
const artifactsRoot = join(resultsRoot, 'artifacts');
const tarballRoot = join(artifactsRoot, 'tarballs');
const stagingRoot = join(artifactsRoot, 'package-staging');
const npmCacheRoot = join(artifactsRoot, 'npm-cache');
const yarnCacheRoot = join(artifactsRoot, 'yarn-cache');
const yarnGlobalRoot = join(artifactsRoot, 'yarn-global');
const yarnCli = join(repoRoot, '.yarn/releases/yarn-4.12.0.cjs');
const screenshotsRoot = join(resultsRoot, 'screenshots');
const buildRoot = join(fixtureRoot, 'dist/icon-css-baseline-consumer');
const buildOutputRoot = join(buildRoot, 'browser');

const packageProjects = ['cdk', 'i18n', 'core'];
const iconSignature = '.sap-icon--accept:before';
const catalogueSignatures = [
    '.sap-icon--accept:before',
    '.sap-icon-TNT--exceptions:before',
    '.sap-icon-businessSuiteInAppSymbols--3D:before'
];

function readJson(path) {
    return JSON.parse(readFileSync(path, 'utf8'));
}

function sha256(path) {
    return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function sizeRecord(path) {
    const content = readFileSync(path);
    return {
        bytes: content.length,
        gzipBytes: gzipSync(content).length,
        brotliBytes: brotliCompressSync(content).length
    };
}

function run(command, args, options = {}) {
    const result = spawnSync(command, args, {
        cwd: options.cwd ?? repoRoot,
        env: {
            ...process.env,
            CI: '1',
            NG_BUILD_CACHE: '0',
            npm_config_cache: npmCacheRoot,
            NX_CLOUD_DISTRIBUTED_EXECUTION: 'false',
            NX_DAEMON: 'false',
            YARN_CACHE_FOLDER: yarnCacheRoot,
            YARN_ENABLE_IMMUTABLE_INSTALLS: 'false',
            YARN_ENABLE_GLOBAL_CACHE: 'false',
            YARN_GLOBAL_FOLDER: yarnGlobalRoot,
            ...options.env
        },
        encoding: 'utf8',
        stdio: options.capture ? 'pipe' : 'inherit'
    });

    if (result.status !== 0) {
        throw new Error(
            `${command} ${args.join(' ')} failed with exit code ${result.status}\n${result.stdout || ''}${result.stderr || ''}`
        );
    }

    return result.stdout?.trim() ?? '';
}

function removeIfExists(path) {
    if (existsSync(path)) {
        rmSync(path, { recursive: true, force: true });
    }
}

function walkFiles(root) {
    if (!existsSync(root)) {
        return [];
    }

    const entries = readdirSync(root, { withFileTypes: true });
    return entries.flatMap((entry) => {
        const path = join(root, entry.name);
        if (entry.isDirectory()) {
            return walkFiles(path);
        }
        return [path];
    });
}

function patchPackageVersions(packageRoot, versions) {
    for (const packageJsonPath of walkFiles(packageRoot).filter((path) => basename(path) === 'package.json')) {
        const next = readFileSync(packageJsonPath, 'utf8')
            .replaceAll('ANGULAR_VER_PLACEHOLDER', versions.angularPeer)
            .replaceAll('VERSION_PLACEHOLDER', versions.fundamentalPeer)
            .replaceAll('THEMING_VER_PLACEHOLDER', versions.themingPeer)
            .replaceAll('FDSTYLES_VER_PLACEHOLDER', versions.fundamentalStylesPeer)
            .replaceAll('FDCXSTYLES_VER_PLACEHOLDER', versions.fundamentalCxStylesPeer);
        writeFileSync(packageJsonPath, next);
    }
}

function packProject(project, versions) {
    const source = join(repoRoot, `dist/libs/${project}`);
    const staging = join(stagingRoot, project);
    removeIfExists(staging);
    cpSync(source, staging, { recursive: true });
    patchPackageVersions(staging, versions);
    const output = run('npm', ['pack', staging, '--pack-destination', tarballRoot, '--json'], { capture: true });
    const [packResult] = JSON.parse(output);
    return {
        project,
        name: packResult.name,
        version: packResult.version,
        filename: packResult.filename,
        path: join(tarballRoot, packResult.filename),
        shasum: packResult.shasum,
        integrity: packResult.integrity,
        size: packResult.size,
        unpackedSize: packResult.unpackedSize,
        sha256: sha256(join(tarballRoot, packResult.filename))
    };
}

function writeFixturePackageJson(tarballs, rootPackage) {
    const byProject = Object.fromEntries(tarballs.map((tarball) => [tarball.project, tarball]));
    const packageJson = {
        name: 'icon-css-baseline-consumer',
        version: '0.0.0',
        private: true,
        packageManager: rootPackage.packageManager,
        scripts: {
            build: 'ng build --configuration production --stats-json'
        },
        dependencies: {
            '@angular/cdk': rootPackage.dependencies['@angular/cdk'],
            '@angular/common': rootPackage.dependencies['@angular/common'],
            '@angular/compiler': rootPackage.dependencies['@angular/compiler'],
            '@angular/core': rootPackage.dependencies['@angular/core'],
            '@angular/forms': rootPackage.dependencies['@angular/forms'],
            '@angular/platform-browser': rootPackage.dependencies['@angular/platform-browser'],
            '@angular/router': rootPackage.dependencies['@angular/router'],
            '@fundamental-ngx/cdk': `file:${relative(fixtureRoot, byProject.cdk.path)}`,
            '@fundamental-ngx/core': `file:${relative(fixtureRoot, byProject.core.path)}`,
            '@fundamental-ngx/i18n': `file:${relative(fixtureRoot, byProject.i18n.path)}`,
            '@fundamental-styles/common-css': rootPackage.devDependencies['@fundamental-styles/common-css'],
            '@sap-theming/theming-base-content': rootPackage.dependencies['@sap-theming/theming-base-content'],
            'compare-versions': rootPackage.dependencies['compare-versions'],
            'fast-equals': rootPackage.dependencies['fast-equals'],
            'focus-trap': rootPackage.dependencies['focus-trap'],
            'fundamental-styles': rootPackage.dependencies['fundamental-styles'],
            'lodash-es': '^4.17.0',
            rxjs: rootPackage.dependencies.rxjs,
            tslib: rootPackage.dependencies.tslib,
            'zone.js': rootPackage.dependencies['zone.js']
        },
        devDependencies: {
            '@angular-devkit/build-angular': rootPackage.devDependencies['@angular-devkit/build-angular'],
            '@angular/cli': rootPackage.devDependencies['@angular/cli'],
            '@angular/compiler-cli': rootPackage.devDependencies['@angular/compiler-cli'],
            typescript: rootPackage.devDependencies.typescript
        }
    };

    writeFileSync(join(fixtureRoot, 'package.json'), `${JSON.stringify(packageJson, null, 4)}\n`);
    writeFileSync(
        join(fixtureRoot, '.yarnrc.yml'),
        [
            'compressionLevel: mixed',
            'enableGlobalCache: false',
            `globalFolder: ${yarnGlobalRoot}`,
            'nodeLinker: node-modules',
            `cacheFolder: ${yarnCacheRoot}`,
            `yarnPath: ${relative(fixtureRoot, yarnCli)}`,
            ''
        ].join('\n')
    );
    // Keep the committed consumer lockfile. The local tarballs retain stable names,
    // so this pins the external dependency graph while each run repacks Core.
}

function parseStats() {
    const statsPath = join(buildRoot, 'stats.json');
    if (!existsSync(statsPath)) {
        return { path: statsPath, fesmInputs: [], outputs: [] };
    }

    const stats = readJson(statsPath);
    const inputs = Object.keys(stats.inputs ?? {});
    const outputs = Object.entries(stats.outputs ?? {}).map(([path, value]) => ({
        path,
        bytes: value.bytes,
        entryPoint: value.entryPoint ?? null,
        imports: value.imports ?? []
    }));

    return {
        path: statsPath,
        fesmInputs: inputs.filter((input) => input.includes('node_modules/@fundamental-ngx/core/fesm2022/')),
        outputs
    };
}

function measureEmittedFiles() {
    const indexHtml = existsSync(join(buildOutputRoot, 'index.html'))
        ? readFileSync(join(buildOutputRoot, 'index.html'), 'utf8')
        : '';
    const files = walkFiles(buildOutputRoot).filter((path) => /\.(css|js|mjs)$/.test(path));
    return files.map((path) => {
        const text = readFileSync(path, 'utf8');
        const fileName = basename(path);
        return {
            path: relative(fixtureRoot, path),
            extension: path.split('.').pop(),
            initial: indexHtml.includes(`src="${fileName}"`) || indexHtml.includes(`href="${fileName}"`),
            ...sizeRecord(path),
            iconSignatureCount: text.split(iconSignature).length - 1,
            catalogueSignatureCounts: Object.fromEntries(
                catalogueSignatures.map((signature) => [signature, text.split(signature).length - 1])
            )
        };
    });
}

async function captureScreenshots() {
    const { chromium } = require('playwright');
    mkdirSync(screenshotsRoot, { recursive: true });

    const server = await serveDirectory(buildOutputRoot);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const indexUrl = `http://127.0.0.1:${server.port}/index.html`;

    try {
        await page.goto(indexUrl, { waitUntil: 'networkidle' });
        await page.locator('[data-testid="baseline-icons"]').waitFor({ state: 'visible' });
        await page.screenshot({ path: join(screenshotsRoot, 'baseline-initial.png'), fullPage: true });
        const initialProbe = await probeIcons(page);

        await page.goto(`${indexUrl}#/lazy`, { waitUntil: 'networkidle' });
        await page.locator('[data-testid="lazy-icons"]').waitFor({ state: 'visible' });
        await page.screenshot({ path: join(screenshotsRoot, 'baseline-lazy.png'), fullPage: true });
        const lazyProbe = await probeIcons(page);

        return {
            screenshots: [
                relative(repoRoot, join(screenshotsRoot, 'baseline-initial.png')),
                relative(repoRoot, join(screenshotsRoot, 'baseline-lazy.png'))
            ],
            probes: { initial: initialProbe, lazy: lazyProbe }
        };
    } finally {
        await browser.close();
        await server.close();
    }
}

function serveDirectory(root) {
    const contentTypes = {
        '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.svg': 'image/svg+xml; charset=utf-8',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
    };

    const server = createServer((request, response) => {
        const requestPath = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname);
        const safePath = normalize(requestPath).replace(/^\.\.(\/|\\|$)/, '');
        const filePath = join(root, safePath === '/' ? 'index.html' : safePath);
        const resolvedPath = resolve(filePath);

        if (
            !resolvedPath.startsWith(resolve(root)) ||
            !existsSync(resolvedPath) ||
            statSync(resolvedPath).isDirectory()
        ) {
            response.writeHead(404);
            response.end('Not found');
            return;
        }

        response.writeHead(200, { 'content-type': contentTypes[extname(resolvedPath)] ?? 'application/octet-stream' });
        response.end(readFileSync(resolvedPath));
    });

    return new Promise((resolveServer) => {
        server.listen(0, '127.0.0.1', () => {
            const address = server.address();
            resolveServer({
                port: typeof address === 'object' && address ? address.port : 0,
                close: () => new Promise((resolveClose) => server.close(resolveClose))
            });
        });
    });
}

async function probeIcons(page) {
    return page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-testid$="icon"]')).map((element) => {
            const before = getComputedStyle(element, '::before');
            const rect = element.getBoundingClientRect();
            return {
                testId: element.getAttribute('data-testid'),
                className: element.getAttribute('class'),
                fontFamily: before.fontFamily,
                content: before.content,
                width: rect.width,
                height: rect.height
            };
        })
    );
}

function packageContribution(path) {
    const text = readFileSync(path, 'utf8');
    return {
        path: relative(repoRoot, path),
        ...sizeRecord(path),
        importsIconCss: text.includes('fundamental-styles/dist/icon.css'),
        iconSignatureCount: text.split(iconSignature).length - 1
    };
}

function installedPackageFile(...segments) {
    const path = join(fixtureRoot, 'node_modules', ...segments);
    if (!existsSync(path)) {
        throw new Error(`Expected installed package file to exist: ${path}`);
    }
    return path;
}

async function main() {
    removeIfExists(artifactsRoot);
    removeIfExists(screenshotsRoot);
    removeIfExists(join(fixtureRoot, 'node_modules'));
    removeIfExists(join(fixtureRoot, 'dist'));
    removeIfExists(join(fixtureRoot, '.angular'));
    removeIfExists(join(fixtureRoot, 'package-lock.json'));
    mkdirSync(tarballRoot, { recursive: true });
    mkdirSync(stagingRoot, { recursive: true });
    mkdirSync(resultsRoot, { recursive: true });
    cpSync(join(repoRoot, '.yarn/cache'), yarnCacheRoot, { recursive: true });

    const rootPackage = readJson(join(repoRoot, 'package.json'));
    const versions = {
        node: process.version,
        npm: run('npm', ['--version'], { capture: true }),
        yarn: run('node', [yarnCli, '--version'], { capture: true }),
        angularCli: rootPackage.devDependencies['@angular/cli'],
        angularCore: rootPackage.dependencies['@angular/core'],
        angularPeer: `^${rootPackage.dependencies['@angular/core'].split('.').slice(0, 2).join('.')}.0`,
        fundamentalVersion: readJson(join(repoRoot, 'libs/core/package.json')).version,
        fundamentalPeer: readJson(join(repoRoot, 'libs/core/package.json')).version,
        fundamentalStyles: rootPackage.dependencies['fundamental-styles'],
        fundamentalStylesPeer: rootPackage.dependencies['fundamental-styles'],
        fundamentalCxStyles: rootPackage.dependencies['@fundamental-styles/cx'],
        fundamentalCxStylesPeer: rootPackage.dependencies['@fundamental-styles/cx'],
        themingBaseContent: rootPackage.dependencies['@sap-theming/theming-base-content'],
        themingPeer: `^${rootPackage.dependencies['@sap-theming/theming-base-content'].split('.').slice(0, 2).join('.')}.0`,
        packageManager: rootPackage.packageManager
    };

    const gitSha = run('git', ['rev-parse', 'HEAD'], { capture: true });
    const gitStatus = run('git', ['status', '--short'], { capture: true });

    run('yarn', [
        'nx',
        'run-many',
        '--target=build',
        '--projects=cdk,i18n,core',
        '--configuration=production',
        '--skip-nx-cache'
    ]);

    const tarballs = packageProjects.map((project) => packProject(project, versions));
    writeFixturePackageJson(tarballs, rootPackage);
    run('node', [yarnCli, 'install', '--no-immutable'], { cwd: fixtureRoot });

    const resolvedCoreIcon = run('node', ['-e', "console.log(require.resolve('@fundamental-ngx/core/icon'))"], {
        cwd: fixtureRoot,
        capture: true
    });
    const resolvedCoreCss = installedPackageFile('@fundamental-ngx/core/styles/fundamental-ngx-core.css');

    run('node', [yarnCli, 'ng', 'build', '--configuration', 'production', '--stats-json'], { cwd: fixtureRoot });

    const emittedFiles = measureEmittedFiles();
    const initialFiles = emittedFiles.filter((file) => file.initial);
    const allBundleFiles = emittedFiles.filter((file) => file.extension === 'css' || file.extension === 'js');
    const filesContainingCatalogue = emittedFiles.filter((file) =>
        Object.values(file.catalogueSignatureCounts).some((count) => count > 0)
    );
    const stats = parseStats();
    const sourceIconCss = join(fixtureRoot, 'node_modules/fundamental-styles/dist/icon.css');
    const screenshotResult = await captureScreenshots();

    const result = {
        generatedAt: new Date().toISOString(),
        git: { sha: gitSha, statusShort: gitStatus },
        command: 'node tools/icon-css-dedup-baseline/scripts/run-baseline.mjs',
        versions,
        fixture: {
            path: relative(repoRoot, fixtureRoot),
            packageJson: relative(repoRoot, join(fixtureRoot, 'package.json')),
            lockfile: relative(repoRoot, join(fixtureRoot, 'yarn.lock')),
            lockfileSha256: sha256(join(fixtureRoot, 'yarn.lock')),
            angularJson: relative(repoRoot, join(fixtureRoot, 'angular.json')),
            hasTsconfigPaths: false,
            globalStyles: readJson(join(fixtureRoot, 'angular.json')).projects['icon-css-baseline-consumer'].architect
                .build.options.styles,
            assets: readJson(join(fixtureRoot, 'angular.json')).projects['icon-css-baseline-consumer'].architect.build
                .options.assets
        },
        packagedArtifacts: tarballs,
        packageResolution: {
            coreIcon: resolvedCoreIcon,
            coreCss: resolvedCoreCss,
            resolvesThroughPackagedFesm: resolvedCoreIcon.includes('node_modules/@fundamental-ngx/core/fesm2022/')
        },
        stats,
        sizes: {
            initialRawBytes: initialFiles.reduce((sum, file) => sum + file.bytes, 0),
            initialEstimatedTransferGzipBytes: initialFiles.reduce((sum, file) => sum + file.gzipBytes, 0),
            initialEstimatedTransferBrotliBytes: initialFiles.reduce((sum, file) => sum + file.brotliBytes, 0),
            totalRawBytes: allBundleFiles.reduce((sum, file) => sum + file.bytes, 0),
            totalGzipBytes: allBundleFiles.reduce((sum, file) => sum + file.gzipBytes, 0),
            totalBrotliBytes: allBundleFiles.reduce((sum, file) => sum + file.brotliBytes, 0)
        },
        iconCss: {
            source: packageContribution(sourceIconCss),
            packagedCoreGlobalCss: packageContribution(join(stagingRoot, 'core/styles/fundamental-ngx-core.css')),
            packagedCoreIconEntry: packageContribution(
                join(stagingRoot, 'core/fesm2022/fundamental-ngx-core-icon.mjs')
            ),
            signature: iconSignature,
            emittedSignatureCount: emittedFiles.reduce((sum, file) => sum + file.iconSignatureCount, 0),
            filesContainingCatalogue
        },
        emittedFiles,
        screenshots: screenshotResult.screenshots,
        browserProbes: screenshotResult.probes
    };

    const resultPath = join(resultsRoot, 'baseline-results.json');
    writeFileSync(resultPath, `${JSON.stringify(result, null, 4)}\n`);
    console.log(`Baseline results written to ${relative(repoRoot, resultPath)}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
