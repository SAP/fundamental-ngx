import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { whenStable } from '../utils/tests/when-stable';

import { FlexibleColumnLayoutModule } from './flexible-column-layout.module';
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
    FlexibleColumnLayout
} from './constants';

declare var viewport: any;

@Component({
    template: `
        <fd-flexible-column-layout 
            [(layout)]="layout" 
            [backgroundDesign] = "backgroundDesign">
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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FlexibleColumnLayoutComponent, TestFlexibleColumnLayoutComponent]
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
        whenStable(fixture);
        const element = fixture.debugElement.query(By.css('.fd-flexible-column-layout--translucent'));
        expect(element).toBeTruthy();
    });

    it('should render start column', async () => {
        whenStable(fixture);

        // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.query(By.css('.fd-flexible-column-layout__column')).nativeElement;
        expect(startColumn.style.width).toBe('100%');

        // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(0);
    });

    it('ONE_COLUMN_MID_FULL_SCREEN should render one column', async () => {
        whenStable(fixture);

        testComponent.layout = ONE_COLUMN_MID_FULL_SCREEN;
        fixture.detectChanges();

         // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.query(By.css('.fd-flexible-column-layout__column')).nativeElement;
        expect(midColumn.style.width).toBe('100%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(0);
    });

    it('ONE_COLUMN_END_FULL_SCREEN should render one column', async () => {
        whenStable(fixture);

        testComponent.layout = ONE_COLUMN_END_FULL_SCREEN;
        fixture.detectChanges();

         // checks the columns width
        const endColumn: HTMLElement = fixture.debugElement.query(By.css('.fd-flexible-column-layout__column')).nativeElement;
        expect(endColumn.style.width).toBe('100%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(0);
    });
    // TODO: Unskip after fix
    xit('TWO_COLUMNS_START_EXPANDED should render 2 columns, start expanded, mid open', async () => {
        whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = TWO_COLUMNS_START_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(startColumn.style.width).toBe('67%');
        expect(midColumn.style.width).toBe('33%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });
    // TODO: Unskip after fix
    xit('TWO_COLUMNS_MID_EXPANDED should render 2 columns, start open, mid expanded', async () => {
        whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = TWO_COLUMNS_MID_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(startColumn.style.width).toBe('33%');
        expect(midColumn.style.width).toBe('67%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });
    // TODO: Unskip after fix
    xit('TWO_COLUMNS_END_EXPANDED should render 2 columns, mid open, end expanded', async () => {
        whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = TWO_COLUMNS_END_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(midColumn.style.width).toBe('33%');
        expect(endColumn.style.width).toBe('67%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });
    // TODO: unskip after fix
    xit('THREE_COLUMNS_MID_EXPANDED should render 3 columns, start open, mid expanded, end open', async () => {
        whenStable(fixture);
        viewport.set(1300, 900);

        testComponent.layout = THREE_COLUMNS_MID_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2].nativeElement;
        expect(startColumn.style.width).toBe('25%');
        expect(midColumn.style.width).toBe('50%');
        expect(endColumn.style.width).toBe('25%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });
    // TODO: Unskip after fix
    xit('THREE_COLUMNS_END_EXPANDED should render 3 columns, start open, mid open, end expanded', async () => {
        whenStable(fixture);
        viewport.set(1300, 900);

        testComponent.layout = THREE_COLUMNS_END_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[2].nativeElement;
        expect(startColumn.style.width).toBe('25%');
        expect(midColumn.style.width).toBe('25%');
        expect(endColumn.style.width).toBe('50%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });
    // TODO: Unskip after fix
    xit('THREE_COLUMNS_START_MINIMIZED should render 3 columns, start minimized, mid expanded, end open', async () => {
        whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = THREE_COLUMNS_START_MINIMIZED;
        fixture.detectChanges();

         // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(midColumn.style.width).toBe('67%');
        expect(endColumn.style.width).toBe('33%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });

    // TODO: Unskip after fix
    xit('THREE_COLUMNS_END_MINIMIZED should render 3 columns, start open, mid expanded, end minimized', async () => {
        whenStable(fixture);

        testComponent.layout = THREE_COLUMNS_END_MINIMIZED;
        fixture.detectChanges();

         // checks the columns width
        const startColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(startColumn.style.width).toBe('33%');
        expect(midColumn.style.width).toBe('67%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });
    // TODO: Unskip after fix
    xit('THREE_COLUMNS_MID_EXPANDED should render THREE_COLUMNS_START_MINIMIZED in MD screen', async () => {
        whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = THREE_COLUMNS_MID_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(midColumn.style.width).toBe('67%');
        expect(endColumn.style.width).toBe('33%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(2);
    });
    // TODO: Unskip after fix
    xit('THREE_COLUMNS_END_EXPANDED should render TWO_COLUMNS_END_EXPANDED in MD screen', async () => {
        whenStable(fixture);
        viewport.set(1023, 900);

        testComponent.layout = THREE_COLUMNS_END_EXPANDED;
        fixture.detectChanges();

         // checks the columns width
        const midColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[0].nativeElement;
        const endColumn: HTMLElement = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__column'))[1].nativeElement;
        expect(midColumn.style.width).toBe('33%');
        expect(endColumn.style.width).toBe('67%');

         // checks the number of separators
        const separators = fixture.debugElement.queryAll(By.css('.fd-flexible-column-layout__separator'));
        expect(separators.length).toBe(1);
    });
});
