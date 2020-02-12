import { BreadcrumbComponent } from './breadcrumb.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MenuModule,
    PopoverModule,
    IconModule,
    BreadcrumbItemDirective,
    BreadcrumbLinkDirective
} from '@fundamental-ngx/core';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'fd-breadcrumb-test-component',
    template: `
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="'#'">Breadcrumb Level 1</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-breadcrumb-link [attr.href]="'#'">Breadcrumb Level 2</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <span>Breadcrumb Level 3</span>
            </fd-breadcrumb-item>
        </fd-breadcrumb>
    `
})
class BreadcrumbWrapperComponent {}

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbLinkDirective, BreadcrumbWrapperComponent],
            imports: [PopoverModule, MenuModule, IconModule, RouterModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle onResize - enlarging the screen', () => {
        spyOn(component, 'collapseBreadcrumbs');
        spyOn(component, 'expandBreadcrumbs');
        component.previousWindowInnerWidth = 1;
        spyOnProperty(window, 'innerWidth').and.returnValue(2);

        // move breadcrumbItems into collapsed array first
        component.breadcrumbItems.forEach(item => {
            component.collapsedBreadcrumbItems.push(item);
        });

        component.onResize();

        expect(component.expandBreadcrumbs).toHaveBeenCalled();
        expect(component.collapseBreadcrumbs).not.toHaveBeenCalled();
        expect(component.previousWindowInnerWidth).toBe(2);
    });

    it('should handle onResize - shrinking the screen', () => {
        spyOn(component, 'collapseBreadcrumbs');
        spyOn(component, 'expandBreadcrumbs');
        component.previousWindowInnerWidth = 2;
        spyOnProperty(window, 'innerWidth').and.returnValue(1);

        component.onResize();

        expect(component.expandBreadcrumbs).not.toHaveBeenCalled();
        expect(component.collapseBreadcrumbs).toHaveBeenCalled();
        expect(component.previousWindowInnerWidth).toBe(1);
    });

    it('should collapse the breadcrumbs', () => {
        spyOnProperty(component.elementRef.nativeElement, 'offsetWidth').and.returnValue(2);
        spyOnProperty(window, 'innerWidth').and.returnValue(1);

        component.collapseBreadcrumbs();

        component.breadcrumbItems.forEach(item => {
            expect(item.elementRef.nativeElement.style.display).toBe('none');
        });
        expect(component.collapsedBreadcrumbItems.length).toBe(3);
    });

    it('should expand all of the breadcrumbs', () => {
        // move breadcrumbItems into collapsed array first
        component.breadcrumbItems.forEach(item => {
            component.collapsedBreadcrumbItems.push(item);
            item.elementRef.nativeElement.style.display = 'none';
        });

        spyOnProperty(window, 'innerWidth').and.returnValue(2);
        spyOnProperty(component.elementRef.nativeElement, 'offsetWidth').and.returnValue(1);

        component.expandBreadcrumbs();

        component.breadcrumbItems.forEach(item => {
            expect(item.elementRef.nativeElement.style.display).toBe('inline-block');
            expect(item.elementRef.nativeElement.style.visibility).toBe('visible');
        });
        expect(component.collapsedBreadcrumbItems.length).toBe(0);
    });
});
