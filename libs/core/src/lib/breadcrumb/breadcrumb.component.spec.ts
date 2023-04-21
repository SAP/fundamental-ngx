import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { RtlService } from '@fundamental-ngx/cdk/utils';
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
    `,
    standalone: true,
    imports: [BreadcrumbComponent, BreadcrumbItemComponent, LinkComponent, RouterTestingModule]
})
class BreadcrumbWrapperComponent {
    @ViewChild(BreadcrumbComponent) breadcrumb: BreadcrumbComponent;
}

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BreadcrumbWrapperComponent],
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
        const hiddenItemsCountSpy = spyOn(component, '_onHiddenItemsCountChange').and.callThrough();

        component.elementRef.nativeElement.parentElement!.style.width = '500px';
        component.onResize();

        tick(1000);

        expect(hiddenItemsCountSpy).toHaveBeenCalledWith(0);
    }));

    it('should handle onResize - shrinking the screen', fakeAsync(() => {
        const hiddenItemsCountSpy = spyOn(component, '_onHiddenItemsCountChange').and.callThrough();

        component.elementRef.nativeElement.parentElement!.style.width = '200px';
        component.onResize();
        fixture.detectChanges();

        tick(1000);

        expect(hiddenItemsCountSpy).toHaveBeenCalledWith(2);
    }));
});
