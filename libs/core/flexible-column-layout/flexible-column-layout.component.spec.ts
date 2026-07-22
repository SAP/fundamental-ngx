import { Component, input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { whenStable } from '@fundamental-ngx/core/tests';

import {
    DEFAULT_FLEXIBLE_LAYOUT_CONFIG,
    FD_FLEXIBLE_LAYOUT_CONFIG,
    FlexibleColumnLayout,
    ONE_COLUMN_END_FULL_SCREEN,
    ONE_COLUMN_MID_FULL_SCREEN,
    ONE_COLUMN_START_FULL_SCREEN,
    THREE_COLUMNS_END_EXPANDED,
    THREE_COLUMNS_END_MINIMIZED,
    THREE_COLUMNS_MID_EXPANDED,
    THREE_COLUMNS_START_MINIMIZED,
    TWO_COLUMNS_END_EXPANDED,
    TWO_COLUMNS_MID_EXPANDED,
    TWO_COLUMNS_START_EXPANDED
} from './constants';
import { FlexibleColumnLayoutComponent } from './flexible-column-layout.component';

function setViewport(width: number): void {
    window.innerWidth = width;
    const resizeEvt = new Event('resize');
    window.dispatchEvent(resizeEvt);
}

@Component({
    template: `
        <fd-flexible-column-layout
            [layout]="layout()"
            [backgroundDesign]="backgroundDesign()"
            [expandTitle]="expandTitle()"
            [collapseTitle]="collapseTitle()"
            [expandTitleStartBtn]="expandTitleStartBtn()"
            [collapseTitleStartBtn]="collapseTitleStartBtn()"
            [expandTitleEndBtn]="expandTitleEndBtn()"
            [collapseTitleEndBtn]="collapseTitleEndBtn()"
        >
            <ng-template #startColumn>
                <div [style.height.px]="800">
                    <h2>Start Column</h2>
                </div>
            </ng-template>
            <ng-template #midColumn>
                <div [style.height.px]="800">
                    <h2>Mid Column</h2>
                </div>
            </ng-template>
            <ng-template #endColumn>
                <div [style.height.px]="800">
                    <h2>End Column</h2>
                </div>
            </ng-template>
        </fd-flexible-column-layout>
    `,
    standalone: true,
    imports: [FlexibleColumnLayoutComponent]
})
class TestFlexibleColumnLayoutComponent {
    @ViewChild(FlexibleColumnLayoutComponent)
    flexibleColumnLayout: FlexibleColumnLayoutComponent;

    readonly layout = input<FlexibleColumnLayout>(ONE_COLUMN_START_FULL_SCREEN);
    readonly backgroundDesign = input('translucent');
    readonly expandTitle = input<string>(undefined);
    readonly collapseTitle = input<string>(undefined);
    readonly expandTitleStartBtn = input<string>(undefined);
    readonly collapseTitleStartBtn = input<string>(undefined);
    readonly expandTitleEndBtn = input<string>(undefined);
    readonly collapseTitleEndBtn = input<string>(undefined);
}
describe('FlexibleColumnLayoutComponent', () => {
    let testComponent: TestFlexibleColumnLayoutComponent;
    let fixture: ComponentFixture<TestFlexibleColumnLayoutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestFlexibleColumnLayoutComponent],
            providers: [
                {
                    provide: FD_FLEXIBLE_LAYOUT_CONFIG,
                    useValue: DEFAULT_FLEXIBLE_LAYOUT_CONFIG
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFlexibleColumnLayoutComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(testComponent).toBeTruthy();
    });

    it('should add modifier for backgroundDesign translucent option', async () => {
        await whenStable(fixture);
        const element = fixture.debugElement.query(By.css('.fd-flexible-column-layout--translucent'));
        expect(element).toBeTruthy();
    });

    it('should render start column', async () => {
        await whenStable(fixture);

        // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0]
            .nativeElement;
        expect(startColumn.style.width).toBe('100%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(0);
    });

    it('ONE_COLUMN_MID_FULL_SCREEN should render one column', async () => {
        await whenStable(fixture);

        fixture.componentRef.setInput('layout', ONE_COLUMN_MID_FULL_SCREEN);
        fixture.detectChanges();

        // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        expect(midColumn.style.width).toBe('100%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(0);
    });

    it('ONE_COLUMN_END_FULL_SCREEN should render one column', async () => {
        await whenStable(fixture);

        fixture.componentRef.setInput('layout', ONE_COLUMN_END_FULL_SCREEN);
        fixture.detectChanges();

        // checks the columns width
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(endColumn.style.width).toBe('100%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(0);
    });

    it('TWO_COLUMNS_START_EXPANDED should render 2 columns, start expanded, mid open', async () => {
        await whenStable(fixture);
        setViewport(1023);

        fixture.componentRef.setInput('layout', TWO_COLUMNS_START_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0]
            .nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        expect(startColumn.style.width).toBe('67%');
        expect(midColumn.style.width).toBe('33%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });

    it('TWO_COLUMNS_MID_EXPANDED should render 2 columns, start open, mid expanded', async () => {
        await whenStable(fixture);
        setViewport(1023);

        fixture.componentRef.setInput('layout', TWO_COLUMNS_MID_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0]
            .nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        expect(startColumn.style.width).toBe('33%');
        expect(midColumn.style.width).toBe('67%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });

    it('TWO_COLUMNS_END_EXPANDED should render 2 columns, mid open, end expanded', async () => {
        await whenStable(fixture);
        setViewport(1023);

        fixture.componentRef.setInput('layout', TWO_COLUMNS_END_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(midColumn.style.width).toBe('33%');
        expect(endColumn.style.width).toBe('67%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });

    it('THREE_COLUMNS_MID_EXPANDED should render 3 columns, start open, mid expanded, end open', async () => {
        await whenStable(fixture);
        setViewport(1300);

        fixture.componentRef.setInput('layout', THREE_COLUMNS_MID_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0]
            .nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(startColumn.style.width).toBe('25%');
        expect(midColumn.style.width).toBe('50%');
        expect(endColumn.style.width).toBe('25%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });

    it('THREE_COLUMNS_END_EXPANDED should render 3 columns, start open, mid open, end expanded', async () => {
        await whenStable(fixture);
        setViewport(1300);

        fixture.componentRef.setInput('layout', THREE_COLUMNS_END_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0]
            .nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(startColumn.style.width).toBe('25%');
        expect(midColumn.style.width).toBe('25%');
        expect(endColumn.style.width).toBe('50%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });

    it('THREE_COLUMNS_START_MINIMIZED should render 3 columns, start minimized, mid expanded, end open', async () => {
        await whenStable(fixture);
        setViewport(1023);

        fixture.componentRef.setInput('layout', THREE_COLUMNS_START_MINIMIZED);
        fixture.detectChanges();

        // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(midColumn.style.width).toBe('67%');
        expect(endColumn.style.width).toBe('33%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });

    it('THREE_COLUMNS_MID_EXPANDED should render THREE_COLUMNS_START_MINIMIZED in MD screen', async () => {
        await whenStable(fixture);
        setViewport(1023);

        fixture.componentRef.setInput('layout', THREE_COLUMNS_MID_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(midColumn.style.width).toBe('67%');
        expect(endColumn.style.width).toBe('33%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });

    it('THREE_COLUMNS_END_EXPANDED should render TWO_COLUMNS_END_EXPANDED in MD screen', async () => {
        await whenStable(fixture);
        setViewport(1023);

        fixture.componentRef.setInput('layout', THREE_COLUMNS_END_EXPANDED);
        fixture.detectChanges();

        // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1]
            .nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2]
            .nativeElement;
        expect(midColumn.style.width).toBe('33%');
        expect(endColumn.style.width).toBe('67%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });

    describe('separator direction values', () => {
        it('should have no separators for single-column layouts', async () => {
            await whenStable(fixture);

            fixture.componentRef.setInput('layout', ONE_COLUMN_START_FULL_SCREEN);
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout._leftColumnSeparator).toBeNull();
            expect(testComponent.flexibleColumnLayout._rightColumnSeparator).toBeNull();
        });

        it('should set left separator to "left" for TWO_COLUMNS_START_EXPANDED', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('layout', TWO_COLUMNS_START_EXPANDED);
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout._leftColumnSeparator).toBe('left');
            expect(testComponent.flexibleColumnLayout._rightColumnSeparator).toBeNull();
        });

        it('should set left separator to "right" for TWO_COLUMNS_MID_EXPANDED', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('layout', TWO_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout._leftColumnSeparator).toBe('right');
            expect(testComponent.flexibleColumnLayout._rightColumnSeparator).toBeNull();
        });

        it('should set both separators for THREE_COLUMNS_MID_EXPANDED', async () => {
            await whenStable(fixture);
            setViewport(1300);

            fixture.componentRef.setInput('layout', THREE_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout._leftColumnSeparator).toBe('right');
            expect(testComponent.flexibleColumnLayout._rightColumnSeparator).toBe('left');
        });

        it('should set right separator to "right" for THREE_COLUMNS_END_EXPANDED', async () => {
            await whenStable(fixture);
            setViewport(1300);

            fixture.componentRef.setInput('layout', THREE_COLUMNS_END_EXPANDED);
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout._rightColumnSeparator).toBe('right');
        });
    });

    describe('layoutChange event emission', () => {
        it('should emit layoutChange when separator is clicked', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('layout', TWO_COLUMNS_START_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            const layoutChangeSpy = jest.fn();
            testComponent.flexibleColumnLayout.layoutChange.subscribe(layoutChangeSpy);

            const separatorBtn = fixture.debugElement.query(By.css('.fd-flexible-column-layout__button'));
            separatorBtn.nativeElement.click();
            await whenStable(fixture);

            expect(layoutChangeSpy).toHaveBeenCalledWith(TWO_COLUMNS_MID_EXPANDED);
        });
    });

    describe('separator click handlers', () => {
        it('should switch from TWO_COLUMNS_START_EXPANDED to TWO_COLUMNS_MID_EXPANDED on left separator click', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('layout', TWO_COLUMNS_START_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            testComponent.flexibleColumnLayout._handleLeftColumnSeparatorClick();
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout.layout).toBe(TWO_COLUMNS_MID_EXPANDED);
        });

        it('should switch from TWO_COLUMNS_MID_EXPANDED to TWO_COLUMNS_START_EXPANDED on left separator click', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('layout', TWO_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            testComponent.flexibleColumnLayout._handleLeftColumnSeparatorClick();
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout.layout).toBe(TWO_COLUMNS_START_EXPANDED);
        });

        it('should switch from THREE_COLUMNS_MID_EXPANDED to THREE_COLUMNS_END_EXPANDED on right separator click', async () => {
            await whenStable(fixture);
            setViewport(1300);

            fixture.componentRef.setInput('layout', THREE_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            testComponent.flexibleColumnLayout._handleRightColumnSeparatorClick();
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout.layout).toBe(THREE_COLUMNS_END_EXPANDED);
        });

        it('should switch from THREE_COLUMNS_MID_EXPANDED to THREE_COLUMNS_END_MINIMIZED on left separator click', async () => {
            await whenStable(fixture);
            setViewport(1300);

            fixture.componentRef.setInput('layout', THREE_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            testComponent.flexibleColumnLayout._handleLeftColumnSeparatorClick();
            fixture.detectChanges();

            expect(testComponent.flexibleColumnLayout.layout).toBe(THREE_COLUMNS_END_MINIMIZED);
        });
    });

    describe('accessibility', () => {
        it('should set aria-label on left separator button when collapseTitleStartBtn is provided', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('collapseTitleStartBtn', 'Collapse start column');
            fixture.componentRef.setInput('collapseTitle', 'Collapse'); // Fallback
            fixture.componentRef.setInput('layout', TWO_COLUMNS_START_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            const separatorBtn = fixture.debugElement.query(By.css('.fd-flexible-column-layout__button'));
            const ariaLabel = separatorBtn.nativeElement.getAttribute('aria-label');

            expect(ariaLabel).toBeTruthy();
            expect(ariaLabel).toBe('Collapse start column');
        });

        it('should set aria-label on left separator button when expandTitleStartBtn is provided', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('expandTitleStartBtn', 'Expand start column');
            fixture.componentRef.setInput('expandTitle', 'Expand'); // Fallback
            fixture.componentRef.setInput('layout', TWO_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            const separatorBtn = fixture.debugElement.query(By.css('.fd-flexible-column-layout__button'));
            const ariaLabel = separatorBtn.nativeElement.getAttribute('aria-label');

            expect(ariaLabel).toBe('Expand start column');
        });

        it('should set aria-label on right separator button when collapseTitleEndBtn is provided', async () => {
            await whenStable(fixture);
            setViewport(1300);

            fixture.componentRef.setInput('collapseTitleEndBtn', 'Collapse end column');
            fixture.componentRef.setInput('collapseTitle', 'Collapse'); // Fallback
            fixture.componentRef.setInput('layout', THREE_COLUMNS_MID_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            const separatorBtns = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__button'));
            const rightSeparatorBtn = separatorBtns[1];
            const ariaLabel = rightSeparatorBtn.nativeElement.getAttribute('aria-label');

            expect(ariaLabel).toBe('Collapse end column');
        });

        it('should fallback to collapseTitle when specific button title not provided', async () => {
            await whenStable(fixture);
            setViewport(1023);

            fixture.componentRef.setInput('collapseTitle', 'Collapse');
            fixture.componentRef.setInput('layout', TWO_COLUMNS_START_EXPANDED);
            fixture.detectChanges();
            await whenStable(fixture);

            const separatorBtn = fixture.debugElement.query(By.css('.fd-flexible-column-layout__button'));
            const ariaLabel = separatorBtn.nativeElement.getAttribute('aria-label');

            expect(ariaLabel).toBe('Collapse');
        });
    });
});
