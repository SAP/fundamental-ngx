import { FormItemDirective } from './form-item.directive';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    selector: 'fd-test-component',
    template: '<div #directiveElement fd-form-item [isCheck]="check" [isInline]="inline">FormItem</div>'
})
export class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;

    check: boolean = false;

    inline: boolean = false;
}

describe('FormItemDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormItemDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign item class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-form__item');
    });

    it('should support isCheck', () => {
        component.check = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-form__item--check');
    });

    it('should support isInline', () => {
        component.inline = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-form__item--inline');
    });
});
