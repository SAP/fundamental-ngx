import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioButtonComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';
import { FormModule, RadioModule } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-test-radio-group',
    template: `
        <form [formGroup]="customForm">
            <fieldset fd-fieldset>
                <fdp-radio-group
                    [id]="'radio1'"
                    [name]="'radio1'"
                    [contentDensity]="'compact'"
                    [value]="'Spring'"
                    [isInline]="false"
                    formControlName="example1"
                >
                    <fdp-radio-button *ngFor="let season of seasons" [value]="season">
                        {{ season }}
                    </fdp-radio-button>
                </fdp-radio-group>
            </fieldset>
        </form>
    `
})
class TestComponentContent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    favoriteSeason: string = '';
    customForm = new FormGroup({
        example1: new FormControl({ value: '', disabled: false })
    });

    @ViewChild(RadioGroupComponent)
    radioGroup: RadioGroupComponent;
}

describe('RadioGroupComponent', () => {
    let host: TestComponentContent;
    let component: RadioGroupComponent;
    let fixture: ComponentFixture<TestComponentContent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormModule, RadioModule, ReactiveFormsModule],
            declarations: [TestComponentContent, RadioGroupComponent, RadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentContent);
        host = fixture.componentInstance;
        component = host.radioGroup;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create radio buttons with given values', () => {
        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));
        expect(fdradiobuttonsElem.length).toEqual(4);
        fdradiobuttonsElem.forEach((fdradio) => {
            expect(host.seasons.includes(fdradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
        const inputElem = fixture.debugElement.queryAll(By.css('input'));
        expect(inputElem.length).toEqual(4);
        inputElem.forEach((inputradio) => {
            expect(host.seasons.includes(inputradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
    });

    it('control value should change on click', async () => {
        await wait(fixture);
        expect(host.customForm.get('example1').value).toEqual('Spring');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[0].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Winter');

        fdradiobuttonsElem[1].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Spring');

        fdradiobuttonsElem[2].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Summer');

        fdradiobuttonsElem[3].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Autumn');
    });

    it('should have is-error set to radio button', async () => {
        const inputElem1 = fixture.debugElement.queryAll(By.css('input'));
        inputElem1.forEach((inputradio) => {
            expect(inputradio.nativeElement.classList.contains('is-error')).toBeFalsy();
            expect(inputradio.nativeElement.classList.contains('is-warning')).toBeFalsy();
        });

        host.customForm.get('example1').setErrors({ 'has error': true });
        host.customForm.get('example1').markAsTouched();

        await wait(fixture);
        fixture.detectChanges();
        const inputElem2 = fixture.debugElement.queryAll(By.css('input'));
        inputElem2.forEach((inputradio) => {
            expect(inputradio.nativeElement.classList.contains('is-error')).toBeTruthy();
        });
    });
});

@Component({
    selector: 'fdp-test-radio-group',
    template: `
        <form class="flex-form">
            <fieldset fd-fieldset>
                <fdp-radio-group
                    [id]="'radio1'"
                    [name]="'radio1'"
                    [value]="'Spring'"
                    [list]="seasons"
                    [isInline]="false"
                    [(ngModel)]="favoriteSeason"
                >
                </fdp-radio-group>
            </fieldset>
        </form>
    `
})
class TestComponentList {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteSeason: string = '';

    @ViewChild(RadioGroupComponent)
    radioGroup: RadioGroupComponent;

    @ViewChildren(RadioButtonComponent)
    radioButtons: RadioButtonComponent;
}

describe('GroupRadioButtonComponent', () => {
    let host: TestComponentList;
    let component: RadioGroupComponent;
    let fixture: ComponentFixture<TestComponentList>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormModule, RadioModule, FormsModule],
            declarations: [TestComponentList, RadioGroupComponent, RadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentList);
        host = fixture.componentInstance;
        component = host.radioGroup;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create radio buttons with given values', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));
        fixture.detectChanges();

        expect(fdradiobuttonsElem.length).toEqual(4);
        fdradiobuttonsElem.forEach((fdradio) => {
            expect(host.seasons.includes(fdradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
        const inputElem = fixture.debugElement.queryAll(By.css('input'));
        expect(inputElem.length).toEqual(4);
        inputElem.forEach((inputradio) => {
            expect(host.seasons.includes(inputradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
    });

    it('control value should change on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(host.favoriteSeason).toEqual('Spring');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[0].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Winter');

        fdradiobuttonsElem[1].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Spring');

        fdradiobuttonsElem[2].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Summer');

        fdradiobuttonsElem[3].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Autumn');
    });
});
