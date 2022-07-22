import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkModule } from '@fundamental-ngx/core/link';
import { RtlService } from '@fundamental-ngx/core/utils';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { whenStable } from '@fundamental-ngx/core/tests';

@Component({
    selector: 'fd-breadcrumb-test-component',
    template: `
        <fd-breadcrumb>
            <fd-breadcrumb-item>
                <a fd-link [routerLink]="'#'">Breadcrumb Level 1</a>
            </fd-breadcrumb-item>
            <fd-breadcrumb-item>
                <a fd-link [routerLink]="'#'">Breadcrumb Level 2</a>
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

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbWrapperComponent],
                imports: [PopoverModule, MenuModule, IconModule, LinkModule, RouterModule, RouterTestingModule],
                providers: [RtlService],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(async () => {
        fixture = TestBed.createComponent(BreadcrumbWrapperComponent);

        await whenStable(fixture);

        component = fixture.componentInstance.breadcrumb;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle onResize - enlarging the screen', async () => {
        spyOn(component.elementRef.nativeElement.parentElement as Element, 'getBoundingClientRect').and.returnValue({
            width: component.elementRef.nativeElement.getBoundingClientRect().width + 100
        } as any);

        component.onResize();

        await whenStable(fixture);

        expect(component._collapsedBreadcrumbItems.length).toBe(0);
    });

    it('should handle onResize - shrinking the screen', () => {
        spyOn(component.elementRef.nativeElement.parentElement as Element, 'getBoundingClientRect').and.returnValue({
            width: component.elementRef.nativeElement.getBoundingClientRect().width / 2
        } as any);

        component.onResize();

        expect(component._collapsedBreadcrumbItems.length).toBeGreaterThan(1);
    });
});
