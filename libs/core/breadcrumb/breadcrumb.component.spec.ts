import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { whenStable } from '@fundamental-ngx/core/tests';
import { filter, Subject, take, takeUntil } from 'rxjs';
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
                <span aria-current="page">Breadcrumb Level 3</span>
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

        component.hiddenItemsCount
            .pipe(
                filter((count) => count === 2),
                take(1)
            )
            .subscribe(() => {
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

    describe('arrow key navigation', () => {
        function createKeyboardEvent(keyCode: number, key: string): KeyboardEvent {
            return new KeyboardEvent('keydown', { key, bubbles: true });
        }

        it('should move focus to next link on ArrowRight', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            expect(links.length).toBeGreaterThanOrEqual(2);

            links[0].focus();
            expect(document.activeElement).toBe(links[0]);

            const event = createKeyboardEvent(RIGHT_ARROW, 'ArrowRight');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(links[1]);
        });

        it('should move focus to previous link on ArrowLeft', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            expect(links.length).toBeGreaterThanOrEqual(2);

            links[1].focus();
            expect(document.activeElement).toBe(links[1]);

            const event = createKeyboardEvent(LEFT_ARROW, 'ArrowLeft');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(links[0]);
        });

        it('should include aria-current span in the focus sequence with tabindex', async () => {
            await whenStable(fixture);
            const currentPageSpan = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
            expect(currentPageSpan).toBeTruthy();
            // Roving tabindex: only the first item has tabindex="0", the rest have "-1"
            expect(currentPageSpan.hasAttribute('tabindex')).toBe(true);
        });

        it('should navigate from last link to aria-current span on ArrowRight', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            const currentPageSpan = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
            expect(links.length).toBeGreaterThan(0);
            expect(currentPageSpan).toBeTruthy();

            const lastLink = links[links.length - 1];
            lastLink.focus();

            const event = createKeyboardEvent(RIGHT_ARROW, 'ArrowRight');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(currentPageSpan);
        });

        it('should navigate from aria-current span back to last link on ArrowLeft', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            const currentPageSpan = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
            expect(links.length).toBeGreaterThan(0);
            expect(currentPageSpan).toBeTruthy();

            currentPageSpan.focus();

            const event = createKeyboardEvent(LEFT_ARROW, 'ArrowLeft');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(links[links.length - 1]);
        });

        it('should not move focus before the first link on ArrowLeft', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            expect(links.length).toBeGreaterThan(0);

            links[0].focus();

            const event = createKeyboardEvent(LEFT_ARROW, 'ArrowLeft');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(links[0]);
        });

        it('should move focus to next link on ArrowDown', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            expect(links.length).toBeGreaterThanOrEqual(2);

            links[0].focus();

            const event = createKeyboardEvent(DOWN_ARROW, 'ArrowDown');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(links[1]);
        });

        it('should move focus to previous link on ArrowUp', async () => {
            await whenStable(fixture);
            const links = fixture.nativeElement.querySelectorAll('a.fd-link') as NodeListOf<HTMLElement>;
            expect(links.length).toBeGreaterThanOrEqual(2);

            links[1].focus();

            const event = createKeyboardEvent(UP_ARROW, 'ArrowUp');
            component.elementRef.nativeElement.dispatchEvent(event);

            expect(document.activeElement).toBe(links[0]);
        });
    });
});
