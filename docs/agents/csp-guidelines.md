# CSP authoring and review

Follow this guide when authoring or reviewing styling under `style-src-attr 'none'`. The consuming application configures stylesheet authorization and browser support.

## Short operating rule

Use classes/SCSS for fixed styles and verified property operations for dynamic values. Check styling changes against the review checklist and browser validation below.

## Mechanism contract

| Operation                                                                                                                                   | Guidance                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Literal HTML/SVG or host `style`, `[attr.style]`, style interpolation, DOM/Renderer `setAttribute` on `style`                               | Avoid: these serialize style attributes controlled by `style-src-attr`.                 |
| `cssText` assignment, including `Object.assign(style, { cssText: … })`; whole `element.style` assignment; Renderer `setProperty` on `style` | Avoid whole-style text replacement. Use named properties and preserve unrelated styles. |
| Named template/host bindings such as `[style.width.px]`; `style.width`, `style.setProperty`, `Renderer2.setStyle`                           | Allow dynamic values through the verified per-property renderer.                        |
| Aggregate Angular `[style]` strings/maps                                                                                                    | Allow through the verified renderer; prefer named properties.                           |
| Component `styleUrl` / `styles`; template HTML/SVG `<style>`; generated stylesheets                                                         | Require stylesheet authorization. Prefer owning SCSS for library-authored fixed rules.  |
| Consumer HTML/SVG style content                                                                                                             | Preserve the public contract; changes require an explicit design decision.              |

Angular's DOM renderer applies named and aggregate bindings through per-property writes, including string-valued `[style]`. Check renderer behavior for the affected Angular version, custom renderers and server output. The repository's `ngStyle` restriction is an authoring convention, not a CSP ban.

Reading `cssText`, removing an individual property, or seeing a DOM `style` attribute after CSSOM writes does not establish a violation. CSSOM does not sanitize arbitrary input: constrain property names/values, preserve input validation and avoid arbitrary consumer CSS replay or `DomSanitizer` bypasses.

## Stylesheet and application integration

- `style-src-attr` controls attributes; `style-src-elem` controls stylesheet elements. Each falls back through `style-src`, then `default-src`. Omitting a directive does not disable enforcement.
- Nonces authorize eligible stylesheet elements, not attributes. Use Angular `CSP_NONCE` / `ngCspNonce` where applicable, with a unique, unpredictable nonce per response matching the header. Verify custom loaders; never use a fixed production nonce.
- Matching attribute hashes require `unsafe-hashes` authorization. They are brittle for dynamic values and unsuitable for this target policy; hashes are not universally incapable of authorizing attributes.
- External SCSS can emit runtime `<style>` elements. Verify emitted stylesheets, nonce propagation and allowed origins, including themes/imports. Correctly authorized inline stylesheets are valid.
- Inspect generated critical CSS: a runtime `CSP_NONCE` provider alone does not nonce build-time critical styles. Angular `security.autoCsp` handles scripts, not strict style directives. The application owns the generated HTML/header contract.
- SSR/prerender can serialize bindings into initial HTML. Validate server output, initial rendering and hydration when supported; client CSSOM success alone is insufficient.
- Preserve selector scope, specificity, theme overrides, consumer styles and portal/overlay ownership. Emulated component selectors may not reach portals; exported CDK behavior must not depend on optional Core CSS. Preserve initial and settled behavior.
- Do not fix library styling by relaxing headers, adding attribute nonces or silently rewriting consumer HTML/SVG.

## Authoring examples

These migrations cover library-owned styles.

### Fixed template style to class and stylesheet

**Before:**

```html
<div style="display: flex; gap: 0.5rem">…</div>
```

**After:**

```html
<div class="fd-example__actions">…</div>
```

```scss
/* example.component.scss, loaded by styleUrl */
.fd-example__actions {
    display: flex;
    gap: 0.5rem;
}
```

Verify utility classes against the installed styles version and loaded bundle; otherwise define an owned class.

### Dynamic serialized attribute to named properties

**Before:**

```typescript
element.setAttribute('style', `width: ${width}px; max-height: ${maxHeight}px`);
```

**After, with validated numeric inputs:**

```typescript
element.style.width = `${width}px`;
element.style.maxHeight = `${maxHeight}px`;
```

Named template/host bindings and `Renderer2.setStyle` are alternatives. Preserve unrelated styles and the original reset/removal lifecycle.

### Raw template or SVG stylesheet to the owner

**Before:**

```html
<svg viewBox="0 0 16 16">
    <style>
        .fd-example__shape {
            fill: currentColor;
        }
    </style>
    <circle class="fd-example__shape" cx="8" cy="8" r="6" />
</svg>
```

**After:**

```html
<svg viewBox="0 0 16 16">
    <circle class="fd-example__shape" cx="8" cy="8" r="6" />
</svg>
```

```typescript
@Component({
    selector: 'fd-example',
    templateUrl: './example.component.html',
    styleUrl: './example.component.scss'
})
export class ExampleComponent {}
```

```scss
/* example.component.scss */
.fd-example__shape {
    fill: currentColor;
}
```

Apply the same ownership rule to raw HTML template `<style>`. SVG presentation attributes are distinct from style attributes; inspect the operation before classifying it.

## Review checklist

1. Inspect changed HTML/SVG, inline templates, host metadata, DOM/Renderer helpers, stylesheet loaders and relevant generated HTML/SSR or nonce/origin changes.
2. Request changes for established incompatible operations without waiting for browser reproduction. Separate regressions from pre-existing findings on affected paths.
3. Report each finding with the format below. Distinguish source findings, executed browser failures, fixture/setup failures and missing checks. Uncertain renderer/authorization behavior needs verification, not a confirmed-defect claim.
4. Check that the remedy preserves styling ownership and consumer contracts. Review [browser coverage](#browser-validation) for affected runtime paths.

### Finding template

> `file:line` — Operation/directive: […]. Impact: […]. Remedy or check needed: […]. How verified: [code inspection / browser result / test setup issue / missing check], with relevant test details.

Example:

> `component.ts:123` — `setAttribute('style', …)` conflicts with `style-src-attr 'none'` and can block dynamic width. Use `style.width` or `Renderer2.setStyle`. Verified by code inspection; browser reproduction not run.

### Review examples

Examples of issues to flag and valid patterns to accept.

| Review control                                                                                        | Expected judgment                                                                                                              |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| A forbidden attribute or whole-style write from the mechanism table                                   | Report file/line, directive, impact and a compatible remedy.                                                                   |
| Verified named/aggregate bindings, individual CSSOM writes, `cssText` reads or authorized stylesheets | Accept; fixed bindings may warrant a stylesheet preference, not a CSP finding. A visible style attribute alone proves nothing. |
| Missing browser/nonce/CI checks, uncertain renderer, or blocked fixture bootstrap                     | Report a verification gap or setup failure, not a reproduced component defect.                                                 |
| Consumer style content, proposed attribute nonce or header relaxation                                 | Preserve the public/security boundary; do not silently change it.                                                              |

## Browser validation

Add browser regression tests for affected components under an enforced CSP. Unit/jsdom tests cannot verify browser CSP enforcement.

1. Serve an enforced response header with `style-src-attr 'none'` and authorized stylesheets. Prove app bootstrap; classify setup failures separately.
2. Capture `securitypolicyviolation` before bootstrap and check for zero attributable component violations. When diagnosing a failure, record its directive, policy and browser/version.
3. Include a separate control that writes a forbidden style attribute and verifies the browser blocks it. Exclude this expected violation from normal component assertions.
4. Assert computed styles/layout and user behavior, including initial/settled states, consumer styles, themes, portals and supported SSR/hydration. Screenshots or event counts alone are insufficient.
5. Test the library's supported browsers; for application integration, use the application's support list. Record tested browsers and versions, and note missing coverage.
6. Use the actual Playwright configuration, projects and filters to confirm discovery (for example, `--list --grep <actual-filter>`), and check that CI executes the intended tests. Listing tests or selecting a local file alone does not establish CI execution.

Reuse existing CSP fixtures and component scenarios where available.

## References

- [MDN: style-src-attr](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr) — attribute scope, CSSOM and hashes.
- [Angular security: CSP](https://angular.dev/best-practices/security#content-security-policy) — stylesheet integration.
