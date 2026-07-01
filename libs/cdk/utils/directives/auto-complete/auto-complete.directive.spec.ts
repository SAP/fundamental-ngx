import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AutoCompleteDirective } from './auto-complete.directive';

@Component({
    standalone: true,
    imports: [AutoCompleteDirective],
    template: ` <input [options]="values" fdkAutoComplete />`
})
class TestComponent {
    @ViewChild(AutoCompleteDirective)
    autoCompleteDirective: AutoCompleteDirective;

    values: string[] = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}

describe('AutoCompleteDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: AutoCompleteDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = fixture.componentInstance.autoCompleteDirective;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should complete Apple word and send event with close force', () => {
        const spy = jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';
        (<any>directive)._elementRef.nativeElement.value = 'ap';

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive._handleKeyboardEvent(<any>{ stopPropagation: () => {}, preventDefault: () => {}, key: 'Enter' });

        expect(spy).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: true
        });
    });

    it('should complete Apple word and send event with outclose force', () => {
        const spy = jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';
        (<any>directive)._elementRef.nativeElement.value = 'ap';

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'ArrowLeft' });

        expect(spy).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: false
        });
    });

    it('should stop completing word', () => {
        directive.inputText = 'ap';
        (<any>directive)._elementRef.nativeElement.value = 'ap';

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Backspace' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('ap');
    });

    it('should not complete, when other word is written', () => {
        directive.inputText = 'SomeOtherWord';
        (<any>directive)._elementRef.nativeElement.value = 'SomeOtherWord';

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });
        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Escape' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('SomeOtherWord');
    });

    it('should not autocomplete when user types non-matching character after partial match', () => {
        // Simulate: user types "A" -> autocompletes to "Apple", then user types "x"
        // Expected: should not autocomplete to "Apple" since "Ax" doesn't match
        directive.inputText = 'A';
        (<any>directive)._elementRef.nativeElement.value = 'Apple';
        (<any>directive)._elementRef.nativeElement.setSelectionRange(1, 5);

        // User types 'x', changing value from 'Apple' (selected) to 'Ax'
        directive.inputText = 'Ax';
        (<any>directive)._elementRef.nativeElement.value = 'Ax';

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'x' });

        // Should remain 'Ax' and not autocomplete back to 'Apple'
        expect((<any>directive)._elementRef.nativeElement.value).toBe('Ax');
    });

    it('should autocomplete when native value matches the start of an option', () => {
        // Simulate: user types "Ban"
        directive.inputText = 'Ban';
        (<any>directive)._elementRef.nativeElement.value = 'Ban';

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'n' });

        // Should autocomplete to "Banana"
        expect((<any>directive)._elementRef.nativeElement.value).toBe('Banana');
    });

    it('should autocomplete correctly when NgModel re-pushes stale value before keyup (race condition)', () => {
        // Reproduces the actual race: user types Ctrl+A → Delete → 'B' fast.
        // 1. input event fires with insertText 'B' → _lastInputEventValue = 'B'
        // 2. NgModel re-pushes stale 'Apple' back to el.value before keyup fires
        // 3. keyup fires → fix must use _lastInputEventValue ('B'), not el.value ('Apple')
        // Without the fix, el.value='Apple' is used as currentNativeValue and autocomplete
        // searches for options matching 'Apple', producing 'AppBana'-style output.

        const el = (<any>directive)._elementRef.nativeElement;

        // Step 1: fire a real input event so _lastInputEventValue is populated with 'B'
        el.value = 'B';
        el.setSelectionRange(1, 1);
        el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: 'B' }));

        // Step 2: NgModel re-pushes stale 'Apple' (simulates the race — CD hasn't cleared yet)
        el.value = 'Apple';
        directive.inputText = 'Apple';

        // Step 3: keyup arrives — directive must use _lastInputEventValue ('B'), not el.value ('Apple')
        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'b' });

        // 'B' matches 'Banana' — should autocomplete to 'Banana', not search from 'Apple'
        expect(el.value).toBe('Banana');
        // Selection starts at 1 (length of 'B'), not 5 (length of stale 'Apple')
        expect(el.selectionStart).toBe(1);
        expect(el.selectionEnd).toBe(6);
    });
});
