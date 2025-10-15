import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ObjectNumberComponent } from './object-number.component';

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

describe('ObjectNumberComponent', () => {
    let component: ObjectNumberComponent;
    let fixture: ComponentFixture<ObjectNumberComponent>;
    const number = 1000.37;
    const numberTextEl = '.fd-object-number__text';

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ObjectNumberComponent]
        })
            .overrideComponent(ObjectNumberComponent, {
                remove: { imports: [FdTranslatePipe] },
                add: { imports: [MockFdTranslatePipe] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply large design', () => {
        fixture.componentRef.setInput('large', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-object-number--large')).toBe(true);
    });

    it('should add status', () => {
        fixture.componentRef.setInput('status', 'positive');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-object-number--positive')).toBe(true);
    });

    it('should add custom class', () => {
        fixture.componentRef.setInput('class', 'custom-class');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('custom-class')).toBe(true);
    });

    it('should display units', () => {
        fixture.componentRef.setInput('unit', 'TEST');
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.textContent.includes('TEST')).toBe(true);
    });

    it('should display decimals', () => {
        fixture.componentRef.setInput('number', number);
        fixture.componentRef.setInput('decimal', 2);
        fixture.detectChanges();
        expect(
            component.elementRef.nativeElement.querySelector(numberTextEl).textContent.includes('1,000.37')
        ).toBeTruthy();
    });

    it('should not display decimals if [decimal] set to 0', () => {
        fixture.componentRef.setInput('number', number);
        fixture.componentRef.setInput('decimal', 0);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.querySelector(numberTextEl).textContent.trim()).toEqual('1,000');
    });

    it('should add translated screen reader "Emphasized" text when object number is emphasized', () => {
        fixture.componentRef.setInput('emphasized', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.querySelector('.fd-object-number__sr-only').textContent).toEqual(
            'coreObjectNumber.emphasized'
        );
    });

    it('should add translated screen reader status text when status is set', () => {
        fixture.componentRef.setInput('status', 'positive');
        fixture.detectChanges();

        const srElement = fixture.nativeElement.querySelector('.fd-object-number__sr-only');
        expect(srElement).toBeTruthy();
        expect(srElement.textContent).toEqual('coreObjectNumber.positive');
    });

    describe('when interactive is true', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('interactive', true);
            fixture.detectChanges();
        });

        it('should add an "fd-object-number--interactive" class', () => {
            expect(component.elementRef.nativeElement.classList.contains('fd-object-number--interactive')).toBe(true);
        });

        it('should set tabindex on the host to 0', () => {
            expect(component.elementRef.nativeElement.tabIndex).toBe(0);
        });

        it('should set role on the host to "button"', () => {
            expect(component.elementRef.nativeElement.role).toBe('button');
        });
    });

    it('should add an "fd-object-number--inverted" class when inverted is true', () => {
        fixture.componentRef.setInput('inverted', true);
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains('fd-object-number--inverted')).toBe(true);
    });
});
