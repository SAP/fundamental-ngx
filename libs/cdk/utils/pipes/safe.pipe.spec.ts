import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
    let pipe: SafePipe;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [SafePipe] });
        pipe = TestBed.inject(SafePipe);
        sanitizer = TestBed.inject(DomSanitizer);
    });

    // ── url scheme-rejection ──────────────────────────────────────────────────

    it('should reject javascript: URLs with an empty safe value', () => {
        const result = pipe.transform('javascript:alert(1)', 'url');
        const sanitized = sanitizer.sanitize(SecurityContext.URL, result) ?? '';
        expect(sanitized).toBe('');
    });

    it('should reject data: URLs containing HTML', () => {
        const result = pipe.transform('data:text/html,<script>x</script>', 'url');
        const sanitized = sanitizer.sanitize(SecurityContext.URL, result) ?? '';
        expect(sanitized).toBe('');
    });

    // Browsers strip ASCII tab/newline from the whole URL before parsing, so a
    // tab or newline embedded in the scheme must not evade detection.
    it.each(['java\tscript:alert(1)', 'java\nscript:alert(1)', 'jav\rascript:alert(1)'])(
        'should reject control-character-split javascript: scheme (%s)',
        (payload) => {
            const result = pipe.transform(payload, 'url');
            const sanitized = sanitizer.sanitize(SecurityContext.URL, result) ?? '';
            expect(sanitized).toBe('');
        }
    );

    // ── positive cases ────────────────────────────────────────────────────────

    it('should preserve https: URLs', () => {
        const result = pipe.transform('https://sap.com', 'url');
        const sanitized = sanitizer.sanitize(SecurityContext.URL, result) ?? '';
        expect(sanitized).toMatch(/^https:\/\/sap\.com/);
    });

    it('should preserve mailto: URLs', () => {
        const result = pipe.transform('mailto:a@b.com', 'url');
        const sanitized = sanitizer.sanitize(SecurityContext.URL, result) ?? '';
        expect(sanitized).toMatch(/^mailto:/);
    });

    it('should preserve relative paths', () => {
        const result = pipe.transform('/relative/path', 'url');
        const sanitized = sanitizer.sanitize(SecurityContext.URL, result) ?? '';
        expect(sanitized).toBe('/relative/path');
    });

    // ── unchanged bypass branches (regression guards) ─────────────────────────

    it('should still call bypassSecurityTrustHtml for html type', () => {
        const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustHtml');
        pipe.transform('<b>bold</b>', 'html');
        expect(spy).toHaveBeenCalledWith('<b>bold</b>');
    });

    it('should still call bypassSecurityTrustStyle for style type', () => {
        const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustStyle');
        pipe.transform('color: red', 'style');
        expect(spy).toHaveBeenCalledWith('color: red');
    });

    it('should still call bypassSecurityTrustScript for script type', () => {
        const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustScript');
        pipe.transform('console.log(1)', 'script');
        expect(spy).toHaveBeenCalledWith('console.log(1)');
    });

    it('should still call bypassSecurityTrustResourceUrl for resourceUrl type', () => {
        const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
        pipe.transform('https://cdn.example.com/res', 'resourceUrl');
        expect(spy).toHaveBeenCalledWith('https://cdn.example.com/res');
    });

    // ── error branch ──────────────────────────────────────────────────────────

    it('should throw for unknown type', () => {
        expect(() => pipe.transform('x', 'bogus')).toThrow('Invalid safe type specified: bogus');
    });
});
