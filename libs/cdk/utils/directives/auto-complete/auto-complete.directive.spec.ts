import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AutoCompleteDirective } from './auto-complete.directive';

@Component({
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
            declarations: [TestComponent],
            imports: [AutoCompleteDirective]
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

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ stopPropagation: () => {}, preventDefault: () => {}, key: 'Enter' });

        expect(spy).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: true
        });
    });

    it('should complete Apple word and send event with outclose force', () => {
        const spy = jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'ArrowLeft' });

        expect(spy).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: false
        });
    });

    it('should stop completing word', () => {
        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Backspace' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('ap');
    });

    it('should not complete, when other word is written', () => {
        directive.inputText = 'SomeOtherWord';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });
        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Escape' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('SomeOtherWord');
    });
});
