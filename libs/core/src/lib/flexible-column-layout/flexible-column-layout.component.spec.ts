import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { whenStable } from '@fundamental-ngx/core/tests';

import { FlexibleColumnLayoutComponent } from './flexible-column-layout.component';
import {
    ONE_COLUMN_START_FULL_SCREEN,
    ONE_COLUMN_MID_FULL_SCREEN,
    ONE_COLUMN_END_FULL_SCREEN,
    TWO_COLUMNS_START_EXPANDED,
    TWO_COLUMNS_MID_EXPANDED,
    TWO_COLUMNS_END_EXPANDED,
    THREE_COLUMNS_MID_EXPANDED,
    THREE_COLUMNS_END_EXPANDED,
    THREE_COLUMNS_START_MINIMIZED,
    THREE_COLUMNS_END_MINIMIZED,
    FlexibleColumnLayout,
    FD_FLEXIBLE_LAYOUT_CONFIG,
    DEFAULT_FLEXIBLE_LAYOUT_CONFIG
} from './constants';

declare let viewport: any;

@Component({
    template: `
        <fd-flexible-column-layout [(layout)]="layout" [backgroundDesign]="backgroundDesign">
            <ng-template #startColumn>
                <div style="height: 800px;">
                    <h2>Start Column</h2>
                </div>
            </ng-template>
            <ng-template #midColumn>
                <div style="height: 800px;">
                    <h2>Mid Column</h2>
                </div>
            </ng-template>
            <ng-template #endColumn>
                <div style="height: 800px;">
                    <h2>End Column</h2>
                </div>
            </ng-template>
        </fd-flexible-column-layout>
    `
})
class TestFlexibleColumnLayoutComponent {
    @ViewChild(FlexibleColumnLayoutComponent)
    flexibleColumnLayout: FlexibleColumnLayoutComponent;

    layout: FlexibleColumnLayout = ONE_COLUMN_START_FULL_SCREEN;
    backgroundDesign = 'translucent';
}
describe('FlexibleColumnLayoutComponent', () => {
    let testComponent: TestFlexibleColumnLayoutComponent;
    let fixture: ComponentFixture<TestFlexibleColumnLayoutComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FlexibleColumnLayoutComponent, TestFlexibleColumnLayoutComponent],
                providers: [
                    {
                        provide: FD_FLEXIBLE_LAYOUT_CONFIG,
                        useValue: DEFAULT_FLEXIBLE_LAYOUT_CONFIG
                    }
                ]
            }).compileComponents();
        })
    );

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

        testComponent.layout = ONE_COLUMN_MID_FULL_SCREEN;
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

        testComponent.layout = ONE_COLUMN_END_FULL_SCREEN;
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
        viewport.set(1023, 900);

        testComponent.layout = TWO_COLUMNS_START_EXPANDED;
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
        viewport.set(1023, 900);

        testComponent.layout = TWO_COLUMNS_MID_EXPANDED;
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
        viewport.set(1023, 900);

        testComponent.layout = TWO_COLUMNS_END_EXPANDED;
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
        viewport.set(1300, 900);

        testComponent.layout = THREE_COLUMNS_MID_EXPANDED;
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
        viewport.set(1300, 900);

        testComponent.layout = THREE_COLUMNS_END_EXPANDED;
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
        viewport.set(1023, 900);

        testComponent.layout = THREE_COLUMNS_START_MINIMIZED;
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

    xit('THREE_COLUMNS_END_MINIMIZED should render 3 columns, start open, mid expanded, end minimized', async () => {
        await whenStable(fixture);

        testComponent.layout = THREE_COLUMNS_END_MINIMIZED;
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
        expect(separators.length).toBe(2);
    });

    it('THREE_COLUMNS_MID_EXPANDED should render THREE_COLUMNS_START_MINIMIZED in MD screen', async () => {
        await whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = THREE_COLUMNS_MID_EXPANDED;
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
        viewport.set(1023, 900);

        testComponent.layout = THREE_COLUMNS_END_EXPANDED;
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
});
