import { ChangeDetectionStrategy } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusyIndicatorComponent } from './busy-indicator.component';

describe('BusyIndicatorComponent', () => {
    let component: BusyIndicatorComponent;
    let fixture: ComponentFixture<BusyIndicatorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BusyIndicatorComponent]
        })
            .overrideComponent(BusyIndicatorComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();

        fixture = TestBed.createComponent(BusyIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display loading state', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator')).toBeTruthy();

        fixture.componentRef.setInput('loading', false);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator')).toBeFalsy();
    });

    it('should display proper size', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.componentRef.setInput('size', 's');
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--s')).toBeTruthy();

        fixture.componentRef.setInput('size', 'm');
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--m')).toBeTruthy();

        fixture.componentRef.setInput('size', 'l');
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--l')).toBeTruthy();
    });

    it('should display as block', () => {
        fixture.componentRef.setInput('block', true);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.classList.contains('fd-busy-indicator__container--inline')).toBe(
            false
        );
    });

    it('should display as inline-block', () => {
        fixture.componentRef.setInput('block', false);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.classList.contains('fd-busy-indicator__container--inline')).toBe(
            true
        );
    });

    it('should set role to progressbar when loading', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('role')).toBe('progressbar');
    });

    it('should set role to presentation when not loading', () => {
        fixture.componentRef.setInput('loading', false);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('role')).toBe('presentation');
    });

    it('should set tabindex to 0 when loading', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex to -1 when not loading', () => {
        fixture.componentRef.setInput('loading', false);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should set aria-busy attribute based on loading state', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-busy')).toBe('true');

        fixture.componentRef.setInput('loading', false);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-busy')).toBe('false');
    });

    it('should set aria-valuemin and aria-valuemax attributes', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-valuemin')).toBe('0');
        expect(fixture.debugElement.nativeElement.getAttribute('aria-valuemax')).toBe('100');
    });

    it('should set default aria-valuetext when not provided', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        const ariaValueText = fixture.debugElement.nativeElement.getAttribute('aria-valuetext');
        expect(ariaValueText).toBeTruthy();
    });

    it('should set default title when not provided', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        const title = fixture.debugElement.nativeElement.getAttribute('title');
        expect(title).toBeTruthy();
    });

    it('should use custom ariaLabel when provided', () => {
        fixture.componentRef.setInput('ariaLabel', 'Custom loading label');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-label')).toBe('Custom loading label');
    });

    it('should use custom ariaValueText when provided', () => {
        fixture.componentRef.setInput('ariaValueText', 'Custom value text');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-valuetext')).toBe('Custom value text');
    });

    it('should use custom title when provided', () => {
        fixture.componentRef.setInput('title', 'Custom title');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('title')).toBe('Custom title');
    });

    it('should set custom aria-live attribute', () => {
        fixture.componentRef.setInput('ariaLive', 'assertive');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-live')).toBe('assertive');
    });

    it('should support polite aria-live value', () => {
        fixture.componentRef.setInput('ariaLive', 'polite');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should support off aria-live value', () => {
        fixture.componentRef.setInput('ariaLive', 'off');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.getAttribute('aria-live')).toBe('off');
    });

    it('should display loading label when provided', () => {
        fixture.componentRef.setInput('label', 'Processing...');
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Processing...');
    });
});
