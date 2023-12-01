import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FooterPosition, LayoutPanelFooterComponent } from './layout-panel-footer.component';

@Component({
    selector: 'fd-test-layout-panel-footer',
    template: `<fd-layout-panel-footer [position]="position"> </fd-layout-panel-footer> `,
    standalone: true,
    imports: [LayoutPanelFooterComponent]
})
class TestLayoutPanelFooterComponent {
    @ViewChild(LayoutPanelFooterComponent, { static: true, read: ElementRef })
    layoutPanelFooterElementRef: ElementRef;

    position: FooterPosition;
}

describe('LayoutPanelFooterComponent', () => {
    let layoutPanelFooterElementRef: ElementRef;
    let testComponent: TestLayoutPanelFooterComponent;
    let fixture: ComponentFixture<TestLayoutPanelFooterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestLayoutPanelFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLayoutPanelFooterComponent);
        layoutPanelFooterElementRef = fixture.componentInstance.layoutPanelFooterElementRef;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
        expect(layoutPanelFooterElementRef).toBeTruthy();
    });

    it('should apply modifier class for footer content position start/left', () => {
        testComponent.position = 'start';
        fixture.detectChanges();
        expect(layoutPanelFooterElementRef.nativeElement.classList.contains('fd-layout-panel__footer--start')).toBe(
            true
        );
    });

    it('should apply modifier class for footer content position end/right', () => {
        testComponent.position = 'end';
        fixture.detectChanges();
        expect(layoutPanelFooterElementRef.nativeElement.classList.contains('fd-layout-panel__footer--end')).toBe(true);
    });
});
