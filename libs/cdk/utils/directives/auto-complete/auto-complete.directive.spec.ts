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

    it('should handle fast typing without selecting last typed character', () => {
        // When typing quickly, inputText (model) can lag behind native input value.
        // This caused the autocomplete to select the last character the user just typed.
        // Example: typing "Week24" fast would result in "Wek24" or "Wee24"

        component.values = ['Test', 'Testing', 'Tesla'];
        fixture.detectChanges();

        // Simulate the race condition: Native value is 'Tes', but model is still 'Te'
        directive.inputText = 'Te'; // Stale model value (length = 2)
        (<any>directive)._elementRef.nativeElement.value = 'Tes'; // Current native value (length = 3)
        (<any>directive)._elementRef.nativeElement.setSelectionRange(3, 3); // Cursor at end, no selection

        // User just typed 's', triggering autocomplete
        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 's' });

        // Autocomplete should find 'Test' (first match that starts with 'Te', the model value)
        // and since 'Test' starts with 'Tes' (the native value), it should autocomplete
        expect((<any>directive)._elementRef.nativeElement.value).toBe('Test');

        // THE FIX: Selection should start at position 3 (current native length),
        // NOT position 2 (stale model length)
        // If it were 2, the 's' we just typed would be selected and overwritten by next keystroke (THE BUG)
        expect((<any>directive)._elementRef.nativeElement.selectionStart).toBe(3);
        expect((<any>directive)._elementRef.nativeElement.selectionEnd).toBe(4);
    });

    it('should sync selection start with current native value length, not stale model length', () => {
        // Direct test of the fix: selection range should use current native value length
        component.values = ['Testing', 'Test', 'Tested'];
        fixture.detectChanges();

        // Simulate: native value is 'Tes' but model is still 'Te' (1 char behind)
        directive.inputText = 'Te'; // Stale model value (length = 2)
        (<any>directive)._elementRef.nativeElement.value = 'Tes'; // Current native value (length = 3)

        directive._handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 's' });

        // Should autocomplete to "Testing"
        expect((<any>directive)._elementRef.nativeElement.value).toBe('Testing');
        // Selection should start at position 3 (current native length), NOT position 2 (stale model length)
        expect((<any>directive)._elementRef.nativeElement.selectionStart).toBe(3);
        // If it was 2, the 's' we just typed would be selected and overwritten by next keystroke
        expect((<any>directive)._elementRef.nativeElement.selectionEnd).toBe(7);
    });
});
