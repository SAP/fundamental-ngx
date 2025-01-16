import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutPanelModule } from '../layout-panel.module';

@Component({
    template: ` <h5 #directiveElement fd-layout-panel-title>Test Text</h5> `,
    standalone: true,
    imports: [LayoutPanelModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('LayoutPanelTitleDirective', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-title fd-title--h5');
    });
});
