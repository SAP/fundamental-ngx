import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DynamicPageService } from '../../dynamic-page.service';

import { DynamicPageHeaderInternalComponent } from './dynamic-page-header-internal.component';
import { DynamicPageConfig } from '../../dynamic-page.config';

@Component({
    template: `
        <fdp-dynamic-page-header-internal
            [collapsible]="collapsible"
            [pinnable]="pinnable"
            [collapsed]="collapsed"
            [expandLabel]="expandLabel"
            [collapseLabel]="collapseLabel"
            [pinAriaLabel]="pinAriaLabel"
            [unpinAriaLabel]="unpinAriaLabel"
            [size]="size"
            [background]="background"
        >
            <div class="projected-content">Header</div>
        </fdp-dynamic-page-header-internal>
    `
})
class TestComponent {
    collapsible = true;
    pinnable = false;
    collapsed = false;
    expandLabel = 'Collapse';
    collapseLabel = 'Expand';
    pinAriaLabel = 'Pinned';
    unpinAriaLabel = 'Unpinned';
    size = 'medium';
    background = '';

    @ViewChild(DynamicPageHeaderInternalComponent) dynamicPageHeaderComponent: DynamicPageHeaderInternalComponent;
}

describe('DynamicPageHeaderInternalComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule],
                declarations: [TestComponent, DynamicPageHeaderInternalComponent],
                providers: [DynamicPageService, DynamicPageConfig]
            }).compileComponents();
        })
    );

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        await wait(fixture);
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('Should not be able to see expand/collapse or pin button if collapsible is "false"', async () => {
        let expandCollapseButton = fixture.debugElement.queryAll(
            By.css('.fd-dynamic-page__collapsible-header-visibility-container--button-group')
        );
        expect(expandCollapseButton.length).toBe(1);
        component.collapsible = false;
        await wait(fixture);
        expandCollapseButton = fixture.debugElement.queryAll(
            By.css('.fd-dynamic-page__collapsible-header-visibility-container--button-group')
        );
        expect(expandCollapseButton.length).toBe(0);
    });

    describe('expand actions', async () => {
        it('should be able to expand the header', async () => {
            component.collapsed = false;
            await wait(fixture);
            const contentEl = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__collapsible-header'));
            expect(contentEl.length).toBe(1);
        });

        it('should set aria labels correctly', async () => {
            component.collapsed = false;
            component.collapseLabel = 'Expand';
            await wait(fixture);
            const collapseBtn: HTMLButtonElement = fixture.debugElement.query(
                By.css('.fd-dynamic-page__collapse-button')
            ).nativeElement;
            expect(collapseBtn.getAttribute('aria-label')).toBe(component.collapseLabel);
        });
    });

    describe('collapse actions', async () => {
        it('should be able to collapse the header', async () => {
            component.collapsed = true;
            fixture.detectChanges();
            const contentEl: HTMLElement = fixture.debugElement.query(
                By.css('.fd-dynamic-page__collapsible-header')
            ).nativeElement;
            expect(contentEl.getAttribute('aria-hidden')).toBeTruthy();
        });

        it('should set aria labels correctly', async () => {
            component.collapsed = true;
            fixture.detectChanges();
            const collapseBtn: HTMLButtonElement = fixture.debugElement.query(
                By.css('.fd-dynamic-page__collapse-button')
            ).nativeElement;
            expect(collapseBtn.getAttribute('aria-label')).toBe(component.collapseLabel);
        });
    });

    describe('pin actions', async () => {
        it('should be able to pin the header', async () => {
            component.pinnable = true;
            await wait(fixture);

            const pinBtn: HTMLButtonElement = fixture.debugElement.query(
                By.css('.fd-dynamic-page__pin-button')
            ).nativeElement;
            pinBtn.click();
            const contentEl = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__collapsible-header'));
            expect(contentEl.length).toBe(1);
        });
    });

    describe('page header area', () => {
        it('should set size', async () => {
            const headerElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'));
            expect(
                headerElement.nativeElement.classList.contains('fd-dynamic-page__collapsible-header--md')
            ).toBeTruthy();
            component.size = 'large';
            fixture.detectChanges();
            expect(
                headerElement.nativeElement.classList.contains('fd-dynamic-page__collapsible-header--lg')
            ).toBeTruthy();
            component.size = 'small';
            fixture.detectChanges();
            expect(
                headerElement.nativeElement.classList.contains('fd-dynamic-page__collapsible-header--sm')
            ).toBeTruthy();
        });
        it('should set background styles', async () => {
            const headerElement = fixture.debugElement.query(By.css('.fd-dynamic-page__collapsible-header'));
            component.background = 'transparent';
            fixture.detectChanges();
            expect(
                headerElement.nativeElement.classList.contains('fd-dynamic-page__collapsible-header--transparent-bg')
            ).toBeTruthy();
            component.background = 'solid';
            fixture.detectChanges();
            expect(
                headerElement.nativeElement.classList.contains('fd-dynamic-page__collapsible-header--transparent-bg')
            ).toBeFalsy();
        });
    });
});
