import { PortalModule } from '@angular/cdk/portal';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkModule } from '@fundamental-ngx/core/link';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { whenStable } from '@fundamental-ngx/core/tests';
import { I18nModule } from '@fundamental-ngx/i18n';

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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbWrapperComponent],
            imports: [
                PopoverModule,
                MenuModule,
                IconModule,
                LinkModule,
                RouterModule,
                RouterTestingModule,
                OverflowLayoutModule,
                PortalModule,
                I18nModule
            ],
            providers: [RtlService],
            schemas: [NO_ERRORS_SCHEMA]
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

    it('should handle onResize - enlarging the screen', fakeAsync(() => {
        const hiddenItemsCountSpy = jest.spyOn(component, '_onHiddenItemsCountChange');

        component.elementRef.nativeElement.parentElement!.style.width = '500px';
        component.onResize();

        tick(1000);

        expect(hiddenItemsCountSpy).toHaveBeenCalledWith(0);
    }));

    it('should handle onResize - shrinking the screen', fakeAsync(() => {
        const hiddenItemsCountSpy = jest.spyOn(component, '_onHiddenItemsCountChange');

        component.elementRef.nativeElement.parentElement!.style.width = '200px';
        component.onResize();
        fixture.detectChanges();

        tick(1000);

        expect(hiddenItemsCountSpy).toHaveBeenCalledWith(2);
    }));
});
