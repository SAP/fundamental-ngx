import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageSubheaderComponent } from './dynamic-page-subheader.component';

@Component({
    template: ` <fd-dynamic-page-subheader></fd-dynamic-page-subheader>`,
    providers: [DynamicPageService],
    imports: [DynamicPageModule]
})
class TestComponent {
    @ViewChild(DynamicPageSubheaderComponent) subHeader: DynamicPageSubheaderComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

describe('DynamicPageHeaderComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let subHeader: DynamicPageSubheaderComponent;
    let component: TestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        subHeader = component.subHeader;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should toggle pinned', () => {
        subHeader._pinned = false;
        subHeader.togglePinned();
        fixture.detectChanges();
        expect(component.dynamicPageService.pinned()).toBe(true);
    });

    it('should toggle collapse', () => {
        subHeader.collapsed = false;
        expect(component.dynamicPageService.collapsed()).toBe(false);

        subHeader.collapsed = true;
        expect(component.dynamicPageService.collapsed()).toBe(true);
    });

    it('should handle collapse from service', () => {
        subHeader.collapsed = false;
        component.dynamicPageService.collapsed.set(true);
        fixture.detectChanges();

        expect(subHeader.collapsed).toBe(true);
    });

    it('should update toggle button aria-label based on collapsed state', () => {
        // When expanded, should show "Collapse" label
        subHeader.collapsed = false;
        fixture.detectChanges();
        expect(subHeader._toggleButtonAriaLabel).toContain('Collapse');

        // When collapsed, should show "Expand" label
        subHeader.collapsed = true;
        fixture.detectChanges();
        expect(subHeader._toggleButtonAriaLabel).toContain('Expand');
    });

    it('should emit correct collapsed value when toggleCollapse is called', () => {
        const collapsedChangeSpy = jest.spyOn(subHeader.collapsedChange, 'emit');

        // Start expanded
        subHeader.collapsed = false;
        fixture.detectChanges();

        // Toggle to collapsed
        subHeader.toggleCollapse();
        fixture.detectChanges();
        expect(collapsedChangeSpy).toHaveBeenCalledWith(true);

        // Toggle back to expanded
        subHeader.toggleCollapse();
        fixture.detectChanges();
        expect(collapsedChangeSpy).toHaveBeenCalledWith(false);
    });
});
