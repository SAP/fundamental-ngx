import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverModule } from '../popover/popover.module';
import { IconModule } from '../icon/icon.module';
import { MenuModule } from '../menu/menu.module';
import { RtlService } from '../utils/services/rtl.service';
import { RouterModule } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { whenStable } from '../utils/tests/when-stable';
import { BreadcrumbItemDirective, BreadcrumbLinkDirective } from './public_api';
@Component({
    selector: 'fd-breadcrumb-test-component',
    template: `
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Level 1</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [routerLink]="'#'" [queryParams]="'#'">Breadcrumb Level 2</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <span>Breadcrumb Level 3</span>
            </fd-breadcrumb-item>
        </fd-breadcrumb>
    `
})
class BreadcrumbWrapperComponent {
    @ViewChild(BreadcrumbComponent) breadcrumb: BreadcrumbComponent;
}

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BreadcrumbComponent,
                BreadcrumbItemDirective,
                BreadcrumbLinkDirective,
                BreadcrumbWrapperComponent
            ],
            imports: [PopoverModule, MenuModule, IconModule, RouterModule, RouterTestingModule],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(BreadcrumbWrapperComponent);

        await whenStable(fixture);

        component = fixture.componentInstance.breadcrumb;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle onResize - enlarging the screen', async () => {
        spyOn(component.elementRef.nativeElement.parentElement, 'getBoundingClientRect').and.returnValue({ width: 3 });
        spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        spyOn(component, 'collapseBreadcrumbs');
        spyOn(component, 'expandBreadcrumbs');
        component.previousContainerWidth = 2;

        // move breadcrumbItems into collapsed array first
        component.breadcrumbItems.forEach((item) => {
            component.collapsedBreadcrumbItems.push(item);
        });

        component.onResize();

        await whenStable(fixture);

        expect(component.expandBreadcrumbs).toHaveBeenCalled();
        expect(component.collapseBreadcrumbs).not.toHaveBeenCalled();

        expect(component.previousContainerWidth).toBe(3);
    });

    it('should handle onResize - shrinking the screen', () => {
        spyOn(component, 'collapseBreadcrumbs');
        spyOn(component, 'expandBreadcrumbs');
        spyOn(component.elementRef.nativeElement.parentElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 3 });
        component.previousContainerWidth = 2;

        component.onResize();

        expect(component.expandBreadcrumbs).not.toHaveBeenCalled();
        expect(component.collapseBreadcrumbs).toHaveBeenCalled();
        expect(component.previousContainerWidth).toBe(1);
    });

    it('should collapse the breadcrumbs', async () => {
        spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 2 });
        spyOn(component, 'getContainerBoundary').and.returnValue(1);

        component.collapseBreadcrumbs();

        await whenStable(fixture);

        component.breadcrumbItems.forEach((item) => {
            expect(item.elementRef.nativeElement.style.display).toBe('none');
        });

        expect(component.collapsedBreadcrumbItems.length).toBe(3);
    });

    it('should expand all of the breadcrumbs', () => {
        // collapse all the breadcrumbs first
        spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 3 });
        spyOn(component, 'getContainerBoundary').and.returnValue(2);
        component.collapseBreadcrumbs();

        component.elementRef.nativeElement.getBoundingClientRect.and.returnValue({ width: 1 });

        component.expandBreadcrumbs();

        component.breadcrumbItems.forEach((item) => {
            expect(item.elementRef.nativeElement.style.display).toBe('inline-block');
            expect(item.elementRef.nativeElement.style.visibility).toBe('visible');
        });
        expect(component.collapsedBreadcrumbItems.length).toBe(0);
    });
});
