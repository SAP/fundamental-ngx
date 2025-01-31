import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { DynamicPageModule } from '../../dynamic-page.module';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageSubheaderComponent } from './dynamic-page-subheader.component';

@Component({
    template: ` <fd-dynamic-page-subheader></fd-dynamic-page-subheader>`,
    providers: [DynamicPageService],
    standalone: true,
    imports: [CommonModule, DynamicPageModule]
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
        let visibilityChanged = false;
        component.dynamicPageService.subheaderVisibilityChange
            .pipe(first())
            .subscribe(() => (visibilityChanged = true));
        subHeader.collapsed = false;
        subHeader.collapsed = true;

        expect(visibilityChanged).toBe(true);
        expect(component.dynamicPageService.collapsed()).toBe(true);
    });

    it('should handle collapse from service', () => {
        subHeader.collapsed = false;
        component.dynamicPageService.collapsed.set(true);
        fixture.detectChanges();

        expect(subHeader.collapsed).toBe(true);
    });
});
