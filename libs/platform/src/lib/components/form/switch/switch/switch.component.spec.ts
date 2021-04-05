import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule, SwitchModule } from '@fundamental-ngx/core';
import { SwitchComponent, SwitchChangeEvent } from './switch.component';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';

@Component({
    selector: 'fdp-test-switch',
    template: `
        <fdp-form-group [formGroup]="customForm">
            <fdp-form-field id="switch-field-0">
                <fdp-switch
                    id="switch-0"
                    name="switch-0"
                    ariaLabel="switch-label-0"
                    ariaLabelledby="switch-labelledby-0"
                    formControlName="switch0"
                    (switchChange)="switchChange($event)">
                </fdp-switch>
            </fdp-form-field>

            <fdp-form-field id="switch-field-1">
                <fdp-switch
                    id="switch-1"
                    name="switch-1"
                    ariaLabel="switch-label-1"
                    ariaLabelledby="switch-labelledby-1"
                    formControlName="switch1"
                    contentDensity="compact">
                </fdp-switch>
            </fdp-form-field>

            <fdp-form-field id="switch-field-2">
                <fdp-switch
                    id="switch-2"
                    name="switch-2"
                    ariaLabel="switch-label-2"
                    ariaLabelledby="switch-labelledby-2"
                    formControlName="switch2"
                    semantic="true">
                </fdp-switch>
            </fdp-form-field>

            <fdp-form-field id="switch-field-3">
                <fdp-switch
                    id="switch-3"
                    name="switch-3"
                    ariaLabel="switch-label-3"
                    ariaLabelledby="switch-labelledby-3"
                    formControlName="switch3"
                    semantic="true">
                </fdp-switch>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestSwitchComponent {
    @ViewChildren(SwitchComponent)
    fdpSwitch: QueryList<SwitchComponent>;
    switch0CurrentValue: boolean | null = null;

    customForm = new FormGroup({
        switch0: new FormControl(false),
        switch1: new FormControl(true),
        switch2: new FormControl(false),
        switch3: new FormControl({ value: true, disabled: true })
    });

    switchChange(value: SwitchChangeEvent): void {
        this.switch0CurrentValue = value.payload;
    }
}

describe('SwitchComponent', () => {
    let component: TestSwitchComponent;
    let fixture: ComponentFixture<TestSwitchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, FormsModule, ReactiveFormsModule, SwitchModule],
            declarations: [TestSwitchComponent, SwitchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have classes applied', () => {
        const fdpElem = fixture.debugElement.query(By.css('#switch-0'));

        // fdp-switches
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-id')).toEqual('switch-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('switch0');
    });

    it('should have compact applied', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpElem = fixture.debugElement.query(By.css('#switch-1 .fd-switch--compact'));
        const switches = component.fdpSwitch.toArray();
        expect(switches[1]._contentDensity).toEqual('compact');
        expect(fdpElem).toBeTruthy();
    });

    it('should trigger an event after click', async () => {
        const switchLabel = fixture.debugElement.query(By.css('#switch-0 .fd-switch'));

        expect(component.switch0CurrentValue).toBeNull();

        switchLabel.nativeElement.click();
        fixture.detectChanges();

        expect(component.switch0CurrentValue).toBeTrue();
    });

    it('should change switch state on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const switches = component.fdpSwitch.toArray();

        // default value
        expect(switches[0].switchCurrentValue).toBeFalse();
        expect(component.customForm.get('switch0').value).toBeFalse();

        const switchLabel = fixture.debugElement.query(By.css('#switch-0 .fd-switch'));

        switchLabel.nativeElement.click();
        fixture.detectChanges();

        expect(switches[0].switchCurrentValue).toBeTrue();
        expect(component.customForm.get('switch0').value).toBeTrue();

        switchLabel.nativeElement.click();
        fixture.detectChanges();

        expect(switches[0].switchCurrentValue).toBeFalse();
        expect(component.customForm.get('switch0').value).toBeFalse();
    });

    it('should apply is-error style on form Error', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(inputElem.nativeElement.classList.contains('is-error')).toBeFalsy();
        expect(inputElem.nativeElement.classList.contains('is-warning')).toBeFalsy();

        component.customForm.get('switch0').setErrors({ 'has error': true });
        component.customForm.get('switch0').markAsTouched();

        fixture.detectChanges();

        expect(component.customForm.status).toEqual('INVALID');
    });

    it('should not be able to change disabled switch value on click, ', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const switches = component.fdpSwitch.toArray();
        const switchLabel = fixture.debugElement.query(By.css('#switch-3 .fd-switch'));

        fixture.detectChanges();

        expect(switches[3].switchCurrentValue).toBeTruthy();

        // click on disabled switch
        switchLabel.nativeElement.click();
        fixture.detectChanges();

        expect(switches[3].switchCurrentValue).toBeTruthy();
    });
});
