import { SimpleChange, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { firstValueFrom } from 'rxjs';
import { MultiInputComponent, OptionItem } from './multi-input.component';

describe('MultiInputComponent', () => {
    let component: MultiInputComponent;
    let fixture: ComponentFixture<MultiInputComponent>;

    /**
     * ngOnChanges is not being called when input values are set to component instance directly.
     * `updateComponentInput` function adds this logic
     */
    function updateComponentInput(inputName: string, value: any): void {
        component[inputName] = value;
        component.ngOnChanges({
            [inputName]: new SimpleChange(null, value, false)
        });
        fixture.detectChanges();
    }

    /**
     * Returns option items from component instance
     */
    function optionItems(): OptionItem<any, any>[] {
        return component['_optionItems'];
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MultiInputComponent],
            providers: [DynamicComponentService, RtlService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiInputComponent);
        component = fixture.componentInstance;
        updateComponentInput('dropdownValues', ['displayedValue', 'displayedValue2']);
        fixture.detectChanges();
    });

    it('should set placeholder', async () => {
        await fixture.whenStable();

        const placeholder = 'placeholder';
        component.placeholder = placeholder;
        (component as any)._changeDetRef.markForCheck();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input').placeholder).toBe(placeholder);
    });

    it('should handle search term change', async () => {
        await fixture.whenStable();
        const searchTermChangeSpy = jest.spyOn(component.searchTermChange, 'emit');
        const filterFnSpy = jest.spyOn(component, 'filterFn');
        const openChangeHandleSpy = jest.spyOn(component, 'openChangeHandle');

        const text = 'test';
        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        // openChangeHandle will be triggered by keydown event
        inputElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));

        await fixture.whenStable();

        expect(component.searchTerm).toBe(text);
        expect(searchTermChangeSpy).toHaveBeenCalled();
        expect(filterFnSpy).toHaveBeenCalled();
        expect(openChangeHandleSpy).toHaveBeenCalledWith(true);
    });

    it('should filter dropdown values', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);

        const filterFnSpy = jest.spyOn(component, 'filterFn');

        const text = 'foo';
        const inputElement = fixture.nativeElement.querySelector('.fd-input');
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(filterFnSpy).toHaveBeenCalled();
        expect(component.dropdownValues.length).toBe(3);
        const vm = await firstValueFrom(component._viewModel$);
        expect(vm.displayedOptions.length).toBe(1);
    });

    it('should open/close popover on input addon click', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);
        component.open = false;

        const inputButtonElement = fixture.nativeElement.querySelector('.fd-input-group__button');
        inputButtonElement.click();
        fixture.detectChanges();
        expect(component.open).toBe(true);

        inputButtonElement.click();
        fixture.detectChanges();

        expect(component.open).toBe(false);
    });

    it('should select values', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);
        fixture.detectChanges();
        component.open = true;
        fixture.detectChanges();

        component.selected = ['test1'];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fd-token')).toBeTruthy();
    });

    it('should de-select values', async () => {
        await fixture.whenStable();
        updateComponentInput('dropdownValues', ['test1', 'test2', 'foobar']);
        component.open = true;
        fixture.detectChanges();

        component.selected = ['test1'];
        fixture.detectChanges();

        expect(component.selected.length).toBe(1);
        expect(component.selected[0]).toBe('test1');

        component.selected = [];
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fd-token')).toBeFalsy();
    });

    it('should bring back values, if canceled on mobile mode and dont emit changes', async () => {
        component.mobile = true;

        const changeSpy = jest.spyOn(component, 'onChange');
        const selectedChangeSpy = jest.spyOn(component.selectedChange, 'emit');

        await fixture.whenStable();

        component._handleSelect(true, optionItems()[0]);

        expect(changeSpy).not.toHaveBeenCalled();
        expect(selectedChangeSpy).not.toHaveBeenCalled();

        expect(component.selected).toEqual([component.dropdownValues[0]]);

        component.dialogDismiss([]);

        expect(component.selected).toEqual([]);
    });

    it('should emit changes values on approve', async () => {
        component.mobile = true;

        const changeSpy = jest.spyOn(component, 'onChange');
        const selectedChangeSpy = jest.spyOn(component.selectedChange, 'emit');

        await fixture.whenStable();

        component._handleSelect(true, optionItems()[0]);

        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.selectedChange.emit).not.toHaveBeenCalled();
        expect(component.selected).toEqual([component.dropdownValues[0]]);

        component.dialogApprove();

        expect(changeSpy).toHaveBeenCalled();
        expect(selectedChangeSpy).toHaveBeenCalled();
        expect(component.selected).toEqual([component.dropdownValues[0]]);
    });

    it('should focus the input and clear the search term after selection', async () => {
        const inputFocusSpy = jest.spyOn(component.searchInputElement.nativeElement, 'focus');

        await fixture.whenStable();

        component.searchTerm = 'search';

        component._handleSelect(true, component.dropdownValues[0]);

        expect(inputFocusSpy).toHaveBeenCalled();
        expect(component.searchTerm).toBe('');
    });

    it('should handle showAll button', async () => {
        await fixture.whenStable();
        const event = new MouseEvent('click');
        updateComponentInput('searchTerm', 'term');
        updateComponentInput('dropdownValues', ['term1', 'term2', 'value']);
        const preventSpy = jest.spyOn(event, 'preventDefault');
        const propagationSpy = jest.spyOn(event, 'stopPropagation');
        component._showAllClicked(event);
        expect(preventSpy).toHaveBeenCalled();
        expect(propagationSpy).toHaveBeenCalled();
        expect(component.searchTerm).toBe('');

        const vm = await firstValueFrom(component._viewModel$);

        expect(vm.displayedOptions.length).toBe(component.dropdownValues.length);
    });

    it('should support object values', async () => {
        updateComponentInput('searchTerm', 'f');
        updateComponentInput(
            'dropdownValues',
            ['foo', 'baz', 'bar'].map((v) => ({ value: v, name: v.toUpperCase() }))
        );
        updateComponentInput('valueFn', (el) => el.value);
        updateComponentInput('displayFn', (el) => el.name);
        updateComponentInput('selected', ['foo']);

        const vm = await firstValueFrom(component._viewModel$);
        expect(vm.displayedOptions.length).toEqual(1);
        expect(component.selected).toEqual(['foo']);
    });

    it('should keep selected options when list of options is changed', async () => {
        updateComponentInput('dropdownValues', ['foo', 'baz', 'bar']);
        updateComponentInput('selected', ['foo1']);

        const vm1 = await firstValueFrom(component._viewModel$);
        expect(vm1.displayedOptions.length).toEqual(3);
        expect(vm1.selectedOptions.length).toEqual(1);
        expect(component.selected).toEqual(['foo1']);

        component._handleSelect(true, optionItems()[1]);

        const vm2 = await firstValueFrom(component._viewModel$);
        expect(vm2.displayedOptions.length).toEqual(3);
        // displaying only those options that were "seen" as values
        expect(vm2.selectedOptions.map((o) => o.value)).toEqual(['foo1', 'baz']);
        // expecting options to be present as values even if they doesn't match any provided options
        expect(component.selected).toEqual(['foo1', 'baz']);

        updateComponentInput('dropdownValues', ['foo1']);

        const vm3 = await firstValueFrom(component._viewModel$);
        expect(vm3.displayedOptions.length).toEqual(1);
        expect(vm3.selectedOptions.map((o) => o.value)).toEqual(['foo1', 'baz']);
        // displaying only those options that were "seen" as values
        expect(component.selected).toEqual(['foo1', 'baz']);
    });

    it('should selectAll values  selectAllItems call with true and deselect all items it call with false', async () => {
        await fixture.whenStable();

        updateComponentInput('dropdownValues', ['test1', 'test2', 'test3']);
        component.selectAllItems(true);
        fixture.detectChanges();

        expect(component.selected).toEqual(['test1', 'test2', 'test3']);

        component.selectAllItems(false);
        fixture.detectChanges();

        expect(component.selected).toEqual([]);
    });

    it('should not open dropdown when openDropdownOnAddOnClicked is false', () => {
        const buttonSpy = jest.spyOn(component.addOnButtonClicked, 'emit');
        const openSpy = jest.spyOn(component, 'openChangeHandle');
        component.openDropdownOnAddOnClicked = false;
        component._addOnButtonClicked(new MouseEvent('click'));
        expect(buttonSpy).toHaveBeenCalled();
        expect(openSpy).not.toHaveBeenCalled();
    });

    it('should disable pointer events and prevent tab focus when disabled', () => {
        const element = component.elementRef.nativeElement;

        component.setDisabledState(true);
        fixture.detectChanges();

        expect(element.style.pointerEvents).toBe('none');
        expect(element.tabIndex).toBe(-1);
    });

    it('should enable pointer events and allow tab focus when enabled', () => {
        const element = component.elementRef.nativeElement;

        component.setDisabledState(false);
        fixture.detectChanges();

        expect(element.style.pointerEvents).toBe('auto');
        expect(element.tabIndex).toBe(0);
    });

    describe('token virtualization (A1: multi-input owned)', () => {
        async function setSelected(count: number): Promise<void> {
            await fixture.whenStable();
            const values = Array.from({ length: count }, (_, i) => `item${i}`);
            updateComponentInput('dropdownValues', values);
            component.selected = values;
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();
        }

        function getInputEl(): HTMLInputElement {
            return fixture.nativeElement.querySelector('input.fd-input') as HTMLInputElement;
        }

        function tokenCount(): number {
            return fixture.nativeElement.querySelectorAll('fd-token').length;
        }

        function moreEl(): HTMLElement | null {
            return fixture.nativeElement.querySelector('.fd-tokenizer-more') as HTMLElement | null;
        }

        it('maxVisibleTokens defaults to 12', () => {
            expect(component.maxVisibleTokens()).toBe(12);
        });

        it('renders only the slice when over the limit (no focus): 50 selected → 12 tokens + "+N more"', async () => {
            await setSelected(50);

            expect(tokenCount()).toBe(12);
            const indicator = moreEl();
            expect(indicator).not.toBeNull();
            expect(indicator!.textContent).toContain('38');
        });

        it('renders the full set when within the limit: 8 selected → 8 tokens, no "+N more"', async () => {
            await setSelected(8);

            expect(tokenCount()).toBe(8);
            expect(moreEl()).toBeNull();
        });

        it('renders the full set on focus: 50 selected → focus event → 50 tokens, no "+N more"', async () => {
            await setSelected(50);
            expect(tokenCount()).toBe(12);

            const inputEl = getInputEl();
            inputEl.dispatchEvent(new FocusEvent('focus'));
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(tokenCount()).toBe(50);
            expect(moreEl()).toBeNull();
        });

        it('collapses on blur when relatedTarget is outside the host: 50 → focus → focusout(external) → 12 + "+N more"', async () => {
            await setSelected(50);
            const inputEl = getInputEl();

            inputEl.dispatchEvent(new FocusEvent('focus'));
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(tokenCount()).toBe(50);

            const externalTarget = document.createElement('button');
            document.body.appendChild(externalTarget);
            try {
                fixture.nativeElement.dispatchEvent(
                    new FocusEvent('focusout', { relatedTarget: externalTarget, bubbles: true })
                );
                fixture.detectChanges();
                await fixture.whenStable();
                fixture.detectChanges();

                expect(tokenCount()).toBe(12);
                expect(moreEl()).not.toBeNull();
            } finally {
                document.body.removeChild(externalTarget);
            }
        });

        it('keeps full set when relatedTarget is inside the host (e.g. clicking a token): 50 stays 50', async () => {
            await setSelected(50);
            const inputEl = getInputEl();

            inputEl.dispatchEvent(new FocusEvent('focus'));
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();
            expect(tokenCount()).toBe(50);

            const internalTarget = fixture.nativeElement.querySelector('fd-token') as HTMLElement;
            expect(internalTarget).toBeTruthy();

            fixture.nativeElement.dispatchEvent(
                new FocusEvent('focusout', { relatedTarget: internalTarget, bubbles: true })
            );
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(tokenCount()).toBe(50);
        });

        it('does NOT render its own "+N more" when tokenizer already shows one (regression: double indicator bug)', async () => {
            // Regression guard for the double-indicator bug (PR #14137).
            // Old code: @if (hiddenCount() > 0) — fires even when tokenizer has its own indicator.
            // Fix introduces showOwnMoreIndicator() which reads tokenizer.hasInternalOverflowIndicator().
            // The test fails on pre-fix code because showOwnMoreIndicator does not exist there.
            fixture.componentRef.setInput('maxVisibleTokens', 12);
            await setSelected(20);

            // Precondition: more tokens selected than maxVisibleTokens — hidden tokens exist.
            expect(fixture.nativeElement.querySelectorAll('fd-token').length).toBeLessThan(20);

            // Activate tokenizer's width-collapse: mark a rendered token as display:none (satisfies
            // _hiddenTokens.length > 0) and set _showMoreElement signal to true.
            // This makes tokenizer.hasInternalOverflowIndicator() → true.
            const firstToken = component.tokenizer.tokenList.first;
            firstToken.elementRef.nativeElement.style.display = 'none';
            // _showMoreElement is a signal on the fix branch; set it to true to simulate width-collapse.
            (component.tokenizer._showMoreElement as ReturnType<typeof signal>).set(true);

            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();

            // hasInternalOverflowIndicator() must now be true (tokenizer has a visible overflow span).
            expect(component.tokenizer.hasInternalOverflowIndicator()).toBe(true);
            // DOM: at most ONE .fd-tokenizer-more span total — the tokenizer's own.
            // Multi-input must not add a second one. The bug rendered two simultaneously.
            expect(fixture.nativeElement.querySelectorAll('.fd-tokenizer-more').length).toBeLessThanOrEqual(1);
        });

        it('"+N more" click expands the slice and calls tokenizer._showAllTokens()', async () => {
            await setSelected(50);
            const indicator = moreEl();
            expect(indicator).not.toBeNull();

            const showAllSpy = jest.spyOn(component.tokenizer, '_showAllTokens');

            indicator!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(showAllSpy).toHaveBeenCalled();
            expect(tokenCount()).toBe(50);
            expect(moreEl()).toBeNull();
        });

        describe('a11y keyboard activation (Task 3.2)', () => {
            it('"+N more" indicator is focusable: tabindex="0" and role="button"', async () => {
                await setSelected(50);
                const indicator = moreEl();
                expect(indicator).not.toBeNull();
                expect(indicator!.getAttribute('tabindex')).toBe('0');
                expect(indicator!.getAttribute('role')).toBe('button');
            });

            it('Enter on "+N more" expands the slice and calls tokenizer._showAllTokens()', async () => {
                await setSelected(50);
                const indicator = moreEl();
                expect(indicator).not.toBeNull();

                const showAllSpy = jest.spyOn(component.tokenizer, '_showAllTokens');

                indicator!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                fixture.detectChanges();
                await fixture.whenStable();
                fixture.detectChanges();

                expect(showAllSpy).toHaveBeenCalled();
                expect(tokenCount()).toBe(50);
                expect(moreEl()).toBeNull();
            });

            it('Space on "+N more" expands the slice, calls tokenizer._showAllTokens(), and calls preventDefault()', async () => {
                await setSelected(50);
                const indicator = moreEl();
                expect(indicator).not.toBeNull();

                const showAllSpy = jest.spyOn(component.tokenizer, '_showAllTokens');
                const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
                const preventSpy = jest.spyOn(spaceEvent, 'preventDefault');

                indicator!.dispatchEvent(spaceEvent);
                fixture.detectChanges();
                await fixture.whenStable();
                fixture.detectChanges();

                expect(preventSpy).toHaveBeenCalled();
                expect(showAllSpy).toHaveBeenCalled();
                expect(tokenCount()).toBe(50);
                expect(moreEl()).toBeNull();
            });
        });
    });
});
