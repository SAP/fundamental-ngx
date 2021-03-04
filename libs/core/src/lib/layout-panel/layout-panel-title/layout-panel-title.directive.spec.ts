import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutPanelTitleDirective } from './layout-panel-title.directive';
import { LayoutPanelModule } from '../layout-panel.module';

@Component({
    template: ` <h1 #directiveElement fd-layout-panel-title>Test Text</h1> `
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
            declarations: [TestComponent],
            imports: [LayoutPanelModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-layout-panel__title');
    });
});
