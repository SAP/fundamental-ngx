import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarComponent } from './bar.component';

describe('BarComponent', () => {
    let component: BarComponent;
    let fixture: ComponentFixture<BarComponent>;
    let el: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BarComponent);
        component = fixture.componentInstance;
        el = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should always have the fd-bar class', () => {
        expect(el.classList).toContain('fd-bar');
    });

    it('should set role attribute to toolbar by default', () => {
        expect(el.getAttribute('role')).toBe('toolbar');
    });

    it('should apply custom role when provided', () => {
        fixture.componentRef.setInput('role', 'navigation');
        fixture.detectChanges();
        expect(el.getAttribute('role')).toBe('navigation');
    });

    it('should apply barDesign class', () => {
        fixture.componentRef.setInput('barDesign', 'header');
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--header');
    });

    it('should apply footer design class', () => {
        fixture.componentRef.setInput('barDesign', 'footer');
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--footer');
    });

    it('should apply fd-bar--page when inPage is true and no size', () => {
        fixture.componentRef.setInput('inPage', true);
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--page');
        expect(el.classList).not.toContain('fd-bar--page-s');
    });

    it('should apply fd-bar--page-{size} when inPage is true with a size', () => {
        fixture.componentRef.setInput('inPage', true);
        fixture.componentRef.setInput('size', 's');
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--page-s');
        expect(el.classList).not.toContain('fd-bar--page');
    });

    it('should apply fd-bar--home-page when inHomePage is true and no size', () => {
        fixture.componentRef.setInput('inHomePage', true);
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--home-page');
    });

    it('should apply fd-bar--home-page-{size} when inHomePage is true with a size', () => {
        fixture.componentRef.setInput('inHomePage', true);
        fixture.componentRef.setInput('size', 'xl');
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--home-page-xl');
        expect(el.classList).not.toContain('fd-bar--home-page');
    });

    it('should apply fd-bar--clear when clear is true', () => {
        fixture.componentRef.setInput('clear', true);
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--clear');
    });

    it('should apply initialSuggestionTitle class', () => {
        fixture.componentRef.setInput('initialSuggestionTitle', true);
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--initial-suggestion-title');
    });

    it('should apply initialSuggestionSubline class', () => {
        fixture.componentRef.setInput('initialSuggestionSubline', true);
        fixture.detectChanges();
        expect(el.classList).toContain('fd-bar--initial-suggestion-subline');
    });
});
