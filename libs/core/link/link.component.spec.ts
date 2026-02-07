import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
    let component: LinkComponent;
    let fixture: ComponentFixture<LinkComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply base fd-link class', () => {
        expect(fixture.nativeElement.classList.contains('fd-link')).toBe(true);
    });

    it('should add emphasized class when emphasized input is true', () => {
        fixture.componentRef.setInput('emphasized', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-link--emphasized')).toBe(true);
    });

    it('should add inverted class when inverted input is true', () => {
        fixture.componentRef.setInput('inverted', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-link--inverted')).toBe(true);
    });

    it('should add disabled class when disabled input is true', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
    });

    it('should add subtle class when subtle input is true', () => {
        fixture.componentRef.setInput('subtle', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-link--subtle')).toBe(true);
    });

    it('should add undecorated class when undecorated input is true', () => {
        fixture.componentRef.setInput('undecorated', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-link--undecorated')).toBe(true);
    });

    it('should add touch-target class when touchTarget input is true', () => {
        fixture.componentRef.setInput('touchTarget', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-link--touch-target')).toBe(true);
    });

    it('should set aria-disabled to true when disabled', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set aria-disabled to false when not disabled', () => {
        fixture.componentRef.setInput('disabled', false);
        fixture.detectChanges();
        expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('false');
    });

    it('should apply multiple classes when multiple inputs are set', () => {
        fixture.componentRef.setInput('emphasized', true);
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-link--emphasized')).toBe(true);
        expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
    });
});
