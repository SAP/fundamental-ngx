import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroProcessFlowModule } from '../../micro-process-flow.module';

const ICON_NAME = 'add';
const FONT_NAME = 'SAP-icons';

@Component({
    selector: 'fd-test-icon',
    template: ` <fd-micro-process-flow-icon [font]="fontName" [glyph]="iconName"></fd-micro-process-flow-icon> `
})
class TestWrapperComponent {
    readonly iconName = ICON_NAME;
    fontName = FONT_NAME;
}

describe('MicroProcessFlowIconComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [MicroProcessFlowModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add icon class with glyph on input', () => {
        const icon = fixture.debugElement.nativeElement.querySelector('fd-icon');
        expect(icon.className).toContain('sap-icon--' + ICON_NAME);
    });

    it('should apply SAP-icons-TNT icon font with font on input', () => {
        component.fontName = 'SAP-icons-TNT';
        fixture.detectChanges();
        const icon = fixture.debugElement.nativeElement.querySelector('fd-icon');
        expect(icon.className).toContain('sap-icon-TNT--' + ICON_NAME);
    });

    it('should change the icon font to BusinessSuiteInAppSymbols', () => {
        component.fontName = 'BusinessSuiteInAppSymbols';
        fixture.detectChanges();
        const icon = fixture.debugElement.nativeElement.querySelector('fd-icon');
        expect(icon.className).toContain('sap-icon-businessSuiteInAppSymbols--' + ICON_NAME);
    });
});
