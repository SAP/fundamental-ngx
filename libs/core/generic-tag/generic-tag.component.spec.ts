import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GenericTagComponent } from './generic-tag.component';

describe('GenericTagComponent', () => {
    let component: GenericTagComponent;
    let fixture: ComponentFixture<GenericTagComponent>;
    let element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [GenericTagComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GenericTagComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        // Set required input
        fixture.componentRef.setInput('name', 'Test Name');
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
        expect(element).toBeTruthy();
    });

    it('Should add type', () => {
        fixture.componentRef.setInput('type', 'error');
        fixture.detectChanges();
        expect(element.classList.contains('fd-generic-tag--error')).toBe(true);
    });

    it('Should add success type', () => {
        fixture.componentRef.setInput('type', 'success');
        fixture.detectChanges();
        expect(element.classList.contains('fd-generic-tag--success')).toBe(true);
    });

    it('Should have default class without type', () => {
        expect(element.classList.contains('fd-generic-tag')).toBe(true);
        expect(element.classList.contains('fd-generic-tag--error')).toBe(false);
    });

    it('Should display name', () => {
        const name = 'Product Cost';
        fixture.componentRef.setInput('name', name);
        fixture.detectChanges();

        const nameTextElement = element.querySelector('.fd-generic-tag__name');

        expect(nameTextElement).toBeTruthy();
        expect(nameTextElement?.textContent?.trim()).toBe(name);
    });

    it('Should update name when input changes', () => {
        fixture.componentRef.setInput('name', 'Initial Name');
        fixture.detectChanges();

        const nameTextElement = element.querySelector('.fd-generic-tag__name');
        expect(nameTextElement?.textContent?.trim()).toBe('Initial Name');

        fixture.componentRef.setInput('name', 'Updated Name');
        fixture.detectChanges();
        expect(nameTextElement?.textContent?.trim()).toBe('Updated Name');
    });

    it('Should display value', () => {
        const value = 'EUR';
        fixture.componentRef.setInput('value', value);
        fixture.detectChanges();

        const valueTextElement = element.querySelector('.fd-generic-tag__value');

        expect(valueTextElement).toBeTruthy();
        expect(valueTextElement?.textContent?.trim()).toBe(value);
    });

    it('Should not display value when not provided', () => {
        const valueTextElement = element.querySelector('.fd-generic-tag__value');
        expect(valueTextElement).toBeFalsy();
    });

    it('Should display icon when type is provided', () => {
        fixture.componentRef.setInput('type', 'warning');
        fixture.detectChanges();

        const icon = element.querySelector('fd-icon');
        expect(icon).toBeTruthy();
    });

    it('Should not display icon when type is not provided', () => {
        const icon = element.querySelector('fd-icon');
        expect(icon).toBeFalsy();
    });

    it('Should set aria-roledescription', () => {
        expect(element.getAttribute('aria-roledescription')).toBe('Generic Tag');
    });

    it('Should update aria-roledescription when input changes', () => {
        fixture.componentRef.setInput('ariaRoleDescription', 'Custom Tag');
        fixture.detectChanges();
        expect(element.getAttribute('aria-roledescription')).toBe('Custom Tag');
    });
});
