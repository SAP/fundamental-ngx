import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageSubheaderComponent } from './dynamic-page-subheader.component';

@Component({
    template: `
        <fd-dynamic-page-subheader></fd-dynamic-page-subheader>`,
    providers: [
        DynamicPageService
    ]
})
class TestComponent {

    @ViewChild(DynamicPageSubheaderComponent) subHeader: DynamicPageSubheaderComponent;

    constructor(
        public dynamicPageService: DynamicPageService
    ) {}
}

describe('DynamicPageHeaderComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let subHeader: DynamicPageSubheaderComponent;
    let component: TestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DynamicPageModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        subHeader = component.subHeader
    });


    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should toggle pinned', () => {
        subHeader._pinned = false;
        subHeader.togglePinned();
        fixture.detectChanges();
        expect(component.dynamicPageService.pinned.value).toBeTrue();
    });

    it('should toggle collapse', () => {
        let visibilityChanged = false;
        component.dynamicPageService.subheaderVisibilityChange.subscribe(() => visibilityChanged = true);
        subHeader.collapsed = false;
        subHeader.collapsed = true;

        expect(visibilityChanged).toBeTrue();
        expect(component.dynamicPageService.collapsed.value).toBeTrue();
    });

    it('should handle collapse from service', () => {
        subHeader.collapsed = false;
        component.dynamicPageService.collapsed.next(true);

        expect(subHeader.collapsed).toBeTrue();
    });

});
