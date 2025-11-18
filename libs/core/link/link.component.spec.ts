import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { LinkComponent } from './link.component';

@Pipe({
    name: 'fdTranslate',
    standalone: true
})
class MockFdTranslatePipe implements PipeTransform {
    transform(value: string): string {
        // For testing, just return the translation key itself
        // This way we can verify the correct keys are being used
        return value;
    }
}

describe('LinkComponent', () => {
    let component: LinkComponent;
    let fixture: ComponentFixture<LinkComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LinkComponent]
        })
            .overrideComponent(LinkComponent, {
                remove: { imports: [FdTranslatePipe] },
                add: { imports: [MockFdTranslatePipe] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when the link is emphasized', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('emphasized', true);
            component.buildComponentCssClass();
            fixture.detectChanges();
        });

        it('should add an emphasized class', () => {
            expect(component.elementRef.nativeElement.classList.contains('fd-link--emphasized')).toBe(true);
        });

        it('should add a screen-reader text', () => {
            expect(component.elementRef.nativeElement.querySelector('.fd-link__sr-only')?.textContent).toEqual(
                'coreLink.emphasized'
            );
        });
    });

    describe('when the link is subtle', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('subtle', true);
            component.buildComponentCssClass();
            fixture.detectChanges();
        });

        it('should add a subtle class', () => {
            expect(component.elementRef.nativeElement.classList.contains('fd-link--subtle')).toBe(true);
        });

        it('should add a screen-reader text', () => {
            expect(component.elementRef.nativeElement.querySelector('.fd-link__sr-only')?.textContent).toEqual(
                'coreLink.subtle'
            );
        });
    });

    it('should add an inverted class', () => {
        fixture.componentRef.setInput('inverted', true);
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-link--inverted')).toBe(true);
    });

    it('should add an undecorated class', () => {
        fixture.componentRef.setInput('undecorated', true);
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-link--undecorated')).toBe(true);
    });

    it('should add a touch-target class', () => {
        fixture.componentRef.setInput('touchTarget', true);
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-link--touch-target')).toBe(true);
    });

    it('should add a disabled class', () => {
        fixture.componentRef.setInput('disabled', true);
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('is-disabled')).toBe(true);
    });

    it('should add an aria-disabled attribute if disabled flag is passed', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });
});
