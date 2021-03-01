import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
    `
})
export class TestComponent {
    @ViewChild(NumericContentDirective)
    numericContent: NumericContentDirective;

    @ViewChild(NumericContentLaunchIconDirective)
    launchIcon: NumericContentLaunchIconDirective;

    @ViewChild(NumericContentScaleArrowDirective)
    scaleArrow: NumericContentScaleArrowDirective;

    @ViewChild(NumericContentScaleDirective)
    scale: NumericContentScaleDirective;

    @ViewChild(NumericContentKpiDirective)
    kpi: NumericContentKpiDirective;
}

describe('NumericContentDirectives', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                NumericContentDirective,
                NumericContentKpiContainerDirective,
                NumericContentKpiDirective,
                NumericContentLaunchIconContainerDirective,
                NumericContentLaunchIconDirective,
                NumericContentScaleArrowDirective,
                NumericContentScaleContainerDirective,
                NumericContentScaleDirective,
                NumericContentScaleTextDirective,
                TestComponent
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should assign classes', () => {
        component.numericContent.ngOnChanges();
        expect(component.numericContent.elementRef().nativeElement.className).toContain('fd-numeric-content');
        expect(component.numericContent.elementRef().nativeElement.className).toContain('fd-numeric-content--l');
        expect(component.numericContent.elementRef().nativeElement.className).toContain(
            'fd-numeric-content--small-tile'
        );
        component.launchIcon.ngOnChanges();
        expect(component.launchIcon.elementRef().nativeElement.className).toContain('fd-numeric-content__launch-icon');
        expect(component.launchIcon.elementRef().nativeElement.className).toContain('sap-icon--add');
        component.kpi.ngOnChanges();
        expect(component.kpi.elementRef().nativeElement.className).toContain('fd-numeric-content__kpi');
        expect(component.kpi.elementRef().nativeElement.className).toContain('fd-numeric-content__kpi--positive');
        component.scaleArrow.ngOnChanges();
        expect(component.scaleArrow.elementRef().nativeElement.className).toContain('fd-numeric-content__scale-arrow');
        expect(component.scaleArrow.elementRef().nativeElement.className).toContain('sap-icon--down');
        component.scale.ngOnChanges();
        expect(component.scale.elementRef().nativeElement.className).toContain('fd-numeric-content__scale');
        expect(component.scale.elementRef().nativeElement.className).toContain('fd-numeric-content__scale--negative');
    });
});
