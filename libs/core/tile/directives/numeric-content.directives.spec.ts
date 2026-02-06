import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    NumericContentDirective,
    NumericContentKpiContainerDirective,
    NumericContentKpiDirective,
    NumericContentLaunchIconContainerDirective,
    NumericContentLaunchIconDirective,
    NumericContentScaleArrowDirective,
    NumericContentScaleContainerDirective,
    NumericContentScaleDirective,
    NumericContentScaleTextDirective
} from './numeric-content.directives';

@Component({
    selector: 'fd-test-component',
    template: `
        <div class="fd-tile--s">
            <!-- tile should be two elements up from numeric content -->
            <div>
                <div fd-numeric-content [size]="'l'">
                    <div fd-numeric-content-launch-icon [glyph]="'add'"></div>
                    <div fd-numeric-content-kpi [glyph]="'add'" [state]="'positive'"></div>
                    <div fd-numeric-content-scale-arrow [glyph]="'down'"></div>
                    <div fd-numeric-content-scale [state]="'negative'"></div>
                </div>
            </div>
        </div>
    `,
    imports: [
        NumericContentDirective,
        NumericContentKpiContainerDirective,
        NumericContentKpiDirective,
        NumericContentLaunchIconContainerDirective,
        NumericContentLaunchIconDirective,
        NumericContentScaleArrowDirective,
        NumericContentScaleContainerDirective,
        NumericContentScaleDirective,
        NumericContentScaleTextDirective
    ]
})
class TestComponent {
    readonly numericContent = viewChild(NumericContentDirective);
    readonly launchIcon = viewChild(NumericContentLaunchIconDirective);
    readonly scaleArrow = viewChild(NumericContentScaleArrowDirective);
    readonly scale = viewChild(NumericContentScaleDirective);
    readonly kpi = viewChild(NumericContentKpiDirective);
}

describe('NumericContentDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should assign classes', () => {
        // Numeric content with size and small-tile detection
        const numericContentEl = component.numericContent()?.elementRef.nativeElement;
        expect(numericContentEl).toBeDefined();
        expect(numericContentEl.className).toContain('fd-numeric-content');
        expect(numericContentEl.className).toContain('fd-numeric-content--l');
        expect(numericContentEl.className).toContain('fd-numeric-content--small-tile');

        // Launch icon with glyph
        const launchIconEl = component.launchIcon()?.elementRef.nativeElement;
        expect(launchIconEl).toBeDefined();
        expect(launchIconEl.className).toContain('fd-numeric-content__launch-icon');
        expect(launchIconEl.className).toContain('sap-icon--add');

        // KPI with state
        const kpiEl = component.kpi()?.elementRef.nativeElement;
        expect(kpiEl).toBeDefined();
        expect(kpiEl.className).toContain('fd-numeric-content__kpi');
        expect(kpiEl.className).toContain('fd-numeric-content__kpi--positive');

        // Scale arrow with glyph
        const scaleArrowEl = component.scaleArrow()?.elementRef.nativeElement;
        expect(scaleArrowEl).toBeDefined();
        expect(scaleArrowEl.className).toContain('fd-numeric-content__scale-arrow');
        expect(scaleArrowEl.className).toContain('sap-icon--down');

        // Scale with state
        const scaleEl = component.scale()?.elementRef.nativeElement;
        expect(scaleEl).toBeDefined();
        expect(scaleEl.className).toContain('fd-numeric-content__scale');
        expect(scaleEl.className).toContain('fd-numeric-content__scale--negative');
    });
});
