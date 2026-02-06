import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoLabelComponent } from './info-label.component';

describe('InfoLabelComponent', () => {
    let component: InfoLabelComponent;
    let fixture: ComponentFixture<InfoLabelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InfoLabelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default classes', () => {
        expect(fixture.nativeElement.classList.contains('fd-info-label')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-info-label--accent-color-7')).toBe(true);
    });

    it('should add numeric label type', () => {
        fixture.componentRef.setInput('type', 'numeric');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-info-label--numeric')).toBe(true);
    });

    it('should add icon label type', () => {
        fixture.componentRef.setInput('type', 'icon');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-info-label--icon')).toBe(true);
    });

    it('should add accent color', () => {
        fixture.componentRef.setInput('color', '2');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-info-label--accent-color-2')).toBe(true);
    });

    it('should default to color 7 for invalid color values', () => {
        fixture.componentRef.setInput('color', '15');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-info-label--accent-color-7')).toBe(true);
    });

    it('should add icon', () => {
        fixture.componentRef.setInput('type', 'icon');
        fixture.componentRef.setInput('glyph', 'future');
        fixture.detectChanges();
        const iconElement = fixture.nativeElement.querySelector('fd-icon');

        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains('sap-icon--future')).toBe(true);
    });

    it('should display label', () => {
        const label = 'Test label';
        fixture.componentRef.setInput('label', label);
        fixture.detectChanges();

        const labelTextElement = fixture.nativeElement.querySelector('.fd-info-label__text');

        expect(labelTextElement).toBeTruthy();
        expect(labelTextElement.textContent.trim()).toBe(label);
    });
});
