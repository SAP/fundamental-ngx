import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { whenStable } from '@fundamental-ngx/core/tests';
import { Subject, takeUntil } from 'rxjs';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent, BreadcrumbSeparatorStyle } from './breadcrumb.component';

@Component({
    selector: 'fd-breadcrumb-test-component',
    template: `
        <fd-breadcrumb [separatorStyle]="separatorStyle">
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
    imports: [BreadcrumbComponent, BreadcrumbItemComponent, LinkComponent, RouterLink]
})
class BreadcrumbWrapperComponent {
    @ViewChild(BreadcrumbComponent) breadcrumb: BreadcrumbComponent;
    separatorStyle: BreadcrumbSeparatorStyle = '';
}

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, BreadcrumbWrapperComponent],
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

    it('should apply default separator style', () => {
        const element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb')).toBe(true);
        expect(element.classList.contains('fd-breadcrumb--backslash')).toBe(false);
    });

    it('should apply backslash separator style', async () => {
        fixture.componentInstance.separatorStyle = 'backslash';
        fixture.detectChanges();
        await whenStable(fixture);

        const element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--backslash')).toBe(true);
    });

    it('should apply double-slash separator style', async () => {
        fixture.componentInstance.separatorStyle = 'double-slash';
        fixture.detectChanges();
        await whenStable(fixture);

        const element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--double-slash')).toBe(true);
    });

    it('should apply double-backslash separator style', async () => {
        fixture.componentInstance.separatorStyle = 'double-backslash';
        fixture.detectChanges();
        await whenStable(fixture);

        const element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--double-backslash')).toBe(true);
    });

    it('should apply greater-than separator style', async () => {
        fixture.componentInstance.separatorStyle = 'greater-than';
        fixture.detectChanges();
        await whenStable(fixture);

        const element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--greater-than')).toBe(true);
    });

    it('should apply double-greater-than separator style', async () => {
        fixture.componentInstance.separatorStyle = 'double-greater-than';
        fixture.detectChanges();
        await whenStable(fixture);

        const element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--double-greater-than')).toBe(true);
    });

    it('should update separator style when input changes', async () => {
        fixture.componentInstance.separatorStyle = 'backslash';
        fixture.detectChanges();
        await whenStable(fixture);

        let element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--backslash')).toBe(true);
        expect(element.classList.contains('fd-breadcrumb--greater-than')).toBe(false);

        fixture.componentInstance.separatorStyle = 'greater-than';
        fixture.detectChanges();
        await whenStable(fixture);

        element = fixture.nativeElement.querySelector('.fd-breadcrumb');
        expect(element.classList.contains('fd-breadcrumb--backslash')).toBe(false);
        expect(element.classList.contains('fd-breadcrumb--greater-than')).toBe(true);
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
