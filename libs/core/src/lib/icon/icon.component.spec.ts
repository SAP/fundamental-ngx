import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IconComponent } from './icon.component';

const ICON_NAME = 'add';

describe('IconComponent', () => {
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IconComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('glyph', ICON_NAME);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add icon class with glyph on input', () => {
        expect(fixture.debugElement.nativeElement.className).toContain('sap-icon--' + ICON_NAME);
    });

    it('should apply SAP-icons-TNT icon font with font on input', () => {
        fixture.componentRef.setInput('font', 'SAP-icons-TNT');
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.className).toContain('sap-icon-TNT--' + ICON_NAME);
    });

    it('should change the icon font to BusinessSuiteInAppSymbols', () => {
        fixture.componentRef.setInput('font', 'BusinessSuiteInAppSymbols');
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.className).toContain(
            'sap-icon-businessSuiteInAppSymbols--' + ICON_NAME
        );
    });
});
