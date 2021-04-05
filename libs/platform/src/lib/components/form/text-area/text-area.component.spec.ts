import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextAreaComponent } from './text-area.component';
import { FormGroup, ReactiveFormsModule, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormFieldComponent, FdpFormGroupModule } from '@fundamental-ngx/platform';
import { PlatformTextAreaModule } from './text-area.module';
import { By } from '@angular/platform-browser';
import { createKeyboardEvent } from '../../../testing/event-objects';
import { DELETE } from '@angular/cdk/keycodes';
import '@angular/localize/init';

@Component({
    selector: 'fdp-test-textarea',
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <fdp-form-group #fg1 [formGroup]="form">
                <fdp-form-field
                    #basicTextareaField
                    [id]="'basicTextarea'"
                    label="Basic Textarea with Platform Forms"
                    [placeholder]="'Start entering detailed description'"
                    hint="This is tooltip help"
                    zone="zLeft"
                    rank="10"
                    hintPlacement="'left'"
                    [validators]="textareaValidator"
                >
                    <fdp-textarea
                        formControlName="basicTextarea"
                        name="'basicTextarea'"
                        [growingMaxLines]="3"
                        [growing]="true"
                        [contentDensity]="'compact'"
                        [maxLength]="10"
                        [cols]="10"
                        [stateType]="'error'"
                        [showExceededText]="true"
                        [height]="'80px'"
                        [wrapType]="'hard'"
                    ></fdp-textarea>
                </fdp-form-field>
                <ng-template #i18n let-errors>
                    <span *ngIf="errors && errors.required" class="error">This field is required.</span>
                    <span *ngIf="errors && errors.maxlength">
                        Please get your character count under limit.
                    </span>
                </ng-template>
            </fdp-form-group>
            <button type="submit" #submitButton>Submit</button>
        </form>
    `
})
class BasicTextareaTestWrapperComponent {
    @ViewChild(TextAreaComponent)
    textareaComponent: TextAreaComponent;
    @ViewChild('basicTextareaField') basicTextareaField: FormFieldComponent;

    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    public form: FormGroup = new FormGroup({
        basicTextarea: new FormControl('this is a random note')
    });

    textareaValidator: ValidatorFn[] = [Validators.maxLength(10), Validators.required];

    public result: any = null;

    onSubmit(): void {
        this.result = this.form.value;
    }
}

describe('Basic Textarea', () => {
    let fixture: ComponentFixture<BasicTextareaTestWrapperComponent>;
    let host: BasicTextareaTestWrapperComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformTextAreaModule],
            declarations: [BasicTextareaTestWrapperComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicTextareaTestWrapperComponent);
        host = fixture.componentInstance;

        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should have compact class applied', () => {
        const textareaElement = fixture.debugElement.query(By.css('textarea'));
        expect(textareaElement.nativeElement.classList.contains('fd-textarea--compact')).toBeTruthy();
    });

    it('should have a label, hint, placeholder and default value', async () => {
        await wait(fixture);

        const textareaLabel = host.basicTextareaField.label;
        expect(textareaLabel).toBe('Basic Textarea with Platform Forms');

        const textareaPlaceholder = host.basicTextareaField.placeholder;
        expect(textareaPlaceholder).toBe('Start entering detailed description');

        const textareaHint = host.basicTextareaField.hint;
        expect(textareaHint).toBe('This is tooltip help');

        const textareaDefaultValue = host.form.get('basicTextarea').value;
        expect(textareaDefaultValue).toBe('this is a random note');
    });

    it('should accept a different custom value', async () => {
        const textareaElement = host.textareaComponent;
        textareaElement.value = 'this is a new value';
        await wait(fixture);
        expect(host.form.get('basicTextarea').value).toBe('this is a new value');

        textareaElement.value = '';
        await wait(fixture);

        expect(host.form.get('basicTextarea').value).toBe('');
    });

    it('should submit the value', async () => {
        const submitButton = host.submitButton.nativeElement;
        submitButton.click();

        await wait(fixture);

        expect(host.result).toEqual({ basicTextarea: 'this is a random note' });
    });
});

describe('Advanced Textarea', () => {
    let fixture: ComponentFixture<BasicTextareaTestWrapperComponent>;
    let host: BasicTextareaTestWrapperComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformTextAreaModule],
            declarations: [BasicTextareaTestWrapperComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicTextareaTestWrapperComponent);
        host = fixture.componentInstance;

        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should call validateLengthOnCustomSet', async () => {
        const textareaElement = host.textareaComponent;
        spyOn(textareaElement, 'validateLengthOnCustomSet');
        textareaElement.maxLength = 5;
        textareaElement.value = 'abcdefgg';

        expect(textareaElement.validateLengthOnCustomSet).toHaveBeenCalled();
    });

    it('should change the counter message correctly', async () => {
        const textareaElement = host.textareaComponent;
        textareaElement.maxLength = 5;
        textareaElement.value = 'abcdefgg';

        await wait(fixture);

        expect(host.form.get('basicTextarea').value).toBe('abcdefgg');

        const textareaCounterElement = fixture.debugElement.query(By.css('.fd-textarea-counter'));
        const result = textareaCounterElement.nativeElement.textContent.toString().trim();
        expect(result).toBe('3 characters over the limit');
    });

    it('should change the counter message correctly when within limit', async () => {
        const textareaElement = host.textareaComponent;
        textareaElement.maxLength = 5;
        textareaElement.value = 'abc';

        await wait(fixture);

        expect(host.form.get('basicTextarea').value).toBe('abc');

        const textareaCounterElement = fixture.debugElement.query(By.css('.fd-textarea-counter'));
        const result = textareaCounterElement.nativeElement.textContent.toString().trim();
        expect(result).toBe('2 characters remaining');
    });

    it('should not focus when textarea is disabled', async () => {
        const textareaElement = host.textareaComponent;
        spyOn(textareaElement, 'setDisabledState');

        host.form.get('basicTextarea').disable();
        await wait(fixture);
        expect(host.form.get('basicTextarea').disabled).toBe(true);
        expect(textareaElement.setDisabledState).toHaveBeenCalled();
        textareaElement.textareaElement.nativeElement.click();
        await wait(fixture);
    });

    it('should handle backpress for deleting excess or remaining characters', async () => {
        const textareaComponent = host.textareaComponent;
        textareaComponent.textareaElement.nativeElement.focus();
        textareaComponent.showExceededText = false;
        textareaComponent.maxLength = 5;
        textareaComponent.value = 'abcdef';
        textareaComponent.growing = false;
        const keyboardEvent = createKeyboardEvent('keydown', DELETE, 'Delete');
        textareaComponent.handleBackPress(keyboardEvent);
        await wait(fixture);

        expect(host.form.get('basicTextarea').value).toBe('abcde');
    });
    it('should handle call autogrow for any other keypress', async () => {
        const textareaComponent = host.textareaComponent;
        textareaComponent.contentDensity = 'cozy';
        textareaComponent.height = undefined;
        expect(textareaComponent.growingMaxLines).toBe(3);
        textareaComponent.textareaElement.nativeElement.focus();

        textareaComponent.value = '1';
        textareaComponent.value += '\n';
        textareaComponent.value += '1';
        textareaComponent.value += '\n';
        textareaComponent.value += '1';
        textareaComponent.value += '\n';
        await wait(fixture);
        await wait(fixture);
        await wait(fixture);
        textareaComponent.value += '1';
        textareaComponent.value += '\n';
        textareaComponent.value += '1';
        // since we are simulating newline-containing value to be custom set, we need to call ngAfterViewInit
        // for the max-height setting logic to take place
        textareaComponent.ngAfterViewInit();
        textareaComponent.handleBackPress(new KeyboardEvent('keyup', { key: '\n' }));

        expect(textareaComponent.textareaElement.nativeElement.style.height).toBe('57px');
    });
    // TODO: Unskip after fix
    xit('should handle grow indefinitely if max height is not specified', async () => {
        const textareaComponent = host.textareaComponent;
        textareaComponent.contentDensity = 'cozy';
        // textareaComponent.growing = true;
        textareaComponent.height = undefined;
        textareaComponent.growingMaxLines = undefined;
        textareaComponent.textareaElement.nativeElement.maxHeight = 'inherit';
        textareaComponent.textareaElement.nativeElement.focus();
        textareaComponent.value = '1';
        textareaComponent.value += '\n';
        textareaComponent.value += '2';
        textareaComponent.value += '\n';
        textareaComponent.value += '3';
        textareaComponent.value += '\n';
        await wait(fixture);
        await wait(fixture);
        await wait(fixture);
        textareaComponent.value += '4';
        textareaComponent.value += '\n';
        textareaComponent.value += '5';
        textareaComponent.value += '\n';
        textareaComponent.value += '6';
        textareaComponent.value += '\n';
        await wait(fixture);
        textareaComponent.ngAfterViewInit();

        textareaComponent.handleBackPress(new KeyboardEvent('keyup', { key: '\n' }));
        await wait(fixture);

        expect(textareaComponent.textareaElement.nativeElement.scrollHeight).toBe(149);
    });

    it('should handle height given preference', async () => {
        const textareaComponent = host.textareaComponent;
        textareaComponent.contentDensity = 'cozy';
        await wait(fixture);

        textareaComponent.textareaElement.nativeElement.focus();
        textareaComponent.value = '1';
        textareaComponent.value += '\n';
        textareaComponent.value += '2';
        textareaComponent.value += '\n';
        textareaComponent.value += '3';
        textareaComponent.value += '\n';
        await wait(fixture);
        textareaComponent.value += '4';
        textareaComponent.value += '\n';
        textareaComponent.value += '5';
        textareaComponent.value += '\n';
        textareaComponent.handleBackPress(new KeyboardEvent('keyup', { key: '\n' }));

        await wait(fixture);

        expect(textareaComponent.textareaElement.nativeElement.style.height).toBe('80px'); // without border
    });
    it('should call autogrow method', async () => {
        const textareaElement = host.textareaComponent;
        spyOn(textareaElement, 'autoGrowTextArea');

        textareaElement.handleBackPress(new KeyboardEvent('keyup', { key: 'd' }));
        await wait(fixture);
        expect(textareaElement.autoGrowTextArea).toHaveBeenCalled();
    });
});
