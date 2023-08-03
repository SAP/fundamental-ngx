import { PortalModule } from '@angular/cdk/portal';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { Subject, takeUntil } from 'rxjs';

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

    it('should handle onResize - enlarging the screen', (doneFn) => {
        const containerWidth = 200;
        const itemWidth = 50;
        const hiddenItemsCountSpy = jest.spyOn(component, '_onHiddenItemsCountChange');
        const done$ = new Subject<void>();

        component.hiddenItemsCount.pipe(takeUntil(done$)).subscribe(() => {
            expect(hiddenItemsCountSpy).toHaveBeenCalledWith(0);
            done$.next();
            done$.complete();
            doneFn();
        });

        jest.spyOn(
            (component as any)._overflowLayout._elementRef.nativeElement,
            'getBoundingClientRect'
        ).mockReturnValue({
            width: containerWidth
        });

        jest.spyOn((component as any)._overflowLayout._overflowLayoutService, '_getElementWidth').mockImplementation(
            () => itemWidth
        );
        component.onResize();
    });

    it('should handle onResize - shrinking the screen', (doneFn) => {
        const containerWidth = 200;
        const itemWidth = 100;
        const hiddenItemsCountSpy = jest.spyOn(component, '_onHiddenItemsCountChange');

        component.hiddenItemsCount.subscribe(() => {
            expect(hiddenItemsCountSpy).toHaveBeenCalledWith(2);
            doneFn();
        });

        jest.spyOn(
            (component as any)._overflowLayout._elementRef.nativeElement,
            'getBoundingClientRect'
        ).mockReturnValue({
            width: containerWidth
        });

        jest.spyOn((component as any)._overflowLayout._overflowLayoutService, '_getElementWidth').mockImplementation(
            () => itemWidth
        );
        component.onResize();
        fixture.detectChanges();
    });
});
