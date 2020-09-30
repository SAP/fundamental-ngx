import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGridSpanDirective } from './layout-grid-span.directive';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-component',
    template: '<div #directiveElement fd-layout-grid-span [columnSpan]="columnSpan">Span</div>'
})
export class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
    columnSpan: number;
}

describe('LayoutGridSpanDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutGridSpanDirective, TestComponent]
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

    it('should support colymn span class', () => {
        component.columnSpan = 3;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-layout-grid__span-column-3');
    });
});
