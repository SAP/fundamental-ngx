import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OptionItem } from '@fundamental-ngx/platform/shared';
import { AutoCompleteDirective } from './auto-complete.directive';

@Component({
    template: '<input [options]="options" fdp-auto-complete>',
    standalone: true,
    imports: [AutoCompleteDirective]
})
class TestComponent {
    @ViewChild(AutoCompleteDirective)
    autoCompleteDirective: AutoCompleteDirective;

    options: OptionItem[] = [
        {
            label: 'Apple',
            value: 'Apple'
        },
        {
            label: 'Pineapple',
            value: 'Pineapple'
        },
        {
            label: 'Banana',
            value: 'Banana'
        },
        {
            label: 'Kiwi',
            value: 'Kiwi'
        },
        {
            label: 'Strawberry',
            value: 'Strawberry'
        }
    ];
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
        jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Enter' });

        expect(directive.onComplete.emit).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: true
        });
    });

    it('should complete Apple word and send event with outclose force', () => {
        jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'ArrowLeft' });

        expect(directive.onComplete.emit).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: false
        });
    });

    it('should stop completing word', () => {
        jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Backspace' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('ap');
    });

    it('should not complete, when other word is written', () => {
        jest.spyOn(directive.onComplete, 'emit');

        directive.inputText = 'SomeOtherWord';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });
        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Escape' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('SomeOtherWord');
    });
});
