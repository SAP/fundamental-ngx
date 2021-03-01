import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OptionItem } from '@fundamental-ngx/platform';
import { AutoCompleteDirective } from './auto-complete.directive';

@Component({
    template: '<input [options]="options" fdp-auto-complete>'
})
class TestComponent {
    @ViewChild(AutoCompleteDirective)
    autoCompleteDirective: AutoCompleteDirective;

    options: OptionItem[] = [{
        label: 'Apple',
        value: 'Apple'
    }, {
        label: 'Pineapple',
        value: 'Pineapple'
    }, {
        label: 'Banana',
        value: 'Banana'
    }, {
        label: 'Kiwi',
        value: 'Kiwi'
    }, {
        label: 'Strawberry',
        value: 'Strawberry'
    }];
}

describe('AutoCompleteDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: AutoCompleteDirective;

    beforeEach(waitForAsync(() => {
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

    // TODO: Unskip after fix
    xit('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO: Unskip after fix
    xit('should complete Apple word and send event with close force', () => {
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Enter' });

        expect(directive.onComplete.emit).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: true
        });
    });

    // TODO: Unskip after fix
    xit('should complete Apple word and send event with outclose force', () => {
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'ArrowLeft' } );

        expect(directive.onComplete.emit).toHaveBeenCalledWith({
            term: 'Apple',
            forceClose: false
        });
    });

    // TODO: Unskip after fix
    xit('should stop completing word', () => {
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'ap';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('Apple');

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Backspace' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('ap');
    });

    it('should not complete, when other word is written', () => {
        spyOn(directive.onComplete, 'emit');

        directive.inputText = 'SomeOtherWord';

        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'p' });
        directive.handleKeyboardEvent(<any>{ preventDefault: () => {}, key: 'Escape' });

        expect((<any>directive)._elementRef.nativeElement.value).toBe('SomeOtherWord');
    });
});
