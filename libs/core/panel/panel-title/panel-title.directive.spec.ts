import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelTitleDirective } from './panel-title.directive';

@Component({
    template: `<h5 #directiveElement fd-panel-title [wrap]="wrap()">Test Panel Title Text</h5>`,
    standalone: true,
    imports: [PanelTitleDirective]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;

    wrap = signal(true);
}

describe('PanelTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-panel__title');
    });

    it('should apply fd-panel__title--wrap by default', () => {
        expect(component.ref.nativeElement.classList).toContain('fd-panel__title--wrap');
    });

    it('should remove fd-panel__title--wrap when wrap is false', () => {
        component.wrap.set(false);
        fixture.detectChanges();
        expect(component.ref.nativeElement.classList).not.toContain('fd-panel__title--wrap');
    });
});
