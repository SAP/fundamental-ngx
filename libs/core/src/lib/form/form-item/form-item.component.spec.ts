import { FormItemComponent } from './form-item.component';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    selector: 'fd-test-component',
    template: '<div #componentElement fd-form-item [horizontal]="horizontal" [isInline]="inline">FormItem</div>'
})
export class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;


    horizontal: boolean = false;

    inline: boolean = false;
}

describe('FormItemComponent', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormItemComponent, TestComponent]
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
        expect(component.ref.nativeElement.className).toBe('fd-form-item');
    });

    it('should support horizontal', () => {
        component.horizontal = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-form-item--horizontal');
    });

    it('should support isInline', () => {
        component.inline = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-form-item--inline');
    });
});
