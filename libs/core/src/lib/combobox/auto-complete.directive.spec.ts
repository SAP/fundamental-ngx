import { AutoCompleteDirective } from './auto-complete.directive';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    template: ` <input [options]="values" fd-auto-complete>`
})
class TestComponent {
    @ViewChild(AutoCompleteDirective)
    autoCompleteDirective: AutoCompleteDirective;

    values: string[] = ['Apple', 'Pineapple', 'Banana', 'Kiwi', 'Strawberry'];
}

fdescribe('AutoCompleteDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: AutoCompleteDirective;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutoCompleteDirective, TestComponent]
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
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'p', code: 'KeyP' }));

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter' }));

        expect(directive.onComplete.emit).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: true
        });
    });

    it('should complete Apple word and send event with outclose force', () => {
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'p', code: 'KeyP'}));

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft', code: 'ArrowLeft' }));

        expect(directive.onComplete.emit).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: false
        });
    });

    it('should stop completing word', () => {
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'p', code: 'KeyP' }));

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(new KeyboardEvent('keyup', { key: 'Backspace', code: 'Backspace' }));

        expect((<any>directive)._elementRef.nativeElement.value).toBe('App');
    });
});
