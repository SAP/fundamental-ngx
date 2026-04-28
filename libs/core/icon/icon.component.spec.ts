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

    it('should include the sap-icon base class', () => {
        expect(fixture.debugElement.nativeElement.className).toContain('sap-icon');
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

    it('should default role to "presentation" for decorative icons', () => {
        expect(fixture.debugElement.nativeElement.getAttribute('role')).toBe('presentation');
    });

    it('should set role to "img" when ariaLabel is provided', () => {
        fixture.componentRef.setInput('ariaLabel', 'Add item');
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.getAttribute('role')).toBe('img');
    });

    it('should set aria-hidden to true by default when no ariaLabel', () => {
        expect(fixture.debugElement.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not set aria-hidden when ariaLabel is provided', () => {
        fixture.componentRef.setInput('ariaLabel', 'Add item');
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.getAttribute('aria-hidden')).toBeNull();
    });

    it('should apply size modifier class', () => {
        fixture.componentRef.setInput('size', 'lg');
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.className).toContain('sap-icon--lg');
    });
});
