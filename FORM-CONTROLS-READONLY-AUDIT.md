# Read-only audit of Core and Platform form controls

**Investigation date:** 2026-11-12  
**Document consolidated:** 2026-11-13  
**Author:** DAEDALUS  
**Status:** Other-control findings investigated; proposed follow-ups remain unimplemented in this audit. Core Radio has a separate reviewed fix in PR #14678.  
**Repository:** SAP/fundamental-ngx, NX monorepo. Original checkout: /Users/I820906/develop/d3/fundamental-ngx.  
**Audited baseline commit:** 35255acc6eef61d5115db31a94a93624dff36a23, with the then-existing radio working-tree changes.

This document contains the findings, manual setup and recipes, source mechanisms, proposed work packets, acceptance criteria, all recorded observations, and complete replay code. No original investigation files or separate handoffs are needed to understand it. Reproduction still requires a development checkout and its installed dependencies.

The consolidation did not rerun the other-control browser audit or change product/test/docs source. Its observations retain their original coverage. Later radio validation does not establish new passes or fixes for the other controls.

## How to use this handoff

1. Find the affected control and actually tested forms mode in the comparison matrix.
2. Follow its manual recipe on a development checkout; record the current commit, browser, and before/after state.
3. Use the implementation locations and proposed packet to prepare a small fix. P01–P74 and S01–S09 identify the complete embedded observations.
4. Complete the acceptance checklist before review. These investigation observations are not permanent passing regression tests.

## Read-only contract

User actions preserve the settled model, selection/native checked state, tokens/text, and associated ARIA. A blocked user action must not mark the control dirty or emit user value changes. Focus remains usable; normal focus/blur may mark it touched. Programmatic setValue, patchValue, writeValue, reset, and outer model updates remain supported.

Disabled is a separate state with different keyboard navigation and Angular form-aggregation behavior. Native HTML readonly protects text editing but does not itself prevent checkbox/radio activation, token deletion, or auxiliary-button mutation. Guard user activation boundaries; blocking all writes in shared CVA code would break legitimate programmatic synchronization.

## Answer

The radio issue is part of a broader set of read-only gaps. Several other controls accept read-only but still permit user changes. These failures occur with both Reactive Forms and ngModel in the modes tested; switching forms APIs is not a general solution.

The strongest additional findings are Switch, Core Combobox's optional clear button, token deletion in both Multi Combobox implementations and Platform Multi Input, and ignored inherited readonly inputs in Platform Radio Group, Step Input and date pickers. Checkbox has a narrower native-activation inconsistency: normal pointer and Space paths were protected, but direct native input.click() toggled checked without updating the model or ARIA.

Select, Platform Combobox, Platform Input/Textarea and Core Step Input resisted the tested edits. This is a scoped behavioral audit, not a claim that every configuration of those controls is correct.

## Scope and method

**18 control implementations**, **74 primary observations** and **9 focused supplemental observations** were recorded in Chromium 156.0.8078.74. Four primary observations recorded an expected absent/hidden button rather than attempting activation. OBSERVED in the JSON means the probe completed; it does not mean the control passed.

The local development docs app ran at http://127.0.0.1:4300/ using Angular 22.2.1, Nx 24.0.2 and Node v24.21.0. Public readonly/readOnly inputs, or exposed CvaDirective readonly inputs, were enabled in memory using Angular's development inspection API, followed by ng.applyChanges. No product, spec or docs source was edited.

Each final case used an explicit page.reload() before setup. Same-URL hash navigation alone can preserve the Angular component and previous mutations. The preliminary navigation-only run was discarded; the embedded primary results are from the corrected run. Subscriptions therefore also started fresh for every final case.

Physical mouse clicks and Playwright keyboard input were used for user interactions. DOM input.click() and label.click() are explicitly labeled supplemental activation paths. Token Delete was first tested after focusing a token; the supplement proves normal reachability by focusing the empty text input, pressing Backspace to move focus to the token, then Delete. It does not depend on forcing token focus.

The JSON records the forms directive, fixture index, public input metadata, native readOnly/disabled/checked/value, model, dirty state, emissions, tokens, focus and relevant ARIA. Normal focus/blur may mark a control touched; touched is not a read-only failure.

**Mode notation:** Fn = formControlName; Fc = [formControl]; Ng = ngModel. Fc is Reactive Forms, but it is not a literal formControlName reproduction. Uncovered modes are not inferred as browser-tested.

## Comparison matrix

| Control                  | Tested modes | Result when read-only                                                                                                                                                    | Classification                                     |
| ------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Core Checkbox            | Fn, Ng       | Visible host pointer, label DOM click and Space preserve value. Native input.click() flips checked; model/dirty/events and aria-checked stay unchanged.                  | Partial native activation gap                      |
| Platform Checkbox        | Ng           | Pointer and Space preserve value. Native input.click() has the same checked/model/ARIA mismatch.                                                                         | Partial gap inherited from Core; Fn not covered    |
| Core Switch              | Fn, Ng       | Label pointer and Space toggle checked/model, mark dirty and emit changes.                                                                                               | Confirmed read-only bug                            |
| Platform Switch          | Fn, Ng       | Label pointer and Space toggle checked/model and mark dirty.                                                                                                             | Confirmed ignored inherited input / forwarding gap |
| Platform Radio Group     | Fn, Ng       | Clicking an enabled unselected label changes selection/model and marks dirty. Ng Space also changes selection.                                                           | Confirmed ignored inherited input / forwarding gap |
| Core Multi Combobox      | Fn           | Pointer to close icon is blocked by the readonly input-group surface. Backspace from input then Delete removes Strawberry, changes value to [], marks dirty.             | Confirmed keyboard deletion bug; Ng not covered    |
| Platform Multi Combobox  | Fn           | Same keyboard deletion failure; pointer surface blocks close icon activation.                                                                                            | Confirmed keyboard deletion bug; Ng not covered    |
| Platform Multi Input     | Ng           | Close-icon pointer and Backspace then Delete remove Alabama, change value to [], mark dirty. Text typing remains blocked.                                                | Confirmed token deletion bug; Fn not covered       |
| Core Combobox            | Fn, Ng       | Text typing and ArrowDown/Enter preserve value. Optional clear button changes Apple to empty string (Ng) or the selected Apple object to null (Fn), by pointer or Enter. | Confirmed auxiliary-action bug                     |
| Platform Combobox        | Fn, Ng       | Typing and ArrowDown/Enter preserve value and dirty state. Add-on button is not rendered when readonly.                                                                  | No defect found in tested paths                    |
| Core Select              | Fn           | Pointer and Space/ArrowDown/Enter preserve value; dropdown stays closed.                                                                                                 | No defect found; Ng not covered                    |
| Platform Select          | Fn           | Same protected behavior.                                                                                                                                                 | No defect found; Ng not covered                    |
| Core Step Input          | Fc, Ng       | Typing and ArrowUp preserve value; step buttons are hidden.                                                                                                              | No defect found; Fn not covered                    |
| Platform Step Input      | Fc, Ng       | Typing 77, ArrowUp and increment pointer each change the model and dirty state. Native input.readOnly remains false.                                                     | Confirmed ignored inherited readonly input         |
| Platform Input           | Fc, Ng       | Native input.readOnly is true; typing does not change value/model/dirty.                                                                                                 | No defect found; Fn not covered                    |
| Platform Textarea        | Fn, Ng       | Native textarea.readOnly is true; typing does not change value/model/dirty.                                                                                              | No defect found in tested paths                    |
| Platform Date Picker     | Fc, Ng       | Native input.readOnly remains false. Valid entry 1/3/1990 commits a valid date and marks dirty. Picker button also changes aria-expanded to true.                        | Confirmed ignored inherited readonly input         |
| Platform Datetime Picker | Fc, Ng       | Native input.readOnly remains false. Valid entry 11/13/2026, 7:12 PM commits a valid datetime and marks dirty.                                                           | Confirmed ignored inherited readonly input         |

Platform Radio Group's Fn Space case did not change value, and ArrowRight from the selected option moved focus without committing selection. Do not treat these particular non-changing paths as evidence that the group's readonly input works: its enabled-label pointer case demonstrably changes value, and the rendered Core radios still have readOnly false.

For Core Combobox, a dropdown add-on click after readonly is enabled at runtime sets the component's internal open flag true and changes aria-expanded to a numeric option count (8/6 in these fixtures). A focused inspection found no visible popover body. Thus this audit confirms an internal/ARIA inconsistency, not visible dropdown selection through that path. The clear-button value mutation is independently confirmed. Numeric aria-expanded is an incidental accessibility finding to track separately.

## Why these gaps happen

### 1. Native readonly is not enough for toggles

Core Checkbox input click handler (libs/core/checkbox/checkbox/checkbox.component.ts:371) returns when readonly, but does not cancel the native click default. Its label/key-up handler does cancel the default, explaining the difference between protected user paths and direct native activation. Native readonly does not make checkbox or radio activation inert. The settled checked/model/ARIA mismatch is browser evidence, not a jsdom-only observation.

Core Switch host directive (libs/core/switch/switch.component.ts:44) exposes readonly, but its template (libs/core/switch/switch.component.html:1) uses disabled and ngModel with no readonly guard. The isChecked setter calls CvaDirective.setValue and emits checkedChange unconditionally. CvaDirective.setValue (libs/cdk/forms/cva/cva.directive.ts:400) does not reject readonly writes.

Do not solve this by blocking all writes in shared CVA code: programmatic setValue, writeValue, reset and data synchronization must remain possible while a control is read-only. Guard the user activation boundary.

### 2. Read-only text does not protect token mutation

Core Multi Combobox token binding (libs/core/multi-combobox/multi-combobox.component.html:55) passes only disabled to token readOnly. \_removeToken (libs/core/multi-combobox/multi-combobox.component.ts:649) has no readonly guard. Platform Multi Combobox template (libs/platform/form/multi-combobox/multi-combobox/multi-combobox.component.html:53) and Multi Input template (libs/platform/form/multi-input/multi-input.component.html:51) have the same disabled-only token binding. Platform Multi Input removeToken (libs/platform/form/multi-input/multi-input.component.ts:349) mutates the selection without checking readonly.

Tokenizer.keyDown (libs/core/token/tokenizer.component.ts:274) emits onCloseClick for active tokens when Delete/Backspace is pressed unless disableKeyboardDeletion is true. \_getActiveTokens (libs/core/token/tokenizer.component.ts:832) selects tokens by focus/selection without filtering token readOnly. Therefore simply hiding token close icons or changing token bindings is not sufficient. The owning control must guard deletion, and the tokenizer keyboard-deletion contract needs focused review.

### 3. Auxiliary buttons bypass the text input guard

Core Combobox clear button (libs/core/combobox/combobox.component.html:94) remains actionable when readOnly. \_handleClearSearchTerm (libs/core/combobox/combobox.component.ts:704) clears the text and propagates a change without a readOnly check. onInputKeydownHandler does check readOnly, explaining why ordinary typing/arrow input is protected while clear pointer/Enter fails.

The clear-button probe enabled the existing public showClearButton input and seeded the form through setValue with the fixture's first real dropdown option. It introduced no invalid option type or new component.

### 4. Inherited API does not imply runtime support

Platform BaseInput (libs/platform/shared/form/base.input.ts:128) declares readonly as an Angular input with a description saying it marks the component read-only. Angular runtime input metadata confirms that the affected Platform components expose it.

Platform Switch (libs/platform/form/switch/switch/switch.component.html:1) does not forward readonly to Core Switch. Radio Group (libs/platform/form/radio-group/radio-group.component.html:1) omits readonly from projected/list-generated options, and Radio Button's renderer (libs/platform/form/radio-group/radio/radio.component.html:1) does not forward it to Core Radio. The existing Core Radio fix cannot protect a Platform wrapper that never sets readOnly on its children.

Platform Number Step Input (libs/platform/form/step-input/number/number-step-input.component.html:1) uses !editable for readonly styling/native input, while canChangeValue (libs/platform/form/step-input/base.step-input.ts:161) checks disabled and editable, not readonly. This is an API mismatch, not a Reactive Forms subscription issue.

Platform Date Picker (libs/platform/form/date-picker/date-picker.component.html:1) and Datetime Picker (libs/platform/form/datetime-picker/datetime-picker.component.html:1) do not use or forward inherited readonly. Their Core picker components do not currently provide a corresponding full-control readonly input. Supporting the inherited contract needs a scoped design decision; blindly forwarding a nonexistent Core input is not a fix.

Implementation locations identify investigation-time source and may move after refactoring. Their mechanisms are explained here. Shared tokenizer changes need a scoped cross-consumer review.

## Manual reproduction prerequisites

From a checkout with dependencies installed, start development docs:

```sh
yarn start --host=127.0.0.1 --port=4300
```

Open http://127.0.0.1:4300/ and use the route in the recipe. Open DevTools Console; production docs normally lack Angular's ng inspection API. Setup enables existing inputs in browser memory and inspects real Angular forms directives. It does not create a replacement component or patch a production handler.

Fully reload before every independent action/forms-mode comparison and rerun the setup helper. Hash navigation alone can retain mutations and subscriptions. If a newer checkout lacks the requested enabled fixture, record the gap; do not silently substitute another forms mode.

FormControlName means formControlName (Fn); FormControlDirective means [formControl] (Fc); NgModel means ngModel (Ng). Fn and Fc are Reactive Forms but different tested bindings. Core Radio and Core Combobox use readOnly; the other audited inputs use readonly.

## Detailed manual recipes

These recipes describe the investigation-time local-source behavior; verify a newer checkout before claiming a new result. The setup changes only the running docs fixture in browser memory. The actions after setup are performed manually on the page. Reload to restore the fixture before every independent action. Use the exact mode listed: a test with Fc is not a claim that Fn was manually tested.

### One-time DevTools helper

Start the docs app as above, open the relevant route, and paste this into the browser DevTools Console once per full page reload. In Chrome, save it under DevTools **Sources → Snippets** so you can run the same snippet after each reload without repasting it:

```js
window.roSetup = (selector, mode, inputName = 'readonly') => {
    const entries = [...document.querySelectorAll(selector)].map((host) => {
        const directives = ng.getDirectives(host);
        const formDirective = directives.find((d) => d.constructor.name.replace(/^_/, '') === mode);
        return { host, directives, formDirective };
    });
    const entry = entries.find((e) => e.formDirective?.control && !e.formDirective.control.disabled);
    if (!entry) throw new Error('No enabled ' + mode + ' fixture found for ' + selector);
    const component = ng.getComponent(entry.host);
    const cva = entry.directives.find((d) => d.constructor.name.includes('CvaDirective'));
    const inputOwner = inputName === 'readonly' && entry.host.matches('fd-switch, fd-multi-combobox') ? cva : component;
    if (!inputOwner) throw new Error('Expected readonly input owner was not found.');
    inputOwner[inputName] = true;
    const form = entry.formDirective.control;
    form.markAsPristine();
    ng.applyChanges(component);
    const events = [];
    form.valueChanges.subscribe((value) => events.push(value));
    window.ro = {
        host: entry.host,
        component,
        form,
        events,
        read: () => ({
            value: form.value,
            dirty: form.dirty,
            valueChanges: [...events],
            inputs: [...entry.host.querySelectorAll('input,textarea')].map((i) => ({
                value: i.value,
                checked: i.checked,
                disabled: i.disabled,
                readOnly: i.readOnly,
                ariaChecked: i.getAttribute('aria-checked'),
                ariaReadonly: i.getAttribute('aria-readonly')
            })),
            tokens: [...entry.host.querySelectorAll('fd-token')].map((t) => t.innerText)
        })
    };
    entry.host.scrollIntoView({ block: 'center' });
    console.log('Readonly fixture prepared:', entry.host, ro.read());
    return ro;
};
```

The helper is provided inline for convenience; this consolidation has not browser-rerun the clarified input-owner selection. The helper picks an existing enabled control with the requested real Angular forms directive. It does not create a component or replace a ControlValueAccessor. It uses the exposed host directive for Core Switch/Multi Combobox and the existing component input for the other controls.

For each recipe, run its setup, inspect ro.read() before the action, return to the page and perform the manual action, then run ro.read() again. A changed value, dirty=true or new user valueChanges indicates a failure. The Console output also links the exact DOM host being exercised.

### A. Switch — real click and Space

Core route: http://127.0.0.1:4300/#/core/switch

```js
roSetup('fd-switch[formcontrolname="switch1"]', 'FormControlName');
```

1. Confirm the outer readonly input is enabled by setup. Notice that the inner checkbox still reports readOnly=false.
2. Click the visible switch once. **Actual:** false becomes true; dirty=true and valueChanges contains true. **Expected:** false is retained, dirty=false and no user emission.
3. Reload and repeat setup. Move keyboard focus to the switch input using Tab and press Space. The same unwanted value change occurs.
4. To compare ngModel, reload and use roSetup('fd-switch', 'NgModel'). Its initial value may be true; either action should preserve that initial value, but instead toggles it.

Platform route: http://127.0.0.1:4300/#/platform/switch

```js
roSetup('fdp-switch[formcontrolname="switch1"]', 'FormControlName');
// On a separate reload, compare:
// roSetup('fdp-switch', 'NgModel');
```

Repeat the same click/Space actions. **Actual:** model and dirty change. The inherited readonly input is not forwarded to the inner Core Switch.

### B. Platform Radio Group — enabled label click

Route: http://127.0.0.1:4300/#/platform/radio-group

```js
roSetup('fdp-radio-group', 'FormControlName');
```

1. In the prepared month group, confirm February is selected. January is disabled in this fixture; it is not a valid failure target.
2. Click the visible **March** label. **Actual:** February becomes March; dirty=true and a March valueChanges emission appears. **Expected:** February remains selected and pristine.
3. Inspect ro.read(). The child inputs report readOnly=false even though the group readonly input was enabled.
4. To compare ngModel, reload and use roSetup('fdp-radio-group', 'NgModel'). Click **Winter** in the prepared seasons group, or Tab to its first radio and press Space. **Actual:** its empty value becomes winter. **Expected:** the empty selection remains unchanged.

The Reactive Forms Space/ArrowRight cases in the recorded fixture did not commit a change. Use the confirmed enabled-label click to reproduce this group's failure.

### C. Multi Combobox — Backspace then Delete

Core route: http://127.0.0.1:4300/#/core/multi-combobox

```js
roSetup('fd-multi-combobox[formcontrolname="reactiveFormsCombo"]', 'FormControlName');
```

Platform route: http://127.0.0.1:4300/#/platform/multi-combobox

```js
roSetup('fdp-multi-combobox[formcontrolname="reactiveFormsCombo"]', 'FormControlName');
```

For each route:

1. Confirm Strawberry is selected and input.readOnly=true.
2. Return keyboard focus to the page and Tab into the prepared control's empty text input. For a focused diagnostic setup, the Console can also run ro.host.querySelector('input').focus(); no token focus needs to be forced.
3. Press **Backspace once**. Focus moves onto the Strawberry token. The model is still unchanged at this point.
4. Press **Delete**. **Actual:** Strawberry disappears, value becomes [], dirty=true and valueChanges emits an empty selection. **Expected:** the token and model remain unchanged.
5. A mouse click at the close-icon location is blocked by the readonly input-group surface in these fixtures. This is a keyboard deletion failure; do not describe the blocked mouse path as failing.

Embedded observations S01–S03 record this entire sequence from input focus, including the intermediate token focus. ngModel was not tested for these controls in the available docs fixtures.

### D. Platform Multi Input — close icon and keyboard deletion

Route: http://127.0.0.1:4300/#/platform/multi-input

```js
roSetup('fdp-multi-input', 'NgModel');
```

1. Confirm the prepared control contains the **Alabama** token and its text input is readonly.
2. Click the token's visible close icon. **Actual:** Alabama disappears, value becomes [], dirty=true. **Expected:** Alabama remains selected.
3. Reload and repeat setup. Tab to the empty input, press Backspace once, then Delete. The same deletion failure occurs.
4. Ordinary typing in the text input is protected; the failure is deletion of an existing selection.

A populated formControlName token fixture was not manually checked here. Do not label that mode browser-confirmed based only on this ngModel result.

### E. Core Combobox — optional clear button

Route: http://127.0.0.1:4300/#/core/combobox

```js
roSetup('fd-combobox', 'FormControlName', 'readOnly');
ro.component.showClearButton = true;
ro.form.setValue(ro.component.dropdownValues[0]);
ro.form.markAsPristine();
ro.events.length = 0;
ng.applyChanges(ro.component);
ro.read();
```

1. Confirm **Apple** is displayed, the native text input is readonly, and dirty=false. The form value is the fixture's real Apple option object.
2. Click the visible **clear (x)** button. **Actual:** text clears, the form value becomes null and dirty=true. **Expected:** the Apple object/text are preserved and the control stays pristine.
3. Reload and repeat the complete setup. Tab to the clear button and press **Enter**. The same failure occurs.
4. For ngModel, reload and run the same block with the first line changed to roSetup('fd-combobox', 'NgModel', 'readOnly'). **Actual:** Apple clears to an empty string instead of remaining unchanged.

The programmatic setValue is setup, not the failing user action; its event is cleared from ro.events before the click/Enter. Typing and ArrowDown/Enter in the text input itself were protected. This clear-button finding does not require selecting an invalid object or changing product code.

### F. Platform Step Input — number editing and increment

Route: http://127.0.0.1:4300/#/platform/step-input

```js
roSetup('fdp-number-step-input', 'NgModel');
// On a separate reload, compare Reactive Forms:
// roSetup('fdp-number-step-input', 'FormControlDirective');
```

1. Confirm readonly is enabled on the outer component, but the native text input still reports readOnly=false.
2. Select the input text, type **77**, then Tab away. **Actual:** 77 commits and dirty=true. **Expected:** the previous value is retained and pristine.
3. On separate reloads with setup repeated, press **ArrowUp** in the input or click the **increment (+)** button. Both can change the value despite readonly.
4. The native read-only implementation is wired to editable instead of readonly. The tested Reactive Forms fixture uses [formControl], not formControlName.

### G. Platform Date / Datetime Picker — valid manual entry

Date route: http://127.0.0.1:4300/#/platform/date-picker

```js
roSetup('fdp-date-picker', 'FormControlDirective');
// On a separate reload, compare:
// roSetup('fdp-date-picker', 'NgModel');
```

1. Confirm readonly is enabled on the wrapper and the native input reports readOnly=false.
2. Select the date text and type **1/3/1990**, then Tab away.
3. **Actual:** Reactive Forms changes its valid date from January 2 to January 3, 1990; ngModel's initially empty fixture accepts the same valid date. Both become dirty and emit changes. **Expected:** each retains its initial value.

Datetime route: http://127.0.0.1:4300/#/platform/datetime-picker

```js
roSetup('fdp-datetime-picker', 'FormControlDirective');
// On a separate reload, compare:
// roSetup('fdp-datetime-picker', 'NgModel');
```

Select the input text, type **11/13/2026, 7:12 PM**, then Tab away. **Actual:** a valid November 13, 2026 datetime commits and dirty=true. **Expected:** the original value is preserved. These date strings match the recorded default English/US fixtures; changing locale requires using its displayed date format. The Reactive Forms fixtures here use [formControl].

### H. Checkbox — explicitly supplemental native activation

Core route: http://127.0.0.1:4300/#/core/checkbox

```js
roSetup('fd-checkbox', 'FormControlName');
ro.read();
ro.host.querySelector('input').click();
ro.read();
```

**Actual:** checked flips from false to true while value stays false, dirty stays false, valueChanges stays empty and aria-checked stays false. **Expected:** native checked also remains false. For Core ngModel, use roSetup('fd-checkbox', 'NgModel') on a separate reload. For Platform ngModel, use /#/platform/checkbox and roSetup('fdp-checkbox', 'NgModel').

This is a manual Console invocation of native activation, not a normal visible-label click reproduction. Ordinary pointer and Space actions were protected in these fixtures. Assistive-technology activation was not checked.

### I. Manually compare the protected controls

Use the helper after opening each route, then attempt ordinary typing or the selection/step action:

| Route                | Setup call                                                            | Manual action / observed expected behavior                                                          |
| -------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| /#/core/select       | roSetup('fd-select', 'FormControlName')                               | Click selector; Tab to it and use Space/ArrowDown/Enter. Value stays unchanged and dropdown closed. |
| /#/platform/select   | roSetup('fdp-select', 'FormControlName')                              | Same selection actions; value stays unchanged.                                                      |
| /#/platform/combobox | roSetup('fdp-combobox', 'FormControlName') or NgModel on reload       | Type or press ArrowDown/Enter. Value stays unchanged; dropdown add-on is absent.                    |
| /#/core/step-input   | roSetup('fd-step-input', 'FormControlDirective') or NgModel on reload | Type a number or press ArrowUp. Value stays unchanged; step buttons are hidden.                     |
| /#/platform/input    | roSetup('fdp-input', 'FormControlDirective') or NgModel on reload     | Type text and blur. Native readonly prevents edits.                                                 |
| /#/platform/textarea | roSetup('fdp-textarea', 'FormControlName') or NgModel on reload       | Type text and blur. Native readonly prevents edits.                                                 |

Inspect ro.read() before and after each action. A protected result preserves the baseline model, dirty=false and an empty user emission list. These recipes do not extend the mode/configuration coverage stated in the matrix.

### J. Inspect auxiliary picker and combobox behavior separately

For Platform Date/Datetime Picker, reload, repeat the matching readonly setup, and click the picker add-on button. The primary probe recorded popup/focus interaction; Date Picker aria-expanded changed to true. The valid-entry recipe establishes value mutation independently. A popup/focus change alone is not proof that picker selection changed the model; calendar/time selection needs explicit follow-up coverage.

For Core Combobox, reload and run roSetup('fd-combobox', 'NgModel', 'readOnly'), then click its dropdown add-on. The recorded internal open flag became true and aria-expanded became the option count (8 in Ng, 6 in Fn). The focused supplement found zero visible popover bodies, popoverIsOpen=false and popoverDisabled=true. This is an internal/ARIA inconsistency, not demonstrated visible dropdown selection. The optional-clear recipe establishes a separate value-changing failure.

## Core Radio: separate fix and relationship to this audit

The original question was whether read-only intentionally behaved differently with formControlName and ngModel. It was a bug: read-only styling did not cancel native radio activation, and both public fixtures reproduced selection changes. The fix is in https://github.com/SAP/fundamental-ngx/pull/14678, titled fix(core): prevent selection changes in read-only radio groups. The checked PR head was 59b3c299487abe9304b39671846a8196cd5d8c5c. Published release/backport availability is not established.

The two runtime files are libs/core/radio/radio-button/radio-button.component.ts and its template. The fix cancels read-only label/native click defaults, blocks Space/all four arrow keys, and guards user-originated ngModelChange. CVA writes retain valueChange(value, false). Focusability, normal blur/touched behavior, programmatic updates, and reset remain supported. The PR also repairs example IDs/group names, adds set/reset buttons and live form diagnostics, and adds real forms integration/browser regressions.

Platform Radio Group remains separate: its inherited readonly input is not forwarded to child Core radios. The Core fix cannot protect children whose readOnly is never set.

| Radio evidence                                   | Recorded outcome                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Core build/lint and focused Jest                 | Passed; two focused suites/26 tests. Cache hits were distinguished from executed tasks.       |
| Cleanup docs compilation                         | 29 tasks succeeded/28 cached; docs compiler executed.                                         |
| Permanent browser matrix after WebKit correction | 54/54, 18 per Chromium/Firefox/WebKit, one attempt each, retries=0.                           |
| Changed-example supplement                       | 15/15, five per engine, first attempt.                                                        |
| Remaining independent QA                         | 84/84, 28 per engine, first attempt/retries=0.                                                |
| PRISM review, 2026-11-13                         | APPROVED for the reviewed working-tree revision; one nonblocking fixed-offset circle-test P3. |

These runs overlap; their counts cannot be added as unique scenarios. Original incomplete QA (83 passes/13 failures) and cleanup's first permanent run (53/54) remain historical failures. The WebKit cleanup failure occurred at a focus assertion before reset: plain Tab skipped the expected button on macOS. Native-verified Option+Tab (Alt+Tab in Playwright) corrected the assumption without weakening assertions.

Plain jsdom 26.1.0 independently mishandled cancelled radio activation: starting [true,false], preactivation yielded [false,true], cancellation settled at [false,false]. Unit tests retained supported native/model/emission/pristine/ARIA assertions; real-browser tests retained full sibling restoration. Native preactivation during dispatch is distinct from a committed/painted change. Do not block programmatic writes to work around the emulator.

The historical final closeout recorded BLOCKED after formatting wrapped a test callback's destructured parameters and changed its byte hash. In-memory reversal recovered the reviewed file. Later TypeScript token/AST equivalence and lint/discovery passed; a temporary final browser refresh stopped on the user's commit/HEAD transition before a new matrix ran. That refresh has no new browser pass receipt. This is source/evidence reconciliation history, not an additional radio product defect.

Original runtime hash changes came from the authorized protected-handler rename (\_inputClicked/\_inputKeydown to inputClicked/inputKeydown). Later fixture metadata, docs spacer, example cleanup, and keyboard-test changes were reconciled against their actual validation revisions. Their results do not change the November 12 other-control observations.

Baseline native-radio aria-readonly axe findings were retained; truncation contrast incompletes had documented manual measurements of 15.5834:1. Scoped QA_GREEN does not certify clean WCAG conformance. The permanent circle test's fixed x=8 needs measured geometry; independent measured QA supported current acceptance.

## Proposed follow-up work packets

Prepare focused packets in this order, rather than one shared-CVA rewrite:

| Packet                        | Initial scope                                      | Design / regression focus                                                                                                                      |
| ----------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| A: toggles                    | Core/Platform Switch and Checkbox                  | Cancel native activation and guard model/output mutation; forward Platform readonly; test checked/model/ARIA together.                         |
| B: auxiliary actions          | Core Combobox                                      | Protect clear pointer/Enter and runtime readonly transitions; distinguish internal open/ARIA from actual popup visibility.                     |
| C: token deletion             | Core/Platform Multi Combobox, Platform Multi Input | Guard owner mutations; align token readonly and tokenizer keyboard-deletion behavior; reproduce Backspace/Delete from input and pointer close. |
| D: inherited input forwarding | Platform Radio Group/Radio Button and Step Input   | Forward/consume readonly; retain editable semantics and valid Reactive Forms/native selection behavior.                                        |
| E: picker contract            | Platform/Core Date and Datetime Picker integration | Decide the supported full-control contract before implementation; cover text edits, picker selection, keyboard and programmatic updates.       |

For each approved packet: **CRUCIBLE** adds public-template regression fixtures and proves RED; **FORGE** performs the scoped runtime fix and build/lint/focused-test validation; **SENTINEL** independently validates Chromium plus other browsers, keyboard/focus and axe; **PRISM** reviews the final diff and evidence; **DAEDALUS** closes the contract and handoff. Each handoff should cite relevant embedded P/S observation IDs, list allowed files, record its source revision, distinguish current/carried/not-run evidence, and preserve failed results. These are proposed scopes; this audit has not launched or implemented them.

For toggles, retain real-browser native activation coverage where jsdom cannot faithfully emulate cancellation, as already established by the radio pipeline. For every packet, test both readonly enabled initially and toggled after a value is set, both forms modes where supported, disabled comparison behavior, and programmatic setValue/reset while readonly.

## Follow-up prompt, validation, and handoff contract

Use each packet's control list, mechanisms, recipes, and embedded P/S IDs as its task scope. The existing radio route used gpt-6.1-sol with medium reasoning; that is a suggested starting route, not a measured model comparison. Use the current persona activation workflow rather than depending on the original Desktop launcher.

A reusable self-contained prompt, replacing the bracketed fields:

> Work on packet [A/B/C/D/E] for [controls] in fundamental-ngx. Its defect, actual modes, manual steps, source mechanism, and historical [P/S IDs] are in this document. Stay within [explicit allowed source/test files]. Use real public readonly/readOnly inputs and forms bindings; distinguish formControlName from [formControl]. CRUCIBLE proves meaningful RED and adds regressions; FORGE applies the smallest owner/forwarding fix and validates; SENTINEL independently checks browser/focus/accessibility behavior against actual source; PRISM reviews diff and evidence without repeating unchanged passes; DAEDALUS closes design decisions and handoff. Preserve programmatic writes/reset, focusability, normal blur/touched, editable/disabled behavior, and original failed evidence. Do not block every shared CVA write.

Packet E requires a product contract first: decide whether read-only permits opening for inspection, prevent text/picker/time selection mutations as appropriate, and define how inherited Platform readonly maps to Core. No matching full-control Core picker input was located; forwarding a nonexistent input is not a fix.

Acceptance must cover:

- Both actual forms modes where supported; explicitly close Fn/Fc/Ng gaps.
- Initially-readonly and runtime readonly transitions, including becoming editable again.
- Toggle label/native/host actions, Space/arrows, full native/model/ARIA consistency, and user/output event counts.
- Auxiliary clear/add-on pointer and keyboard actions; internal open/ARIA versus visible popup behavior.
- Token close pointer and Backspace then Delete from an empty input, proving keyboard reachability without forced token focus.
- Programmatic setValue/patchValue/reset/writeValue/outer model writes while read-only, followed by another blocked user action.
- Editable/disabled comparisons, dirty preservation, and permitted focus/blur touched changes.
- Chromium/Firefox/WebKit for native behavior, theme/font/geometry preflight, genuine keyboard entry/exit, scoped axe, and manual keyboard/focus checks.

Run the owning library's build/lint/focused-test sequence. Cross-library scopes validate both relevant libraries; docs changes compile docs. Examples:

```sh
yarn nx run core:build
yarn nx run core:lint
yarn nx run core:test --testfile=<changed-spec>.spec.ts
yarn nx run platform:build
yarn nx run platform:lint
yarn nx run platform:test --testfile=<changed-spec>.spec.ts
yarn nx run docs:compile
```

Replace <changed-spec> with the actual regression file and run applicable commands. Browser validation needs explicit spec/config matching, declared engines, and retries=0; inspect discovery first. A handoff records outcome, source revision/changed scope, actual checks and evidence, unresolved findings/limits, and next owner/action. Setup failures and diagnostics are not behavioral RED or QA passes.

## Limits and remaining coverage

This audit records local behavior from November 12, not affected published versions/backport ranges. The reporter's version/full template remain unknown. No other-control permanent tests, standalone build/lint gate, Firefox/WebKit matrix, axe run, or assistive-technology activation was added by this investigation or consolidation. The docs development server compiled source for the original Chromium probes.

Mode gaps remain explicit: Platform Checkbox Fn; Core/Platform Multi Combobox Ng; Platform Multi Input populated Fn; Core/Platform Select Ng; and literal Fn where Reactive Forms fixtures used Fc. Newer fixtures/fixes may change results; record a new revision and actual execution before claiming them.

UI5 Web Components, BTP/CX, Tree selection, sliders, rating, custom projected input groups, mobile variants, and assistive activation were not browser-audited. Core Multi Input, Core Date/Datetime Picker, Time Picker, and Slider were not labeled broken merely because TypeScript has readonly modifiers. No matching full-control readonly API was located for those Core controls; Slider tooltipMode=readonly and rating displayMode have different scopes.

Core Radio validation is separate and summarized above. It does not fix/reclassify the other controls. This audit made no product/spec/docs source edits. Matching git-status file lists alone do not prove byte identity; new validation must name its actual revision.

## Complete observation index

P IDs preserve all 74 primary cases in order; S IDs preserve the nine supplemental cases. OBSERVED means a probe completed, not a pass. No value mutation recorded is limited to that action and captured state. Full payloads below retain every field, including selectors, fixture indices, input metadata, native/model/ARIA state, emissions, hit targets, tokens, focus, intermediate Backspace state, and visibility details.

| ID  | Route / forms directive                         | Action                         | Model before → after                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Recorded disposition                                            |
| --- | ----------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| P01 | core/checkbox / NgModel                         | host-pointer                   | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P02 | core/checkbox / NgModel                         | label-DOM                      | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P03 | core/checkbox / NgModel                         | native-DOM                     | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Native/display mutation without model change                    |
| P04 | core/checkbox / NgModel                         | Space                          | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P05 | core/switch / NgModel                           | label-pointer                  | true → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P06 | core/switch / NgModel                           | Space                          | true → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P07 | platform/radio-group / NgModel                  | radio-label-pointer            | "" → "winter"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | User mutation recorded; dirty=true, valueChanges=1              |
| P08 | platform/radio-group / NgModel                  | radio-Space                    | "" → "winter"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | User mutation recorded; dirty=true, valueChanges=1              |
| P09 | platform/switch / NgModel                       | label-pointer                  | true → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P10 | platform/switch / NgModel                       | Space                          | true → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P11 | platform/combobox / NgModel                     | typing                         | "Strawberry" → "Strawberry"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P12 | platform/combobox / NgModel                     | input-ArrowDown                | "Strawberry" → "Strawberry"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P13 | platform/combobox / NgModel                     | addon-pointer                  | "Strawberry" → "Strawberry"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No add-on button rendered; activation not attempted             |
| P14 | platform/input / NgModel                        | typing                         | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P15 | platform/textarea / NgModel                     | typing                         | "Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n invidunt ut labore et dolore magna aliquyam erat" → "Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n invidunt ut labore et dolore magna aliquyam erat" | No value mutation recorded                                      |
| P16 | platform/step-input / NgModel                   | typing-number                  | 10 → 77                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | User mutation recorded; dirty=true, valueChanges=1              |
| P17 | platform/step-input / NgModel                   | input-ArrowUp                  | 10 → 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | User mutation recorded; dirty=true, valueChanges=1              |
| P18 | platform/step-input / NgModel                   | step-button-pointer            | 10 → 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | User mutation recorded; dirty=true, valueChanges=1              |
| P19 | platform/date-picker / NgModel                  | typing                         | "" → {"\_isValid":false,"year":null,"month":null,"day":null,"hour":null,"minute":null,"second":null}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | User mutation recorded; dirty=true, valueChanges=1              |
| P20 | platform/date-picker / NgModel                  | addon-pointer                  | "" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Open/ARIA inspection; full snapshot below                       |
| P21 | platform/datetime-picker / NgModel              | typing                         | {"\_isValid":true,"year":2026,"month":11,"day":12,"hour":18,"minute":12,"second":51} → {"\_isValid":false,"year":null,"month":null,"day":null,"hour":null,"minute":null,"second":null}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | User mutation recorded; dirty=true, valueChanges=6              |
| P22 | platform/datetime-picker / NgModel              | addon-pointer                  | {"\_isValid":true,"year":2026,"month":11,"day":12,"hour":18,"minute":12,"second":51} → {"\_isValid":true,"year":2026,"month":11,"day":12,"hour":18,"minute":12,"second":51}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P23 | core/checkbox / FormControlName                 | host-pointer                   | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P24 | core/checkbox / FormControlName                 | label-DOM                      | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P25 | core/checkbox / FormControlName                 | native-DOM                     | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Native/display mutation without model change                    |
| P26 | core/checkbox / FormControlName                 | Space                          | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P27 | core/switch / FormControlName                   | label-pointer                  | false → true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P28 | core/switch / FormControlName                   | Space                          | false → true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P29 | platform/radio-group / FormControlName          | radio-label-pointer            | "february" → "march"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | User mutation recorded; dirty=true, valueChanges=1              |
| P30 | platform/radio-group / FormControlName          | radio-Space                    | "february" → "february"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No value mutation recorded                                      |
| P31 | platform/switch / FormControlName               | label-pointer                  | false → true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P32 | platform/switch / FormControlName               | Space                          | false → true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P33 | platform/combobox / FormControlName             | typing                         | {"name":"Strawberry","type":"Fruits"} → {"name":"Strawberry","type":"Fruits"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P34 | platform/combobox / FormControlName             | input-ArrowDown                | {"name":"Strawberry","type":"Fruits"} → {"name":"Strawberry","type":"Fruits"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P35 | platform/combobox / FormControlName             | addon-pointer                  | {"name":"Strawberry","type":"Fruits"} → {"name":"Strawberry","type":"Fruits"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No add-on button rendered; activation not attempted             |
| P36 | platform/input / FormControlDirective           | typing                         | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P37 | platform/textarea / FormControlName             | typing                         | "Lorem ipsum, dolor sit amet" → "Lorem ipsum, dolor sit amet"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P38 | platform/step-input / FormControlDirective      | typing-number                  | null → 77                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | User mutation recorded; dirty=true, valueChanges=1              |
| P39 | platform/step-input / FormControlDirective      | input-ArrowUp                  | null → 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | User mutation recorded; dirty=true, valueChanges=1              |
| P40 | platform/step-input / FormControlDirective      | step-button-pointer            | null → 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | User mutation recorded; dirty=true, valueChanges=1              |
| P41 | platform/date-picker / FormControlDirective     | typing                         | {"\_isValid":true,"year":1990,"month":1,"day":2,"hour":0,"minute":0,"second":0} → {"\_isValid":false,"year":null,"month":null,"day":null,"hour":null,"minute":null,"second":null}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | User mutation recorded; dirty=true, valueChanges=1              |
| P42 | platform/date-picker / FormControlDirective     | addon-pointer                  | {"\_isValid":true,"year":1990,"month":1,"day":2,"hour":0,"minute":0,"second":0} → {"\_isValid":true,"year":1990,"month":1,"day":2,"hour":0,"minute":0,"second":0}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Open/ARIA inspection; full snapshot below                       |
| P43 | platform/datetime-picker / FormControlDirective | typing                         | null → {"\_isValid":false,"year":null,"month":null,"day":null,"hour":null,"minute":null,"second":null}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | User mutation recorded; dirty=true, valueChanges=6              |
| P44 | platform/datetime-picker / FormControlDirective | addon-pointer                  | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P45 | platform/checkbox / NgModel                     | host-pointer                   | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P46 | platform/checkbox / NgModel                     | native-DOM                     | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Native/display mutation without model change                    |
| P47 | platform/checkbox / NgModel                     | Space                          | false → false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | No value mutation recorded                                      |
| P48 | core/multi-combobox / FormControlName           | token-pointer                  | [{"name":"Strawberry","type":"Fruits"}] → [{"name":"Strawberry","type":"Fruits"}]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No value mutation recorded                                      |
| P49 | core/multi-combobox / FormControlName           | token-Delete                   | [{"name":"Strawberry","type":"Fruits"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P50 | platform/multi-combobox / FormControlName       | token-pointer                  | [{"name":"Strawberry","type":"Fruits"}] → [{"name":"Strawberry","type":"Fruits"}]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No value mutation recorded                                      |
| P51 | platform/multi-combobox / FormControlName       | token-Delete                   | [{"name":"Strawberry","type":"Fruits"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=2              |
| P52 | platform/multi-input / NgModel                  | token-pointer                  | [{"state":"Alabama","city":"Montgomery"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | User mutation recorded; dirty=true, valueChanges=1              |
| P53 | platform/multi-input / NgModel                  | token-Delete                   | [{"state":"Alabama","city":"Montgomery"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | User mutation recorded; dirty=true, valueChanges=1              |
| P54 | platform/multi-input / NgModel                  | typing                         | [{"state":"Alabama","city":"Montgomery"}] → [{"state":"Alabama","city":"Montgomery"}]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No value mutation recorded                                      |
| P55 | core/select / FormControlName                   | select-pointer                 | "Apple" → "Apple"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No value mutation recorded                                      |
| P56 | core/select / FormControlName                   | select-keyboard                | "Apple" → "Apple"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | No value mutation recorded                                      |
| P57 | platform/select / FormControlName               | select-pointer                 | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P58 | platform/select / FormControlName               | select-keyboard                | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P59 | core/combobox / NgModel                         | typing                         | "" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No value mutation recorded                                      |
| P60 | core/combobox / NgModel                         | input-ArrowDown                | "" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No value mutation recorded                                      |
| P61 | core/combobox / NgModel                         | addon-pointer                  | "" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Open/ARIA inspection; full snapshot below                       |
| P62 | core/combobox / FormControlName                 | typing                         | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P63 | core/combobox / FormControlName                 | input-ArrowDown                | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P64 | core/combobox / FormControlName                 | addon-pointer                  | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Open/ARIA inspection; full snapshot below                       |
| P65 | core/combobox / NgModel                         | clear-pointer                  | "Apple" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P66 | core/combobox / NgModel                         | clear-Enter                    | "Apple" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| P67 | core/combobox / FormControlName                 | clear-pointer                  | {"displayedValue":"Apple","value":"AppleValue"} → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | User mutation recorded; dirty=true, valueChanges=1              |
| P68 | core/combobox / FormControlName                 | clear-Enter                    | {"displayedValue":"Apple","value":"AppleValue"} → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | User mutation recorded; dirty=true, valueChanges=1              |
| P69 | core/step-input / NgModel                       | typing-number                  | 100 → 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No value mutation recorded                                      |
| P70 | core/step-input / NgModel                       | input-ArrowUp                  | 100 → 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | No value mutation recorded                                      |
| P71 | core/step-input / NgModel                       | step-button-pointer            | 100 → 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Step buttons hidden in readonly state; activation not attempted |
| P72 | core/step-input / FormControlDirective          | typing-number                  | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P73 | core/step-input / FormControlDirective          | input-ArrowUp                  | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | No value mutation recorded                                      |
| P74 | core/step-input / FormControlDirective          | step-button-pointer            | null → null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Step buttons hidden in readonly state; activation not attempted |
| S01 | core/multi-combobox / FormControlName           | Input Backspace then Delete    | [{"name":"Strawberry","type":"Fruits"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=1              |
| S02 | platform/multi-combobox / FormControlName       | Input Backspace then Delete    | [{"name":"Strawberry","type":"Fruits"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | User mutation recorded; dirty=true, valueChanges=2              |
| S03 | platform/multi-input / NgModel                  | Input Backspace then Delete    | [{"state":"Alabama","city":"Montgomery"}] → []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | User mutation recorded; dirty=true, valueChanges=1              |
| S04 | platform/radio-group / FormControlName          | ArrowRight from selected radio | "february" → "february"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | No value mutation recorded                                      |
| S05 | platform/date-picker / NgModel                  | Valid date entry               | "" → {"\_isValid":true,"year":1990,"month":1,"day":3,"hour":0,"minute":0,"second":0}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | User mutation recorded; dirty=true, valueChanges=5              |
| S06 | platform/date-picker / FormControlDirective     | Valid date entry               | {"\_isValid":true,"year":1990,"month":1,"day":2,"hour":0,"minute":0,"second":0} → {"\_isValid":true,"year":1990,"month":1,"day":3,"hour":0,"minute":0,"second":0}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | User mutation recorded; dirty=true, valueChanges=5              |
| S07 | platform/datetime-picker / NgModel              | Valid date entry               | {"\_isValid":true,"year":2026,"month":11,"day":12,"hour":18,"minute":16,"second":41} → {"\_isValid":true,"year":2026,"month":11,"day":13,"hour":19,"minute":12,"second":0}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | User mutation recorded; dirty=true, valueChanges=19             |
| S08 | platform/datetime-picker / FormControlDirective | Valid date entry               | null → {"\_isValid":true,"year":2026,"month":11,"day":13,"hour":19,"minute":12,"second":0}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | User mutation recorded; dirty=true, valueChanges=19             |
| S09 | core/combobox / NgModel                         | Dropdown visibility inspection | "" → ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Open/ARIA inspection; full snapshot below                       |

Empty arrays/nulls are recorded data, not inferred passes. Exact serialized dates and interim typing emissions are preserved. The primary metadata records Chromium 156.0.8078.74 and timestamp 2026-11-12T23:13:27.921Z. Supplemental records are the focused follow-up from the same investigation and have no independent timestamp field.

<details>
<summary>All 74 primary observations and original metadata</summary>

```json
{
    "timestamp": "2026-11-12T23:13:27.921Z",
    "chromium": "156.0.8078.74",
    "method": "Existing development docs fixtures; public readonly input or its exposed host directive set in memory, then ng.applyChanges; page.reload() between every case; physical mouse and keyboard except label-DOM/native-DOM supplemental activation.",
    "cases": [
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "host-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-CHECKBOX",
                "class": "ng-untouched ng-pristine is-cozy ng-valid"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "FD-CHECKBOX"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "label-DOM",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "native-DOM",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "Space",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/switch",
            "selector": "fd-switch",
            "mode": "NgModel",
            "readonlyPath": "_cva.readonly",
            "action": "label-pointer",
            "fixtureIndex": 1,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "activeText",
                    "inactiveText",
                    "id",
                    "required",
                    "checked",
                    "semantic",
                    "ariaLabel",
                    "ariaLabelledBy"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": true,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "fd-switch__icon fd-switch__icon--on sap-icon sap-icon--accept"
            },
            "after": {
                "model": false,
                "dirty": true,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [false],
                "outputs": [false],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/switch",
            "selector": "fd-switch",
            "mode": "NgModel",
            "readonlyPath": "_cva.readonly",
            "action": "Space",
            "fixtureIndex": 1,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "activeText",
                    "inactiveText",
                    "id",
                    "required",
                    "checked",
                    "semantic",
                    "ariaLabel",
                    "ariaLabelledBy"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": true,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": true,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [false],
                "outputs": [false],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/radio-group",
            "selector": "fdp-radio-group",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "radio-label-pointer",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "selected",
                    "isInline",
                    "hasNoValue",
                    "noValueLabel",
                    "inlineLayout",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "winter",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "winter",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "spring",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "summer",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "autumn",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "SPAN",
                "class": "fd-radio__text"
            },
            "after": {
                "model": "winter",
                "dirty": true,
                "inputValue": "winter",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "winter",
                        "checked": true,
                        "disabled": false
                    },
                    {
                        "value": "spring",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "summer",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "autumn",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": ["winter"],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/radio-group",
            "selector": "fdp-radio-group",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "radio-Space",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "selected",
                    "isInline",
                    "hasNoValue",
                    "noValueLabel",
                    "inlineLayout",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "winter",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "winter",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "spring",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "summer",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "autumn",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "winter",
                "dirty": true,
                "inputValue": "winter",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "winter",
                        "checked": true,
                        "disabled": false
                    },
                    {
                        "value": "spring",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "summer",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "autumn",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": ["winter"],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/switch",
            "selector": "fdp-switch",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "label-pointer",
            "fixtureIndex": 4,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "semantic",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": true,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "fd-switch__icon fd-switch__icon--on sap-icon sap-icon--accept"
            },
            "after": {
                "model": false,
                "dirty": true,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [false],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/switch",
            "selector": "fdp-switch",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "Space",
            "fixtureIndex": 4,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "semantic",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": true,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": true,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [false],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/combobox",
            "selector": "fdp-combobox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 27,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "maxHeight",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "fillControlMode",
                    "buttonFocusable",
                    "triggers",
                    "closeOnOutsideClick",
                    "byline",
                    "dataSource",
                    "value",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Strawberry",
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "Strawberry",
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/combobox",
            "selector": "fdp-combobox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "input-ArrowDown",
            "fixtureIndex": 27,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "maxHeight",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "fillControlMode",
                    "buttonFocusable",
                    "triggers",
                    "closeOnOutsideClick",
                    "byline",
                    "dataSource",
                    "value",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Strawberry",
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "Strawberry",
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/combobox",
            "selector": "fdp-combobox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "addon-pointer",
            "fixtureIndex": 27,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "maxHeight",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "fillControlMode",
                    "buttonFocusable",
                    "triggers",
                    "closeOnOutsideClick",
                    "byline",
                    "dataSource",
                    "value",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Strawberry",
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "actionNote": "No add-on button rendered",
            "after": {
                "model": "Strawberry",
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/input",
            "selector": "fdp-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 10,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "type",
                    "value",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/textarea",
            "selector": "fdp-textarea",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 13,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "height",
                    "growingMaxLines",
                    "cols",
                    "wrapType",
                    "maxLength",
                    "showExceededText",
                    "growing",
                    "value",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n        sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n        invidunt ut labore et dolore magna aliquyam erat",
                "dirty": false,
                "inputValue": "Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n        sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n        invidunt ut labore et dolore magna aliquyam erat",
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n        sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n        invidunt ut labore et dolore magna aliquyam erat",
                "dirty": false,
                "inputValue": "Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n        sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor\n        invidunt ut labore et dolore magna aliquyam erat",
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "FD-ICON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/step-input",
            "selector": "fdp-number-step-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing-number",
            "fixtureIndex": 16,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "description",
                    "value",
                    "min",
                    "max",
                    "step",
                    "stepFn",
                    "precision",
                    "largerStep",
                    "showLabels",
                    "align",
                    "incrementLabel",
                    "decrementLabel",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": 10,
                "dirty": false,
                "inputValue": "10",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": 77,
                "dirty": true,
                "inputValue": "77",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [77],
                "outputs": [],
                "activeTag": "FD-ICON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/step-input",
            "selector": "fdp-number-step-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "input-ArrowUp",
            "fixtureIndex": 16,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "description",
                    "value",
                    "min",
                    "max",
                    "step",
                    "stepFn",
                    "precision",
                    "largerStep",
                    "showLabels",
                    "align",
                    "incrementLabel",
                    "decrementLabel",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": 10,
                "dirty": false,
                "inputValue": "10",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": 11,
                "dirty": true,
                "inputValue": "11",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [11],
                "outputs": [],
                "activeTag": "FD-ICON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/step-input",
            "selector": "fdp-number-step-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "step-button-pointer",
            "fixtureIndex": 16,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "description",
                    "value",
                    "min",
                    "max",
                    "step",
                    "stepFn",
                    "precision",
                    "largerStep",
                    "showLabels",
                    "align",
                    "incrementLabel",
                    "decrementLabel",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": 10,
                "dirty": false,
                "inputValue": "10",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--add"
            },
            "after": {
                "model": 11,
                "dirty": true,
                "inputValue": "11",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [11],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/date-picker",
            "selector": "fdp-date-picker",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 9,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "type",
                    "selectedDate",
                    "selectedMultipleDates",
                    "selectedRangeDate",
                    "selectedMultipleDateRanges",
                    "startingDayOfWeek",
                    "rangeHoverEffect",
                    "useValidation",
                    "showTodayButton",
                    "todayButtonLabel",
                    "allowNull",
                    "activeView",
                    "placement",
                    "appendTo",
                    "closeOnDateChoose",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "showWeekNumbers",
                    "allowMultipleSelection",
                    "isOpen",
                    "inline",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "disableRangeStartFunction",
                    "disableRangeEndFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                "dirty": true,
                "inputValue": "edited",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    }
                ],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/date-picker",
            "selector": "fdp-date-picker",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "addon-pointer",
            "fixtureIndex": 9,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "type",
                    "selectedDate",
                    "selectedMultipleDates",
                    "selectedRangeDate",
                    "selectedMultipleDateRanges",
                    "startingDayOfWeek",
                    "rangeHoverEffect",
                    "useValidation",
                    "showTodayButton",
                    "todayButtonLabel",
                    "allowNull",
                    "activeView",
                    "placement",
                    "appendTo",
                    "closeOnDateChoose",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "showWeekNumbers",
                    "allowMultipleSelection",
                    "isOpen",
                    "inline",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "disableRangeStartFunction",
                    "disableRangeEndFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--appointment-2"
            },
            "after": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["true"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "TD"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/datetime-picker",
            "selector": "fdp-datetime-picker",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 8,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "placement",
                    "appendTo",
                    "meridian",
                    "displaySeconds",
                    "displayMinutes",
                    "displayHours",
                    "useValidation",
                    "isOpen",
                    "startingDayOfWeek",
                    "activeView",
                    "allowNull",
                    "keepTwoDigitsTime",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "spinnerButtons",
                    "showWeekNumbers",
                    "showFooter",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 12,
                    "hour": 18,
                    "minute": 12,
                    "second": 51
                },
                "dirty": false,
                "inputValue": "11/12/2026, 6:12 PM",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                "dirty": true,
                "inputValue": "edited",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    }
                ],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/datetime-picker",
            "selector": "fdp-datetime-picker",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "addon-pointer",
            "fixtureIndex": 8,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "placement",
                    "appendTo",
                    "meridian",
                    "displaySeconds",
                    "displayMinutes",
                    "displayHours",
                    "useValidation",
                    "isOpen",
                    "startingDayOfWeek",
                    "activeView",
                    "allowNull",
                    "keepTwoDigitsTime",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "spinnerButtons",
                    "showWeekNumbers",
                    "showFooter",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 12,
                    "hour": 18,
                    "minute": 12,
                    "second": 51
                },
                "dirty": false,
                "inputValue": "11/12/2026, 6:12 PM",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--date-time"
            },
            "after": {
                "model": {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 12,
                    "hour": 18,
                    "minute": 12,
                    "second": 51
                },
                "dirty": false,
                "inputValue": "11/12/2026, 6:12 PM",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "TD"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "host-pointer",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": "acceptAll",
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-CHECKBOX",
                "class": "ng-untouched ng-pristine ng-valid is-cozy"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "FD-CHECKBOX"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "label-DOM",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": "acceptAll",
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "native-DOM",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": "acceptAll",
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/checkbox",
            "selector": "fd-checkbox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "Space",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": "acceptAll",
                "publicInputs": [
                    "wrapLabel",
                    "valignLabel",
                    "ariaLabel",
                    "role",
                    "value",
                    "ariaLabelledBy",
                    "ariaDescribedBy",
                    "title",
                    "inputId",
                    "state",
                    "name",
                    "label",
                    "disabled",
                    "readonly",
                    "tristate",
                    "tristateSelectable",
                    "labelClass",
                    "required",
                    "displayOnly",
                    "values",
                    "standalone"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/switch",
            "selector": "fd-switch",
            "mode": "FormControlName",
            "readonlyPath": "_cva.readonly",
            "action": "label-pointer",
            "fixtureIndex": 8,
            "setup": {
                "formControlName": "switch1",
                "publicInputs": [
                    "activeText",
                    "inactiveText",
                    "id",
                    "required",
                    "checked",
                    "semantic",
                    "ariaLabel",
                    "ariaLabelledBy"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "fd-switch__icon--off fd-switch__icon sap-icon sap-icon--less"
            },
            "after": {
                "model": true,
                "dirty": true,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [true],
                "outputs": [true],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/switch",
            "selector": "fd-switch",
            "mode": "FormControlName",
            "readonlyPath": "_cva.readonly",
            "action": "Space",
            "fixtureIndex": 8,
            "setup": {
                "formControlName": "switch1",
                "publicInputs": [
                    "activeText",
                    "inactiveText",
                    "id",
                    "required",
                    "checked",
                    "semantic",
                    "ariaLabel",
                    "ariaLabelledBy"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": true,
                "dirty": true,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [true],
                "outputs": [true],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/radio-group",
            "selector": "fdp-radio-group",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "radio-label-pointer",
            "fixtureIndex": 4,
            "setup": {
                "formControlName": "month",
                "publicInputs": [
                    "selected",
                    "isInline",
                    "hasNoValue",
                    "noValueLabel",
                    "inlineLayout",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "february",
                "dirty": false,
                "inputValue": "january",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": true,
                "ariaChecked": "false",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "january",
                        "checked": false,
                        "disabled": true
                    },
                    {
                        "value": "february",
                        "checked": true,
                        "disabled": false
                    },
                    {
                        "value": "march",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "april",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "SPAN",
                "class": "fd-radio__text"
            },
            "after": {
                "model": "march",
                "dirty": true,
                "inputValue": "january",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": true,
                "ariaChecked": "false",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "january",
                        "checked": false,
                        "disabled": true
                    },
                    {
                        "value": "february",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "march",
                        "checked": true,
                        "disabled": false
                    },
                    {
                        "value": "april",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": ["march"],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/radio-group",
            "selector": "fdp-radio-group",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "radio-Space",
            "fixtureIndex": 4,
            "setup": {
                "formControlName": "month",
                "publicInputs": [
                    "selected",
                    "isInline",
                    "hasNoValue",
                    "noValueLabel",
                    "inlineLayout",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "february",
                "dirty": false,
                "inputValue": "january",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": true,
                "ariaChecked": "false",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "january",
                        "checked": false,
                        "disabled": true
                    },
                    {
                        "value": "february",
                        "checked": true,
                        "disabled": false
                    },
                    {
                        "value": "march",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "april",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "february",
                "dirty": false,
                "inputValue": "january",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": true,
                "ariaChecked": "false",
                "ariaReadonly": "false",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": false,
                "innerSwitchReadonly": null,
                "radios": [
                    {
                        "value": "january",
                        "checked": false,
                        "disabled": true
                    },
                    {
                        "value": "february",
                        "checked": true,
                        "disabled": false
                    },
                    {
                        "value": "march",
                        "checked": false,
                        "disabled": false
                    },
                    {
                        "value": "april",
                        "checked": false,
                        "disabled": false
                    }
                ],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/switch",
            "selector": "fdp-switch",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "label-pointer",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": "switch1",
                "publicInputs": [
                    "semantic",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "fd-switch__icon--off fd-switch__icon sap-icon sap-icon--less"
            },
            "after": {
                "model": true,
                "dirty": true,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [true],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/switch",
            "selector": "fdp-switch",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "Space",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": "switch1",
                "publicInputs": [
                    "semantic",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": true,
                "dirty": true,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": "true",
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [true],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/combobox",
            "selector": "fdp-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "field",
                "publicInputs": [
                    "maxHeight",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "fillControlMode",
                    "buttonFocusable",
                    "triggers",
                    "closeOnOutsideClick",
                    "byline",
                    "dataSource",
                    "value",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "name": "Strawberry",
                    "type": "Fruits"
                },
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": {
                    "name": "Strawberry",
                    "type": "Fruits"
                },
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/combobox",
            "selector": "fdp-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "input-ArrowDown",
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "field",
                "publicInputs": [
                    "maxHeight",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "fillControlMode",
                    "buttonFocusable",
                    "triggers",
                    "closeOnOutsideClick",
                    "byline",
                    "dataSource",
                    "value",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "name": "Strawberry",
                    "type": "Fruits"
                },
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": {
                    "name": "Strawberry",
                    "type": "Fruits"
                },
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/combobox",
            "selector": "fdp-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "addon-pointer",
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "field",
                "publicInputs": [
                    "maxHeight",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "fillControlMode",
                    "buttonFocusable",
                    "triggers",
                    "closeOnOutsideClick",
                    "byline",
                    "dataSource",
                    "value",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "name": "Strawberry",
                    "type": "Fruits"
                },
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "actionNote": "No add-on button rendered",
            "after": {
                "model": {
                    "name": "Strawberry",
                    "type": "Fruits"
                },
                "dirty": false,
                "inputValue": "Strawberry",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/input",
            "selector": "fdp-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 8,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "type",
                    "value",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/textarea",
            "selector": "fdp-textarea",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 11,
            "setup": {
                "formControlName": "detailedDescription",
                "publicInputs": [
                    "height",
                    "growingMaxLines",
                    "cols",
                    "wrapType",
                    "maxLength",
                    "showExceededText",
                    "growing",
                    "value",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Lorem ipsum, dolor sit amet",
                "dirty": false,
                "inputValue": "Lorem ipsum, dolor sit amet",
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "Lorem ipsum, dolor sit amet",
                "dirty": false,
                "inputValue": "Lorem ipsum, dolor sit amet",
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "TEXTAREA"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/step-input",
            "selector": "fdp-number-step-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "typing-number",
            "fixtureIndex": 15,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "description",
                    "value",
                    "min",
                    "max",
                    "step",
                    "stepFn",
                    "precision",
                    "largerStep",
                    "showLabels",
                    "align",
                    "incrementLabel",
                    "decrementLabel",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "0",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": 77,
                "dirty": true,
                "inputValue": "77",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [77],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/step-input",
            "selector": "fdp-number-step-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "input-ArrowUp",
            "fixtureIndex": 15,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "description",
                    "value",
                    "min",
                    "max",
                    "step",
                    "stepFn",
                    "precision",
                    "largerStep",
                    "showLabels",
                    "align",
                    "incrementLabel",
                    "decrementLabel",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "0",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": 1,
                "dirty": true,
                "inputValue": "1",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [1],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/step-input",
            "selector": "fdp-number-step-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "step-button-pointer",
            "fixtureIndex": 15,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "description",
                    "value",
                    "min",
                    "max",
                    "step",
                    "stepFn",
                    "precision",
                    "largerStep",
                    "showLabels",
                    "align",
                    "incrementLabel",
                    "decrementLabel",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "0",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--add"
            },
            "after": {
                "model": 1,
                "dirty": true,
                "inputValue": "1",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [1],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/date-picker",
            "selector": "fdp-date-picker",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "type",
                    "selectedDate",
                    "selectedMultipleDates",
                    "selectedRangeDate",
                    "selectedMultipleDateRanges",
                    "startingDayOfWeek",
                    "rangeHoverEffect",
                    "useValidation",
                    "showTodayButton",
                    "todayButtonLabel",
                    "allowNull",
                    "activeView",
                    "placement",
                    "appendTo",
                    "closeOnDateChoose",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "showWeekNumbers",
                    "allowMultipleSelection",
                    "isOpen",
                    "inline",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "disableRangeStartFunction",
                    "disableRangeEndFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "_isValid": true,
                    "year": 1990,
                    "month": 1,
                    "day": 2,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                "dirty": false,
                "inputValue": "1/2/1990",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                "dirty": true,
                "inputValue": "edited",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    }
                ],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/date-picker",
            "selector": "fdp-date-picker",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "addon-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "type",
                    "selectedDate",
                    "selectedMultipleDates",
                    "selectedRangeDate",
                    "selectedMultipleDateRanges",
                    "startingDayOfWeek",
                    "rangeHoverEffect",
                    "useValidation",
                    "showTodayButton",
                    "todayButtonLabel",
                    "allowNull",
                    "activeView",
                    "placement",
                    "appendTo",
                    "closeOnDateChoose",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "showWeekNumbers",
                    "allowMultipleSelection",
                    "isOpen",
                    "inline",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "disableRangeStartFunction",
                    "disableRangeEndFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "_isValid": true,
                    "year": 1990,
                    "month": 1,
                    "day": 2,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                "dirty": false,
                "inputValue": "1/2/1990",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--appointment-2"
            },
            "after": {
                "model": {
                    "_isValid": true,
                    "year": 1990,
                    "month": 1,
                    "day": 2,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                "dirty": false,
                "inputValue": "1/2/1990",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": ["true"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Open picker"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "TD"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/datetime-picker",
            "selector": "fdp-datetime-picker",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "placement",
                    "appendTo",
                    "meridian",
                    "displaySeconds",
                    "displayMinutes",
                    "displayHours",
                    "useValidation",
                    "isOpen",
                    "startingDayOfWeek",
                    "activeView",
                    "allowNull",
                    "keepTwoDigitsTime",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "spinnerButtons",
                    "showWeekNumbers",
                    "showFooter",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                "dirty": true,
                "inputValue": "edited",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    },
                    {
                        "_isValid": false,
                        "year": null,
                        "month": null,
                        "day": null,
                        "hour": null,
                        "minute": null,
                        "second": null
                    }
                ],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/datetime-picker",
            "selector": "fdp-datetime-picker",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "addon-pointer",
            "fixtureIndex": 5,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "value",
                    "placement",
                    "appendTo",
                    "meridian",
                    "displaySeconds",
                    "displayMinutes",
                    "displayHours",
                    "useValidation",
                    "isOpen",
                    "startingDayOfWeek",
                    "activeView",
                    "allowNull",
                    "keepTwoDigitsTime",
                    "state",
                    "buttonFocusable",
                    "specialDaysRules",
                    "yearGrid",
                    "aggregatedYearGrid",
                    "markWeekends",
                    "spinnerButtons",
                    "showWeekNumbers",
                    "showFooter",
                    "processInputOnBlur",
                    "preventScrollOnFocus",
                    "mobile",
                    "mobileConfig",
                    "mobileLandscape",
                    "mobilePortrait",
                    "showCalendarLegend",
                    "legendCol",
                    "disableFunction",
                    "placeholder",
                    "triggers",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--date-time"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": false,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": false,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Display calendar toggle"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "TD"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/checkbox",
            "selector": "fdp-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "host-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "title",
                    "label",
                    "tristate",
                    "checked",
                    "tristateSelectable",
                    "values",
                    "standalone",
                    "displayOnly",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-CHECKBOX",
                "class": "ng-untouched ng-pristine ng-valid is-cozy"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "FD-CHECKBOX"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/checkbox",
            "selector": "fdp-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "native-DOM",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "title",
                    "label",
                    "tristate",
                    "checked",
                    "tristateSelectable",
                    "values",
                    "standalone",
                    "displayOnly",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": true,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/checkbox",
            "selector": "fdp-checkbox",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "Space",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "title",
                    "label",
                    "tristate",
                    "checked",
                    "tristateSelectable",
                    "values",
                    "standalone",
                    "displayOnly",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": false,
                "dirty": false,
                "inputValue": "on",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": "false",
                "ariaReadonly": "true",
                "open": null,
                "expanded": [],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/multi-combobox",
            "selector": "fd-multi-combobox[formcontrolname=\"reactiveFormsCombo\"]",
            "mode": "FormControlName",
            "readonlyPath": "_cva.readonly",
            "action": "token-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": "reactiveFormsCombo",
                "publicInputs": [
                    "mobileConfig",
                    "selectedItems",
                    "value",
                    "showSelectAll",
                    "maxHeight",
                    "buttonFocusable",
                    "autoComplete",
                    "byline",
                    "bodyMaxWidth",
                    "entityClass",
                    "mobile",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "openDropdownOnAddOnClicked",
                    "fillControlMode",
                    "addonIconTitle",
                    "invalidEntryMessage",
                    "limitless",
                    "lookupKey",
                    "displayKey",
                    "list",
                    "invalidEntryDisplayTime",
                    "matchingStrategy"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "name": "Strawberry",
                        "type": "Fruits"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [
                    {
                        "text": "Strawberry",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-INPUT-GROUP",
                "class": "is-cozy"
            },
            "after": {
                "model": [
                    {
                        "name": "Strawberry",
                        "type": "Fruits"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [
                    {
                        "text": "Strawberry",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/multi-combobox",
            "selector": "fd-multi-combobox[formcontrolname=\"reactiveFormsCombo\"]",
            "mode": "FormControlName",
            "readonlyPath": "_cva.readonly",
            "action": "token-Delete",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": "reactiveFormsCombo",
                "publicInputs": [
                    "mobileConfig",
                    "selectedItems",
                    "value",
                    "showSelectAll",
                    "maxHeight",
                    "buttonFocusable",
                    "autoComplete",
                    "byline",
                    "bodyMaxWidth",
                    "entityClass",
                    "mobile",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "openDropdownOnAddOnClicked",
                    "fillControlMode",
                    "addonIconTitle",
                    "invalidEntryMessage",
                    "limitless",
                    "lookupKey",
                    "displayKey",
                    "list",
                    "invalidEntryDisplayTime",
                    "matchingStrategy"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "name": "Strawberry",
                        "type": "Fruits"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [
                    {
                        "text": "Strawberry",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": [],
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [[]],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/multi-combobox",
            "selector": "fdp-multi-combobox[formcontrolname=\"reactiveFormsCombo\"]",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "token-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": "reactiveFormsCombo",
                "publicInputs": [
                    "selectedItems",
                    "maxHeight",
                    "buttonFocusable",
                    "dataSource",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "value",
                    "fillControlMode",
                    "addonIconTitle",
                    "invalidEntryMessage",
                    "limitless",
                    "openDropdownOnAddOnClicked",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "name": "Strawberry",
                        "type": "Fruits"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [
                    {
                        "text": "Strawberry",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-INPUT-GROUP",
                "class": "fdp-multi-combobox-input-group-custom is-cozy"
            },
            "after": {
                "model": [
                    {
                        "name": "Strawberry",
                        "type": "Fruits"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [
                    {
                        "text": "Strawberry",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/multi-combobox",
            "selector": "fdp-multi-combobox[formcontrolname=\"reactiveFormsCombo\"]",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "token-Delete",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": "reactiveFormsCombo",
                "publicInputs": [
                    "selectedItems",
                    "maxHeight",
                    "buttonFocusable",
                    "dataSource",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "value",
                    "fillControlMode",
                    "addonIconTitle",
                    "invalidEntryMessage",
                    "limitless",
                    "openDropdownOnAddOnClicked",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "name": "Strawberry",
                        "type": "Fruits"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [
                    {
                        "text": "Strawberry",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": [],
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [[], []],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/multi-input",
            "selector": "fdp-multi-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "token-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "tokenHiddenId",
                    "type",
                    "autofocus",
                    "glyphAriaLabel",
                    "addonIconTitle",
                    "selected",
                    "selectionMode",
                    "hasByLine",
                    "disabled",
                    "fillControlMode",
                    "triggers",
                    "closeOnOutsideClick",
                    "addOnButtonClickFn",
                    "displayFn",
                    "maxHeight",
                    "dataSource",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "buttonFocusable",
                    "group",
                    "groupKey",
                    "description",
                    "avatarsrc",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "openDropdownOnAddOnClicked",
                    "value",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "state": "Alabama",
                        "city": "Montgomery"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "value-help"
                    }
                ],
                "tokens": [
                    {
                        "text": "Alabama",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "hitTarget": {
                "tag": "SPAN",
                "class": "fd-token__close"
            },
            "after": {
                "model": [],
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "value-help"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [[]],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/multi-input",
            "selector": "fdp-multi-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "token-Delete",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "tokenHiddenId",
                    "type",
                    "autofocus",
                    "glyphAriaLabel",
                    "addonIconTitle",
                    "selected",
                    "selectionMode",
                    "hasByLine",
                    "disabled",
                    "fillControlMode",
                    "triggers",
                    "closeOnOutsideClick",
                    "addOnButtonClickFn",
                    "displayFn",
                    "maxHeight",
                    "dataSource",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "buttonFocusable",
                    "group",
                    "groupKey",
                    "description",
                    "avatarsrc",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "openDropdownOnAddOnClicked",
                    "value",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "state": "Alabama",
                        "city": "Montgomery"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "value-help"
                    }
                ],
                "tokens": [
                    {
                        "text": "Alabama",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "after": {
                "model": [],
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "value-help"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [[]],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/multi-input",
            "selector": "fdp-multi-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "tokenHiddenId",
                    "type",
                    "autofocus",
                    "glyphAriaLabel",
                    "addonIconTitle",
                    "selected",
                    "selectionMode",
                    "hasByLine",
                    "disabled",
                    "fillControlMode",
                    "triggers",
                    "closeOnOutsideClick",
                    "addOnButtonClickFn",
                    "displayFn",
                    "maxHeight",
                    "dataSource",
                    "autoComplete",
                    "entityClass",
                    "mobile",
                    "mobileConfig",
                    "buttonFocusable",
                    "group",
                    "groupKey",
                    "description",
                    "avatarsrc",
                    "showSecondaryText",
                    "secondaryTextAlignment",
                    "autoResize",
                    "openDropdownOnAddOnClicked",
                    "value",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "placeholder",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "readonly",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name",
                    "width"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": [
                    {
                        "state": "Alabama",
                        "city": "Montgomery"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "value-help"
                    }
                ],
                "tokens": [
                    {
                        "text": "Alabama",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "after": {
                "model": [
                    {
                        "state": "Alabama",
                        "city": "Montgomery"
                    }
                ],
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "value-help"
                    }
                ],
                "tokens": [
                    {
                        "text": "Alabama",
                        "readonlySignal": false,
                        "closeVisible": true
                    }
                ],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/select",
            "selector": "fd-select",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "select-pointer",
            "fixtureIndex": 15,
            "setup": {
                "formControlName": "selectControl",
                "publicInputs": [
                    "extendedBodyTemplate",
                    "scrollStrategy",
                    "textOverflow",
                    "controlId",
                    "state",
                    "mobile",
                    "stateMessage",
                    "disabled",
                    "required",
                    "readonly",
                    "placeholder",
                    "value",
                    "maxHeight",
                    "glyph",
                    "glyphFont",
                    "closeOnOutsideClick",
                    "fillControlMode",
                    "controlTemplate",
                    "appendTo",
                    "unselectMissingOption",
                    "typeaheadDebounceInterval",
                    "ariaLabelledBy",
                    "ariaLabel",
                    "mobileConfig",
                    "inline",
                    "selectControlClass",
                    "selectDropdownButtonClass",
                    "advancedStateMessage",
                    "tabOutStrategy",
                    "ariaHasPopup",
                    "ariaDescription",
                    "compareWith"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Apple",
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "DIV",
                "class": "fd-select__text-content"
            },
            "after": {
                "model": "Apple",
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/select",
            "selector": "fd-select",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "select-keyboard",
            "fixtureIndex": 15,
            "setup": {
                "formControlName": "selectControl",
                "publicInputs": [
                    "extendedBodyTemplate",
                    "scrollStrategy",
                    "textOverflow",
                    "controlId",
                    "state",
                    "mobile",
                    "stateMessage",
                    "disabled",
                    "required",
                    "readonly",
                    "placeholder",
                    "value",
                    "maxHeight",
                    "glyph",
                    "glyphFont",
                    "closeOnOutsideClick",
                    "fillControlMode",
                    "controlTemplate",
                    "appendTo",
                    "unselectMissingOption",
                    "typeaheadDebounceInterval",
                    "ariaLabelledBy",
                    "ariaLabel",
                    "mobileConfig",
                    "inline",
                    "selectControlClass",
                    "selectDropdownButtonClass",
                    "advancedStateMessage",
                    "tabOutStrategy",
                    "ariaHasPopup",
                    "ariaDescription",
                    "compareWith"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Apple",
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "Apple",
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/select",
            "selector": "fdp-select",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "select-pointer",
            "fixtureIndex": 13,
            "setup": {
                "formControlName": "field",
                "publicInputs": [
                    "value",
                    "inline",
                    "maxHeight",
                    "mobile",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "glyph",
                    "glyphFont",
                    "appendTo",
                    "triggerValue",
                    "fillControlMode",
                    "secondaryTextAlignment",
                    "width",
                    "readonly",
                    "placeholder",
                    "closeOnOutsideClick",
                    "controlTemplate",
                    "mobileConfig",
                    "noValueLabel",
                    "noWrapText",
                    "autoResize",
                    "firstColumnRatio",
                    "secondColumnRatio",
                    "minWidth",
                    "maxWidth",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "DIV",
                "class": "fd-select__control is-default is-placeholder is-readonly"
            },
            "after": {
                "model": null,
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "platform/select",
            "selector": "fdp-select",
            "mode": "FormControlName",
            "readonlyPath": "readonly",
            "action": "select-keyboard",
            "fixtureIndex": 13,
            "setup": {
                "formControlName": "field",
                "publicInputs": [
                    "value",
                    "inline",
                    "maxHeight",
                    "mobile",
                    "group",
                    "groupKey",
                    "secondaryKey",
                    "showSecondaryText",
                    "glyph",
                    "glyphFont",
                    "appendTo",
                    "triggerValue",
                    "fillControlMode",
                    "secondaryTextAlignment",
                    "width",
                    "readonly",
                    "placeholder",
                    "closeOnOutsideClick",
                    "controlTemplate",
                    "mobileConfig",
                    "noValueLabel",
                    "noWrapText",
                    "autoResize",
                    "firstColumnRatio",
                    "secondColumnRatio",
                    "minWidth",
                    "maxWidth",
                    "tabOutStrategy",
                    "list",
                    "lookupKey",
                    "displayKey",
                    "triggers",
                    "state",
                    "stateMessage",
                    "stateMessageConfig",
                    "disabled",
                    "required",
                    "editable",
                    "validationStrategy",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaLabelledby",
                    "ariaDescribedBy",
                    "id",
                    "name"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "open": false,
                "expanded": ["false"],
                "buttons": [],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "NgModel",
            "readonlyPath": "readOnly",
            "action": "typing",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "NgModel",
            "readonlyPath": "readOnly",
            "action": "input-ArrowDown",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "NgModel",
            "readonlyPath": "readOnly",
            "action": "addon-pointer",
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--navigation-down-arrow"
            },
            "after": {
                "model": "",
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": true,
                "expanded": ["8"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readOnly",
            "action": "typing",
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "itemOnDropdownMode",
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readOnly",
            "action": "input-ArrowDown",
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "itemOnDropdownMode",
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readOnly",
            "action": "addon-pointer",
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "itemOnDropdownMode",
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--navigation-down-arrow"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": true,
                "expanded": ["6"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "NgModel",
            "readonlyPath": "readOnly",
            "action": "clear-pointer",
            "enableClearButton": true,
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Apple",
                "dirty": false,
                "inputValue": "Apple",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": null
                    },
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--decline"
            },
            "after": {
                "model": "",
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [""],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "NgModel",
            "readonlyPath": "readOnly",
            "action": "clear-Enter",
            "enableClearButton": true,
            "fixtureIndex": 0,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": "Apple",
                "dirty": false,
                "inputValue": "Apple",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": null
                    },
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": "",
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Standard"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [""],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readOnly",
            "action": "clear-pointer",
            "enableClearButton": true,
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "itemOnDropdownMode",
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "displayedValue": "Apple",
                    "value": "AppleValue"
                },
                "dirty": false,
                "inputValue": "Apple",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": null
                    },
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "hitTarget": {
                "tag": "FD-ICON",
                "class": "sap-icon sap-icon--decline"
            },
            "after": {
                "model": null,
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [null],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/combobox",
            "selector": "fd-combobox",
            "mode": "FormControlName",
            "readonlyPath": "readOnly",
            "action": "clear-Enter",
            "enableClearButton": true,
            "fixtureIndex": 24,
            "setup": {
                "formControlName": "itemOnDropdownMode",
                "publicInputs": [
                    "comboboxId",
                    "inputId",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "required",
                    "dropdownValues",
                    "filterFn",
                    "disabled",
                    "placeholder",
                    "isSearch",
                    "glyph",
                    "glyphFont",
                    "showClearButton",
                    "triggers",
                    "closeOnOutsideClick",
                    "openOnKeyboardEvent",
                    "state",
                    "itemTemplate",
                    "groupFn",
                    "maxHeight",
                    "dropDownMaxWidthPx",
                    "noDropDownMaxWidth",
                    "width",
                    "searchFn",
                    "highlighting",
                    "closeOnSelect",
                    "fillOnSelect",
                    "autoComplete",
                    "fillControlMode",
                    "communicateByObject",
                    "displayFn",
                    "buttonFocusable",
                    "clearButtonFocusable",
                    "readOnly",
                    "mobile",
                    "mobileConfig",
                    "showDropdownButton",
                    "includes",
                    "title",
                    "byline",
                    "tabOutStrategy",
                    "valueProperty"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": {
                    "displayedValue": "Apple",
                    "value": "AppleValue"
                },
                "dirty": false,
                "inputValue": "Apple",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": null
                    },
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": true,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": "true",
                "open": false,
                "expanded": ["false"],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Select Options"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [null],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/step-input",
            "selector": "fd-step-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "typing-number",
            "fixtureIndex": 27,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "compact",
                    "readonly",
                    "disabled",
                    "required",
                    "locale",
                    "isFullWidth",
                    "localeMatcher",
                    "incrementButtonIcon",
                    "decrementButtonIcon",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaRoleDescription",
                    "inputId",
                    "value",
                    "min",
                    "max",
                    "step",
                    "name",
                    "inputTitle",
                    "disableWheel",
                    "mode",
                    "state",
                    "stateMessage",
                    "unit",
                    "useGrouping",
                    "minFractionDigits",
                    "maxFractionDigits",
                    "currency",
                    "currencyDisplay",
                    "hasStepButtons",
                    "textAlign",
                    "placeholder"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": 100,
                "dirty": false,
                "inputValue": "100",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": 100,
                "dirty": false,
                "inputValue": "100",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/step-input",
            "selector": "fd-step-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "input-ArrowUp",
            "fixtureIndex": 27,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "compact",
                    "readonly",
                    "disabled",
                    "required",
                    "locale",
                    "isFullWidth",
                    "localeMatcher",
                    "incrementButtonIcon",
                    "decrementButtonIcon",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaRoleDescription",
                    "inputId",
                    "value",
                    "min",
                    "max",
                    "step",
                    "name",
                    "inputTitle",
                    "disableWheel",
                    "mode",
                    "state",
                    "stateMessage",
                    "unit",
                    "useGrouping",
                    "minFractionDigits",
                    "maxFractionDigits",
                    "currency",
                    "currencyDisplay",
                    "hasStepButtons",
                    "textAlign",
                    "placeholder"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": 100,
                "dirty": false,
                "inputValue": "100",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": 100,
                "dirty": false,
                "inputValue": "100",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "BUTTON"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/step-input",
            "selector": "fd-step-input",
            "mode": "NgModel",
            "readonlyPath": "readonly",
            "action": "step-button-pointer",
            "fixtureIndex": 27,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "compact",
                    "readonly",
                    "disabled",
                    "required",
                    "locale",
                    "isFullWidth",
                    "localeMatcher",
                    "incrementButtonIcon",
                    "decrementButtonIcon",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaRoleDescription",
                    "inputId",
                    "value",
                    "min",
                    "max",
                    "step",
                    "name",
                    "inputTitle",
                    "disableWheel",
                    "mode",
                    "state",
                    "stateMessage",
                    "unit",
                    "useGrouping",
                    "minFractionDigits",
                    "maxFractionDigits",
                    "currency",
                    "currencyDisplay",
                    "hasStepButtons",
                    "textAlign",
                    "placeholder"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": 100,
                "dirty": false,
                "inputValue": "100",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "actionNote": "Step buttons hidden in readonly state",
            "after": {
                "model": 100,
                "dirty": false,
                "inputValue": "100",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/step-input",
            "selector": "fd-step-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "typing-number",
            "fixtureIndex": 25,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "compact",
                    "readonly",
                    "disabled",
                    "required",
                    "locale",
                    "isFullWidth",
                    "localeMatcher",
                    "incrementButtonIcon",
                    "decrementButtonIcon",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaRoleDescription",
                    "inputId",
                    "value",
                    "min",
                    "max",
                    "step",
                    "name",
                    "inputTitle",
                    "disableWheel",
                    "mode",
                    "state",
                    "stateMessage",
                    "unit",
                    "useGrouping",
                    "minFractionDigits",
                    "maxFractionDigits",
                    "currency",
                    "currencyDisplay",
                    "hasStepButtons",
                    "textAlign",
                    "placeholder"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/step-input",
            "selector": "fd-step-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "input-ArrowUp",
            "fixtureIndex": 25,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "compact",
                    "readonly",
                    "disabled",
                    "required",
                    "locale",
                    "isFullWidth",
                    "localeMatcher",
                    "incrementButtonIcon",
                    "decrementButtonIcon",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaRoleDescription",
                    "inputId",
                    "value",
                    "min",
                    "max",
                    "step",
                    "name",
                    "inputTitle",
                    "disableWheel",
                    "mode",
                    "state",
                    "stateMessage",
                    "unit",
                    "useGrouping",
                    "minFractionDigits",
                    "maxFractionDigits",
                    "currency",
                    "currencyDisplay",
                    "hasStepButtons",
                    "textAlign",
                    "placeholder"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "INPUT"
            },
            "status": "OBSERVED"
        },
        {
            "route": "core/step-input",
            "selector": "fd-step-input",
            "mode": "FormControlDirective",
            "readonlyPath": "readonly",
            "action": "step-button-pointer",
            "fixtureIndex": 25,
            "setup": {
                "formControlName": null,
                "publicInputs": [
                    "compact",
                    "readonly",
                    "disabled",
                    "required",
                    "locale",
                    "isFullWidth",
                    "localeMatcher",
                    "incrementButtonIcon",
                    "decrementButtonIcon",
                    "ariaLabel",
                    "ariaLabelledBy",
                    "ariaRoleDescription",
                    "inputId",
                    "value",
                    "min",
                    "max",
                    "step",
                    "name",
                    "inputTitle",
                    "disableWheel",
                    "mode",
                    "state",
                    "stateMessage",
                    "unit",
                    "useGrouping",
                    "minFractionDigits",
                    "maxFractionDigits",
                    "currency",
                    "currencyDisplay",
                    "hasStepButtons",
                    "textAlign",
                    "placeholder"
                ],
                "readonlyEnabled": true
            },
            "before": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "actionNote": "Step buttons hidden in readonly state",
            "after": {
                "model": null,
                "dirty": false,
                "inputValue": "",
                "checked": false,
                "nativeReadonly": true,
                "nativeDisabled": false,
                "ariaChecked": null,
                "ariaReadonly": null,
                "open": null,
                "expanded": [],
                "buttons": [
                    {
                        "disabled": false,
                        "label": "Decrement"
                    },
                    {
                        "disabled": false,
                        "label": "Increment"
                    }
                ],
                "tokens": [],
                "innerRadioReadonly": null,
                "innerSwitchReadonly": null,
                "radios": [],
                "events": [],
                "outputs": [],
                "activeTag": "DIV"
            },
            "status": "OBSERVED"
        }
    ]
}
```

</details>

<details>
<summary>All nine supplemental observations</summary>

```json
[
    {
        "route": "core/multi-combobox",
        "mode": "FormControlName",
        "action": "Input Backspace then Delete",
        "before": {
            "model": [
                {
                    "name": "Strawberry",
                    "type": "Fruits"
                }
            ],
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 1,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input fd-tokenizer__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": ""
            },
            "radios": []
        },
        "afterBackspace": {
            "model": [
                {
                    "name": "Strawberry",
                    "type": "Fruits"
                }
            ],
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 1,
            "focus": {
                "tag": "SPAN",
                "class": "fd-token"
            },
            "radios": []
        },
        "after": {
            "model": [],
            "dirty": true,
            "events": [[]],
            "nativeReadonly": true,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input fd-tokenizer__input ng-pristine ng-valid is-cozy ng-touched",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "platform/multi-combobox",
        "mode": "FormControlName",
        "action": "Input Backspace then Delete",
        "before": {
            "model": [
                {
                    "name": "Strawberry",
                    "type": "Fruits"
                }
            ],
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 1,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input fd-tokenizer__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": ""
            },
            "radios": []
        },
        "afterBackspace": {
            "model": [
                {
                    "name": "Strawberry",
                    "type": "Fruits"
                }
            ],
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 1,
            "focus": {
                "tag": "SPAN",
                "class": "fd-token"
            },
            "radios": []
        },
        "after": {
            "model": [],
            "dirty": true,
            "events": [[], []],
            "nativeReadonly": true,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input fd-tokenizer__input ng-pristine ng-valid is-cozy ng-touched",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "platform/multi-input",
        "mode": "NgModel",
        "action": "Input Backspace then Delete",
        "before": {
            "model": [
                {
                    "state": "Alabama",
                    "city": "Montgomery"
                }
            ],
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 1,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input fd-multi-input-tokenizer-input fd-tokenizer__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": ""
            },
            "radios": []
        },
        "afterBackspace": {
            "model": [
                {
                    "state": "Alabama",
                    "city": "Montgomery"
                }
            ],
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 1,
            "focus": {
                "tag": "SPAN",
                "class": "fd-token"
            },
            "radios": []
        },
        "after": {
            "model": [],
            "dirty": true,
            "events": [[]],
            "nativeReadonly": true,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input fd-multi-input-tokenizer-input fd-tokenizer__input ng-pristine ng-valid is-cozy ng-touched",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "platform/radio-group",
        "mode": "FormControlName",
        "action": "ArrowRight from selected radio",
        "before": {
            "model": "february",
            "dirty": false,
            "events": [],
            "nativeReadonly": false,
            "input": "january",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-radio is-compact ng-untouched ng-pristine ng-valid",
                "value": "february"
            },
            "radios": [
                {
                    "value": "january",
                    "checked": false,
                    "disabled": true
                },
                {
                    "value": "february",
                    "checked": true,
                    "disabled": false
                },
                {
                    "value": "march",
                    "checked": false,
                    "disabled": false
                },
                {
                    "value": "april",
                    "checked": false,
                    "disabled": false
                }
            ]
        },
        "after": {
            "model": "february",
            "dirty": false,
            "events": [],
            "nativeReadonly": false,
            "input": "january",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-radio is-compact ng-untouched ng-pristine ng-valid",
                "value": "march"
            },
            "radios": [
                {
                    "value": "january",
                    "checked": false,
                    "disabled": true
                },
                {
                    "value": "february",
                    "checked": true,
                    "disabled": false
                },
                {
                    "value": "march",
                    "checked": false,
                    "disabled": false
                },
                {
                    "value": "april",
                    "checked": false,
                    "disabled": false
                }
            ]
        }
    },
    {
        "route": "platform/date-picker",
        "mode": "NgModel",
        "action": "Valid date entry",
        "before": {
            "model": "",
            "dirty": false,
            "events": [],
            "nativeReadonly": false,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": ""
            },
            "radios": []
        },
        "after": {
            "model": {
                "_isValid": true,
                "year": 1990,
                "month": 1,
                "day": 3,
                "hour": 0,
                "minute": 0,
                "second": 0
            },
            "dirty": true,
            "events": [
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 1,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2019,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 199,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 1990,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                }
            ],
            "nativeReadonly": false,
            "input": "1/3/1990",
            "tokens": 0,
            "focus": {
                "tag": "BUTTON",
                "class": "fd-input-group__button fd-button fd-button--transparent is-cozy",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "platform/date-picker",
        "mode": "FormControlDirective",
        "action": "Valid date entry",
        "before": {
            "model": {
                "_isValid": true,
                "year": 1990,
                "month": 1,
                "day": 2,
                "hour": 0,
                "minute": 0,
                "second": 0
            },
            "dirty": false,
            "events": [],
            "nativeReadonly": false,
            "input": "1/2/1990",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": "1/2/1990"
            },
            "radios": []
        },
        "after": {
            "model": {
                "_isValid": true,
                "year": 1990,
                "month": 1,
                "day": 3,
                "hour": 0,
                "minute": 0,
                "second": 0
            },
            "dirty": true,
            "events": [
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 1,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2019,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 199,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 1990,
                    "month": 1,
                    "day": 3,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                }
            ],
            "nativeReadonly": false,
            "input": "1/3/1990",
            "tokens": 0,
            "focus": {
                "tag": "BUTTON",
                "class": "fd-input-group__button fd-button fd-button--transparent is-cozy",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "platform/datetime-picker",
        "mode": "NgModel",
        "action": "Valid date entry",
        "before": {
            "model": {
                "_isValid": true,
                "year": 2026,
                "month": 11,
                "day": 12,
                "hour": 18,
                "minute": 16,
                "second": 41
            },
            "dirty": false,
            "events": [],
            "nativeReadonly": false,
            "input": "11/12/2026, 6:16 PM",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": "11/12/2026, 6:16 PM"
            },
            "radios": []
        },
        "after": {
            "model": {
                "_isValid": true,
                "year": 2026,
                "month": 11,
                "day": 13,
                "hour": 19,
                "minute": 12,
                "second": 0
            },
            "dirty": true,
            "events": [
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 1,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2002,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2020,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 202,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 1,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 12,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 12,
                    "second": 0
                },
                {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 19,
                    "minute": 12,
                    "second": 0
                }
            ],
            "nativeReadonly": false,
            "input": "11/13/2026, 7:12 PM",
            "tokens": 0,
            "focus": {
                "tag": "BUTTON",
                "class": "fd-input-group__button fd-button fd-button--transparent is-cozy",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "platform/datetime-picker",
        "mode": "FormControlDirective",
        "action": "Valid date entry",
        "before": {
            "model": null,
            "dirty": false,
            "events": [],
            "nativeReadonly": false,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": ""
            },
            "radios": []
        },
        "after": {
            "model": {
                "_isValid": true,
                "year": 2026,
                "month": 11,
                "day": 13,
                "hour": 19,
                "minute": 12,
                "second": 0
            },
            "dirty": true,
            "events": [
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 1,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 1,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2001,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2002,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2020,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 202,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 0,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 1,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 12,
                    "second": 0
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 7,
                    "minute": 12,
                    "second": 0
                },
                {
                    "_isValid": false,
                    "year": null,
                    "month": null,
                    "day": null,
                    "hour": null,
                    "minute": null,
                    "second": null
                },
                {
                    "_isValid": true,
                    "year": 2026,
                    "month": 11,
                    "day": 13,
                    "hour": 19,
                    "minute": 12,
                    "second": 0
                }
            ],
            "nativeReadonly": false,
            "input": "11/13/2026, 7:12 PM",
            "tokens": 0,
            "focus": {
                "tag": "BUTTON",
                "class": "fd-input-group__button fd-button fd-button--transparent is-cozy",
                "value": ""
            },
            "radios": []
        }
    },
    {
        "route": "core/combobox",
        "mode": "NgModel",
        "action": "Dropdown visibility inspection",
        "before": {
            "model": "",
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "DIV",
                "class": "fd-docs-content"
            },
            "radios": []
        },
        "after": {
            "model": "",
            "dirty": false,
            "events": [],
            "nativeReadonly": true,
            "input": "",
            "tokens": 0,
            "focus": {
                "tag": "INPUT",
                "class": "fd-input fd-input-group__input ng-untouched ng-pristine ng-valid is-cozy",
                "value": ""
            },
            "radios": []
        },
        "details": {
            "componentOpen": true,
            "visibleBodies": 0,
            "expanded": "8"
        }
    }
]
```

</details>

## Self-contained diagnostic replay

Optional replay records observations rather than asserting every control passes. Save the entire block below as /private/tmp/form-controls-readonly-replay.cjs, keep docs running at port 4300, and execute from the repository root:

```sh
node /private/tmp/form-controls-readonly-replay.cjs
```

Both original callbacks are included. The portable wrapper loads Playwright from the current checkout and writes timestamped JSON under the system temporary directory (or READONLY_AUDIT_OUTPUT_DIR). The installed Chromium may differ from the recorded MCP Chromium 156.0.8078.74. Record the new source revision/browser/locale alongside any new output.

The callbacks reload every case. Primary token-Delete directly focuses a token; S01–S03 prove Backspace→Delete reachability from the input. Generic primary date typing uses invalid text; the supplement verifies valid dates. Some implementation fields are inspected for diagnostics; no handlers/native checked state are replaced. Runtime readonly setup does not establish initially-readonly coverage.

This wrapper has syntax validation only during consolidation; no fresh browser execution is claimed. Browser/local-server permissions depend on the execution environment. Fixture/probe errors must be diagnosed before classifying product behavior. The primary callback's generic method text is less precise than its explicit page.reload code; the preserved recorded metadata above states the corrected reload method.

<details>
<summary>Complete wrapper and original primary/supplemental callbacks</summary>

```js
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(path.resolve(process.cwd(), 'node_modules/playwright'));
const outputDirectory = path.resolve(
    process.env.READONLY_AUDIT_OUTPUT_DIR || path.join(os.tmpdir(), 'form-controls-readonly-audit-replay')
);
const primaryProbe = async (page) => {
    // Manual Chromium investigation. Uses existing documentation fixtures; no repository edits.
    page.setDefaultTimeout(3000);
    const cases = [];
    const add = (route, selector, mode, readonlyPath, actions, extra = {}) => {
        for (const action of actions) cases.push({ route, selector, mode, readonlyPath, action, ...extra });
    };
    for (const mode of ['NgModel', 'FormControlName']) {
        add('core/checkbox', 'fd-checkbox', mode, 'readonly', ['host-pointer', 'label-DOM', 'native-DOM', 'Space']);
        add('core/switch', 'fd-switch', mode, '_cva.readonly', ['label-pointer', 'Space']);
        add('platform/radio-group', 'fdp-radio-group', mode, 'readonly', ['radio-label-pointer', 'radio-Space']);
        add('platform/switch', 'fdp-switch', mode, 'readonly', ['label-pointer', 'Space']);
        add('platform/combobox', 'fdp-combobox', mode, 'readonly', ['typing', 'input-ArrowDown', 'addon-pointer']);
        add('platform/input', 'fdp-input', mode === 'FormControlName' ? 'FormControlDirective' : mode, 'readonly', [
            'typing'
        ]);
        add('platform/textarea', 'fdp-textarea', mode, 'readonly', ['typing']);
        add(
            'platform/step-input',
            'fdp-number-step-input',
            mode === 'FormControlName' ? 'FormControlDirective' : mode,
            'readonly',
            ['typing-number', 'input-ArrowUp', 'step-button-pointer']
        );
        add(
            'platform/date-picker',
            'fdp-date-picker',
            mode === 'FormControlName' ? 'FormControlDirective' : mode,
            'readonly',
            ['typing', 'addon-pointer']
        );
        add(
            'platform/datetime-picker',
            'fdp-datetime-picker',
            mode === 'FormControlName' ? 'FormControlDirective' : mode,
            'readonly',
            ['typing', 'addon-pointer']
        );
    }
    add('platform/checkbox', 'fdp-checkbox', 'NgModel', 'readonly', ['host-pointer', 'native-DOM', 'Space']);
    add(
        'core/multi-combobox',
        'fd-multi-combobox[formcontrolname="reactiveFormsCombo"]',
        'FormControlName',
        '_cva.readonly',
        ['token-pointer', 'token-Delete']
    );
    add(
        'platform/multi-combobox',
        'fdp-multi-combobox[formcontrolname="reactiveFormsCombo"]',
        'FormControlName',
        'readonly',
        ['token-pointer', 'token-Delete']
    );
    add('platform/multi-input', 'fdp-multi-input', 'NgModel', 'readonly', ['token-pointer', 'token-Delete', 'typing']);
    add('core/select', 'fd-select', 'FormControlName', 'readonly', ['select-pointer', 'select-keyboard']);
    add('platform/select', 'fdp-select', 'FormControlName', 'readonly', ['select-pointer', 'select-keyboard']);
    add('core/combobox', 'fd-combobox', 'NgModel', 'readOnly', ['typing', 'input-ArrowDown', 'addon-pointer']);
    add('core/combobox', 'fd-combobox', 'FormControlName', 'readOnly', ['typing', 'input-ArrowDown', 'addon-pointer']);
    add('core/combobox', 'fd-combobox', 'NgModel', 'readOnly', ['clear-pointer', 'clear-Enter'], {
        enableClearButton: true
    });
    add('core/combobox', 'fd-combobox', 'FormControlName', 'readOnly', ['clear-pointer', 'clear-Enter'], {
        enableClearButton: true
    });
    add('core/step-input', 'fd-step-input', 'NgModel', 'readonly', [
        'typing-number',
        'input-ArrowUp',
        'step-button-pointer'
    ]);
    add('core/step-input', 'fd-step-input', 'FormControlDirective', 'readonly', [
        'typing-number',
        'input-ArrowUp',
        'step-button-pointer'
    ]);
    const results = [];
    for (const entry of cases) {
        const row = { ...entry };
        try {
            await page.goto('http://127.0.0.1:4300/#/' + entry.route);
            // A same-URL hash navigation preserves Angular fixtures. Force a full document reload.
            await page.reload();
            await page.locator(entry.selector).first().waitFor({ timeout: 8000 });
            await page.waitForTimeout(80);
            const index = await page.locator(entry.selector).evaluateAll(
                (elements, mode) =>
                    elements.findIndex((e) => {
                        const c = ng.getComponent(e);
                        const f = ng.getDirectives(e).find((d) => d.constructor.name.replace(/^_/, '') === mode);
                        return !!f && !!f.control && !f.control.disabled && !c.disabled && !c._cva?.disabled;
                    }),
                entry.mode
            );
            if (index < 0) {
                row.status = 'NO_EXISTING_FIXTURE';
                results.push(row);
                continue;
            }
            const loc = page.locator(entry.selector).nth(index);
            row.fixtureIndex = index;
            row.setup = await loc.evaluate((e, entry) => {
                const c = ng.getComponent(e);
                const f = ng.getDirectives(e).find((d) => d.constructor.name.replace(/^_/, '') === entry.mode);
                const parts = entry.readonlyPath.split('.');
                let owner = c;
                for (const key of parts.slice(0, -1)) owner = owner[key];
                owner[parts.at(-1)] = true;
                if (entry.enableClearButton) {
                    c.showClearButton = true;
                    f.control.setValue(c.dropdownValues[0]);
                }
                f.control.markAsPristine();
                ng.applyChanges(c);
                window.__readonlyAudit = { c, f, e, entry, events: [], outputs: [] };
                f.control.valueChanges.subscribe((value) =>
                    window.__readonlyAudit.events.push(JSON.parse(JSON.stringify(value ?? null)))
                );
                if (c.checkedChange?.subscribe)
                    c.checkedChange.subscribe((value) => window.__readonlyAudit.outputs.push(value));
                return {
                    formControlName: e.getAttribute('formcontrolname'),
                    publicInputs: Object.keys(c.constructor.ɵcmp.inputs),
                    readonlyEnabled: owner[parts.at(-1)]
                };
            }, entry);
            const snapshot = () =>
                page.evaluate(() => {
                    const { c, f, e, entry, events, outputs } = window.__readonlyAudit;
                    const i = e.querySelector('input,textarea');
                    const coreRadio = e.querySelector('fd-radio-button');
                    const coreSwitch = e.matches('fdp-switch') && e.querySelector('fd-switch');
                    return {
                        model: JSON.parse(JSON.stringify(f.control.value ?? null)),
                        dirty: f.control.dirty,
                        inputValue: i?.value,
                        checked: i?.checked,
                        nativeReadonly: i?.readOnly,
                        nativeDisabled: i?.disabled,
                        ariaChecked: i?.getAttribute('aria-checked'),
                        ariaReadonly: i?.getAttribute('aria-readonly'),
                        open: c.isOpen ?? c._isOpen ?? c.open ?? null,
                        expanded: Array.from(e.querySelectorAll('[aria-expanded]')).map((n) =>
                            n.getAttribute('aria-expanded')
                        ),
                        buttons: Array.from(e.querySelectorAll('button')).map((n) => ({
                            disabled: n.disabled,
                            label: n.getAttribute('aria-label')
                        })),
                        tokens: Array.from(e.querySelectorAll('fd-token')).map((n) => ({
                            text: n.innerText,
                            readonlyInput: ng.getComponent(n)?.readOnly,
                            readonlySignal:
                                typeof ng.getComponent(n)?.readOnly === 'function'
                                    ? ng.getComponent(n).readOnly()
                                    : null,
                            closeVisible: !!n.querySelector('.fd-token__close')
                        })),
                        innerRadioReadonly: coreRadio ? ng.getComponent(coreRadio).readOnly : null,
                        innerSwitchReadonly: coreSwitch ? (ng.getComponent(coreSwitch)._cva.readonly ?? null) : null,
                        radios: Array.from(e.querySelectorAll('input[type=radio]')).map((n) => ({
                            value: n.value,
                            checked: n.checked,
                            disabled: n.disabled
                        })),
                        events: [...events],
                        outputs: [...outputs],
                        activeTag: document.activeElement?.tagName
                    };
                });
            row.before = await snapshot();
            const input = loc.locator('input,textarea').first();
            const physicalClick = async (target) => {
                await target.scrollIntoViewIfNeeded();
                const box = await target.boundingBox();
                if (!box) throw new Error('No physical target box');
                const x = box.x + box.width / 2,
                    y = box.y + box.height / 2;
                row.hitTarget = await page.evaluate(
                    ({ x, y }) => {
                        const e = document.elementFromPoint(x, y);
                        return { tag: e?.tagName, class: e?.className };
                    },
                    { x, y }
                );
                await page.mouse.click(x, y);
            };
            switch (entry.action) {
                case 'host-pointer':
                    await physicalClick(loc);
                    break;
                case 'label-pointer':
                    await physicalClick(loc.locator('label').first());
                    break;
                case 'label-DOM':
                    await loc
                        .locator('label')
                        .first()
                        .evaluate((e) => e.click());
                    break;
                case 'native-DOM':
                    await input.evaluate((e) => e.click());
                    break;
                case 'Space':
                    await input.focus();
                    await page.keyboard.press('Space');
                    break;
                case 'radio-label-pointer': {
                    const target = await loc
                        .locator('fd-radio-button')
                        .evaluateAll((es) =>
                            es.findIndex((e) => !e.querySelector('input').checked && !e.querySelector('input').disabled)
                        );
                    await physicalClick(loc.locator('fd-radio-button').nth(target).locator('label'));
                    break;
                }
                case 'radio-Space': {
                    const target = await loc
                        .locator('input[type=radio]')
                        .evaluateAll((es) => es.findIndex((e) => !e.checked && !e.disabled));
                    await loc.locator('input[type=radio]').nth(target).focus();
                    await page.keyboard.press('Space');
                    break;
                }
                case 'token-pointer':
                    await physicalClick(loc.locator('.fd-token__close').first());
                    break;
                case 'token-Delete':
                    await loc.locator('.fd-token').first().focus();
                    await page.keyboard.press('Delete');
                    break;
                case 'typing':
                case 'typing-number':
                    await input.focus();
                    await page.keyboard.press('ControlOrMeta+A');
                    await page.keyboard.type(entry.action === 'typing-number' ? '77' : 'edited');
                    await page.keyboard.press('Tab');
                    break;
                case 'input-ArrowDown':
                    await input.focus();
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('Enter');
                    break;
                case 'input-ArrowUp':
                    await input.focus();
                    await page.keyboard.press('ArrowUp');
                    await page.keyboard.press('Tab');
                    break;
                case 'addon-pointer': {
                    const buttons = loc.locator('button');
                    if ((await buttons.count()) === 0) row.actionNote = 'No add-on button rendered';
                    else await physicalClick(buttons.first());
                    break;
                }
                case 'step-button-pointer':
                    if (await loc.locator('button').last().isVisible())
                        await physicalClick(loc.locator('button').last());
                    else row.actionNote = 'Step buttons hidden in readonly state';
                    break;
                case 'clear-pointer':
                    await physicalClick(loc.locator('button:has(fd-icon[glyph="decline"])'));
                    break;
                case 'clear-Enter':
                    await loc.locator('button:has(fd-icon[glyph="decline"])').focus();
                    await page.keyboard.press('Enter');
                    break;
                case 'select-pointer':
                    await physicalClick(loc.locator('[role=combobox]').first());
                    break;
                case 'select-keyboard':
                    await loc.locator('[role=combobox]').first().focus();
                    await page.keyboard.press('Space');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('Enter');
                    break;
            }
            await page.waitForTimeout(100);
            row.after = await snapshot();
            row.status = 'OBSERVED';
        } catch (error) {
            row.status = 'PROBE_ERROR';
            row.error = String(error).slice(0, 700);
        }
        results.push(row);
    }
    const evidence = {
        timestamp: new Date().toISOString(),
        chromium: page.context().browser()?.version(),
        method: 'Existing dev docs fixtures; public readonly input or its exposed host directive set in memory, then ng.applyChanges; fresh navigation for every case; physical mouse and keyboard unless explicitly DOM click.',
        cases: results
    };
    return evidence;
};
const supplementalProbe = async (page) => {
    page.setDefaultTimeout(3000);
    const out = [];
    const load = async (route, selector, mode, path) => {
        await page.goto('http://127.0.0.1:4300/#/' + route);
        await page.reload();
        await page.locator(selector).first().waitFor();
        const idx = await page.locator(selector).evaluateAll(
            (es, mode) =>
                es.findIndex((e) => {
                    const f = ng.getDirectives(e).find((d) => d.constructor.name.replace(/^_/, '') === mode);
                    return f?.control && !f.control.disabled;
                }),
            mode
        );
        const loc = page.locator(selector).nth(idx);
        await loc.evaluate(
            (e, { mode, path }) => {
                const c = ng.getComponent(e);
                const f = ng.getDirectives(e).find((d) => d.constructor.name.replace(/^_/, '') === mode);
                if (path === '_cva.readonly') c._cva.readonly = true;
                else c[path] = true;
                f.control.markAsPristine();
                ng.applyChanges(c);
                window.supp = { c, f, e, events: [] };
                f.control.valueChanges.subscribe((v) => window.supp.events.push(JSON.parse(JSON.stringify(v ?? null))));
            },
            { mode, path }
        );
        return loc;
    };
    const state = () =>
        page.evaluate(() => {
            const { c, f, e, events } = window.supp;
            const i = e.querySelector('input');
            return {
                model: JSON.parse(JSON.stringify(f.control.value ?? null)),
                dirty: f.control.dirty,
                events: [...events],
                nativeReadonly: i.readOnly,
                input: i.value,
                tokens: e.querySelectorAll('fd-token').length,
                focus: {
                    tag: document.activeElement.tagName,
                    class: document.activeElement.className,
                    value: document.activeElement.value
                },
                radios: Array.from(e.querySelectorAll('input[type=radio]')).map((i) => ({
                    value: i.value,
                    checked: i.checked,
                    disabled: i.disabled
                }))
            };
        });
    for (const [route, selector, mode, path] of [
        [
            'core/multi-combobox',
            'fd-multi-combobox[formcontrolname="reactiveFormsCombo"]',
            'FormControlName',
            '_cva.readonly'
        ],
        ['platform/multi-combobox', 'fdp-multi-combobox', 'FormControlName', 'readonly'],
        ['platform/multi-input', 'fdp-multi-input', 'NgModel', 'readonly']
    ]) {
        const loc = await load(route, selector, mode, path);
        await loc.locator('input').focus();
        const before = await state();
        await page.keyboard.press('Backspace');
        const afterBackspace = await state();
        await page.keyboard.press('Delete');
        await page.waitForTimeout(80);
        out.push({ route, mode, action: 'Input Backspace then Delete', before, afterBackspace, after: await state() });
    }
    {
        const route = 'platform/radio-group',
            mode = 'FormControlName';
        const loc = await load(route, 'fdp-radio-group', mode, 'readonly');
        await loc.locator('input[type=radio]:checked').focus();
        const before = await state();
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(80);
        out.push({ route, mode, action: 'ArrowRight from selected radio', before, after: await state() });
    }
    for (const route of ['platform/date-picker', 'platform/datetime-picker'])
        for (const mode of ['NgModel', 'FormControlDirective']) {
            const selector = route.endsWith('/date-picker') ? 'fdp-date-picker' : 'fdp-datetime-picker';
            const loc = await load(route, selector, mode, 'readonly');
            await loc.locator('input').focus();
            const before = await state();
            await page.keyboard.press('ControlOrMeta+A');
            await page.keyboard.type(route.endsWith('/date-picker') ? '1/3/1990' : '11/13/2026, 7:12 PM');
            await page.keyboard.press('Tab');
            await page.waitForTimeout(80);
            out.push({ route, mode, action: 'Valid date entry', before, after: await state() });
        }
    {
        const loc = await load('core/combobox', 'fd-combobox', 'NgModel', 'readOnly');
        const before = await state();
        await loc.locator('button').first().click();
        await page.waitForTimeout(80);
        out.push({
            route: 'core/combobox',
            mode: 'NgModel',
            action: 'Dropdown visibility inspection',
            before,
            after: await state(),
            details: await loc.evaluate((e) => {
                const c = ng.getComponent(e);
                const p = ng.getComponent(e.querySelector('fd-popover'));
                return {
                    componentOpen: c.open,
                    popoverIsOpen: p.isOpen,
                    popoverDisabled: p.disabled,
                    visibleBodies: Array.from(document.querySelectorAll('fd-popover-body')).filter(
                        (e) => e.getBoundingClientRect().width && e.getBoundingClientRect().height
                    ).length,
                    expanded: e.querySelector('input').getAttribute('aria-expanded')
                };
            })
        });
    }
    return out;
};
(async () => {
    fs.mkdirSync(outputDirectory, { recursive: true });
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        for (const [name, run] of [
            ['primary', primaryProbe],
            ['supplement', supplementalProbe]
        ]) {
            const result = await run(page);
            const outputPath = path.join(outputDirectory, name + '-' + Date.now() + '.json');
            fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
            console.log(name + ': ' + (result.cases?.length ?? result.length) + ' observations: ' + outputPath);
        }
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

</details>
