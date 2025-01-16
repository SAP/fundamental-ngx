import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelModule } from '../panel.module';

@Component({
    template: `<h5 #directiveElement fd-panel-title>Test Panel Title Text</h5>`,
    standalone: true,
    imports: [PanelModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
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
        expect(component.ref.nativeElement.className).toBe('fd-panel__title');
    });
});
