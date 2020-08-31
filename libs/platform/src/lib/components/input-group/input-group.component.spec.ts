import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ContentDensity, Status } from '../form/form-control';
import { InputComponent } from '../form/input/input.component';

import { InputGroupComponent } from './input-group.component';
import { PlatformInputGroupModule } from './input-group.module';

@Component({
    template: `<fdp-input-group [contentDensity]="contentDensity" [disabled]="disabled" [state]="state">
        <fdp-input-group-addon>$</fdp-input-group-addon>
        <fdp-input name="test-input"></fdp-input>
        <fdp-input-group-addon>0.00</fdp-input-group-addon>
        <fdp-input-group-addon>
            <fdp-button>Button</fdp-button>
        </fdp-input-group-addon>
    </fdp-input-group>`
})
class InputGroupHostComponent {
    @ViewChild(InputGroupComponent) inputGroupComponent: InputGroupComponent;
    @ViewChild(InputComponent) inputComponent: InputComponent;

    contentDensity: ContentDensity = 'cozy';
    disabled = false;
    state: Status = 'default';
}
describe('InputGroup component', () => {
    let host: InputGroupHostComponent;
    let fixture: ComponentFixture<InputGroupHostComponent>;
    let inputGroupComponent: InputGroupComponent;
    let inputComponent: InputComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformInputGroupModule],
            declarations: [InputGroupHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        inputGroupComponent = host.inputGroupComponent;
        inputComponent = host.inputComponent;
    });

    it('Should render input group', () => {
        expect(inputGroupComponent).toBeTruthy();
    });

    it('Should render children in the order that they are placed', () => {
        const hostElement = fixture.debugElement.nativeElement as HTMLElement;
        const addons = hostElement.querySelectorAll('fdp-input-group-addon');
        const input = hostElement.querySelector('fdp-input');

        expect(addons.length === 3).toBeTrue();

        expect(addons[0].textContent.includes('$')).toBeTruthy();
        expect(addons[1].textContent.includes('0.00')).toBeTruthy();
        expect(addons[2].textContent.includes('Button')).toBeTruthy();
        // input lies among first and second addon
        expect(addons[0].nextElementSibling).toBe(input);
        expect(input.nextElementSibling).toBe(addons[1]);
    });

    it('Should add class to child input', () => {
        const inputElements = fixture.debugElement.queryAll(By.css('input:not([type="button"])'));
        expect(inputElements[0].classes['fd-input-group__input']).toBeTrue();
    });

    it('Should add class when disabled', () => {
        expect(host.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('.is-disabled'))).toBeFalsy();

        host.disabled = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.is-disabled'))).toBeTruthy();
    });

    it('Should add class to show current state', () => {
        host.state = 'error';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.is-error'))).toBeTruthy();

        host.state = 'success';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.is-success'))).toBeTruthy();

        host.state = 'warning';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.is-warning'))).toBeTruthy();
    });

    it('Should pass down contentDensity to input component', () => {
        host.contentDensity = 'compact';
        fixture.detectChanges();
        expect(inputComponent.contentDensity === 'compact').toBeTrue();
    });
});
