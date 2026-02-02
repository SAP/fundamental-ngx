import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ObjectMarkerComponent } from './object-marker.component';

@Component({
    selector: 'fd-icon',
    template: '<span></span>'
})
class MockIconComponent {
    readonly glyph = input<string>();
    readonly font = input<string>();
}

describe('ObjectMarkerComponent', () => {
    let component: ObjectMarkerComponent;
    let fixture: ComponentFixture<ObjectMarkerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ObjectMarkerComponent]
        })
            .overrideComponent(ObjectMarkerComponent, {
                remove: { imports: [IconComponent] },
                add: { imports: [MockIconComponent] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectMarkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add fd-object-marker--link class when clickable is true', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-object-marker--link')).toBe(true);
    });

    it('should not add clickable class when clickable is false', () => {
        fixture.componentRef.setInput('clickable', false);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-object-marker--link')).toBe(false);
    });

    it('should set role to "link" when clickable', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('role')).toBe('link');
    });

    it('should set role to "img" when icon-only (no label)', () => {
        fixture.componentRef.setInput('glyph', 'accept');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('role')).toBe('img');
    });

    it('should render custom status text when provided', () => {
        fixture.componentRef.setInput('statusText', 'Custom Status');
        fixture.detectChanges();
        const srOnlySpan = component.elementRef.nativeElement.querySelector('.fd-object-marker__sr-only');
        expect(srOnlySpan.textContent).toBe('Custom Status');
    });

    it('should render icon when glyph is provided', () => {
        fixture.componentRef.setInput('glyph', 'accept');
        fixture.detectChanges();
        const icon = component.elementRef.nativeElement.querySelector('fd-icon');
        expect(icon).toBeTruthy();
    });

    it('should render label when provided', () => {
        fixture.componentRef.setInput('label', 'Test Label');
        fixture.detectChanges();
        const labelSpan = component.elementRef.nativeElement.querySelector('.fd-object-marker__text');
        expect(labelSpan).toBeTruthy();
        expect(labelSpan.textContent).toBe('Test Label');
    });

    it('should render sr-only icon title when icon-only', () => {
        fixture.componentRef.setInput('glyph', 'accept');
        fixture.detectChanges();
        const srOnlySpans = component.elementRef.nativeElement.querySelectorAll('.fd-object-marker__sr-only');
        expect(srOnlySpans.length).toBe(2); // One for status, one for icon title
    });

    it('should not render sr-only icon title when label exists', () => {
        fixture.componentRef.setInput('glyph', 'accept');
        fixture.componentRef.setInput('label', 'Test Label');
        fixture.detectChanges();
        const srOnlySpans = component.elementRef.nativeElement.querySelectorAll('.fd-object-marker__sr-only');
        expect(srOnlySpans.length).toBe(1); // Only status text
    });

    it('should set aria-labelledby attribute', () => {
        fixture.detectChanges();
        const ariaLabelledBy = component.elementRef.nativeElement.getAttribute('aria-labelledby');
        expect(ariaLabelledBy).toBeTruthy();
    });

    it('should use custom aria-labelledby when provided', () => {
        const customAriaLabelledBy = 'custom-id';
        fixture.componentRef.setInput('ariaLabelledBy', customAriaLabelledBy);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('aria-labelledby')).toBe(customAriaLabelledBy);
    });

    it('should set tabindex to 0 when clickable', () => {
        fixture.componentRef.setInput('clickable', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex to -1 when not clickable', () => {
        fixture.componentRef.setInput('clickable', false);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should set icon role to presentation when label exists', () => {
        fixture.componentRef.setInput('glyph', 'accept');
        fixture.componentRef.setInput('label', 'Test Label');
        fixture.detectChanges();
        const icon = component.elementRef.nativeElement.querySelector('fd-icon');
        expect(icon.getAttribute('role')).toBe('presentation');
    });

    it('should set custom glyph font', () => {
        fixture.componentRef.setInput('glyph', 'accept');
        fixture.componentRef.setInput('glyphFont', 'SAP-icons-TNT');
        fixture.detectChanges();
        const icon = component.elementRef.nativeElement.querySelector('fd-icon');
        expect(icon).toBeTruthy();
        // Verify the glyph and font inputs are properly set on the component
        expect(component.glyph()).toBe('accept');
        expect(component.glyphFont()).toBe('SAP-icons-TNT');
    });
});
