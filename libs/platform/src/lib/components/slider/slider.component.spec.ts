import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SliderCustomValue } from '@fundamental-ngx/core';

import { SliderComponent } from './slider.component';
import { FdpFormGroupModule } from '../form/public_api';
import { PlatformSliderModule } from './slider.module';

@Component({
    selector: 'fdp-test-slider',
    template: `
        <fdp-form-group [formGroup]="customForm">
            <fdp-form-field id="value1">
                <fdp-slider
                    class="example-1"
                    [min]="-1"
                    [max]="1"
                    [step]="0.2"
                    [showTicks]="true"
                    [showTicksLabels]="true"
                    tooltipMode="readonly"
                    name="value1"
                    formControlName="value1"
                >
                </fdp-slider>
            </fdp-form-field>

            <fdp-form-field id="value2">
                <fdp-slider
                    class="example-2"
                    [min]="-1"
                    [max]="1"
                    [step]="0.2"
                    [showTicks]="true"
                    [showTicksLabels]="true"
                    [tickmarksBetweenLabels]="2"
                    tooltipMode="editable"
                    name="value2"
                    formControlName="value2"
                ></fdp-slider>
            </fdp-form-field>

            <fdp-form-field id="value3">
                <fdp-slider
                    class="example-3"
                    [showTicks]="true"
                    [showTicksLabels]="true"
                    [customValues]="customValues"
                    name="value3"
                    formControlName="value3"
                ></fdp-slider>
            </fdp-form-field>

            <fdp-form-field id="value4">
                <fdp-slider class="example-4" mode="range" name="value4" formControlName="value4"></fdp-slider>
            </fdp-form-field>

            <fdp-form-field id="value5">
                <fdp-slider class="example-5" name="value5" formControlName="value5"> </fdp-slider>
            </fdp-form-field>

            <fdp-form-field id="value6">
                <fdp-slider class="example-6" contentDensity="cozy" name="value6" formControlName="value6"> </fdp-slider>
            </fdp-form-field>
        </fdp-form-group>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestSliderComponent {
    customValues: SliderCustomValue[] = [
        { value: 1609452000000, label: 'Jan 1' },
        { value: 1609538400000, label: 'Jan 2' },
        { value: 1609624800000, label: 'Jan 3' },
        { value: 1609711200000, label: 'Jan 4' },
        { value: 1609797600000, label: 'Jan 5' },
        { value: 1609884000000, label: 'Jan 6' },
        { value: 1609970400000, label: 'Jan 7' },
        { value: 1610056800000, label: 'Jan 8' },
        { value: 1610143200000, label: 'Jan 9' },
        { value: 1610229600000, label: 'Jan 10' }
    ];

    customForm = new FormGroup({
        value1: new FormControl(0),
        value2: new FormControl(0),
        value3: new FormControl(this.customValues[4]),
        value4: new FormControl([20, 70]),
        value5: new FormControl({ value: 50, disabled: true }),
        value6: new FormControl(50)
    });

    get value1(): number {
        return this.customForm.controls['value1'].value;
    }

    get value2(): number {
        return this.customForm.controls['value2'].value;
    }

    get value3(): SliderCustomValue {
        return this.customForm.controls['value3'].value;
    }

    get value4(): [number, number] {
        return this.customForm.controls['value4'].value;
    }

    get value5(): number {
        return this.customForm.controls['value5'].value;
    }

    get value6(): number {
        return this.customForm.controls['value6'].value;
    }
}

describe('PlatformSliderComponent', () => {
    let component: TestSliderComponent;
    let fixture: ComponentFixture<TestSliderComponent>;
    let bodyClientWidth = 0;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestSliderComponent, SliderComponent],
            imports: [PlatformSliderModule, ReactiveFormsModule, FdpFormGroupModule]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestSliderComponent);
        component = fixture.debugElement.componentInstance;

        await whenStable(fixture);

        bodyClientWidth = fixture.nativeElement.ownerDocument.body.clientWidth;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('handle should be on the center of slider', () => {
        const handle = fixture.debugElement.query(By.css('.example-1 .fd-slider__handle'));

        expect(handle.styles.left).toEqual('50%');
    });

    it('should emit value: "-1"', () => {
        const sliderWidth = fixture.debugElement.query(By.css('.example-1 .fd-slider__inner')).nativeElement.clientWidth;
        const handle = fixture.debugElement.query(By.css('.example-1 .fd-slider__handle'));

        const event = new MouseEvent('mousedown');
        handle.nativeElement.dispatchEvent(event);

        const mousemove = new MouseEvent('mousemove', { clientX: getPixelsByPercentage(sliderWidth, 10) });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        fixture.detectChanges();

        expect(component.value1).toEqual(-0.8);
    });

    it('should emit value "-1" if cursor outside left side of slider', () => {
        const handle = fixture.debugElement.query(By.css('.example-1 .fd-slider__handle'));

        const event = new MouseEvent('mousedown');
        handle.nativeElement.dispatchEvent(event);

        const mousemove = new MouseEvent('mousemove', { clientX: -1000 });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        fixture.detectChanges();

        expect(component.value1).toEqual(-1);
    });

    it('should emit value "1" if cursor outside right side of slider', () => {
        const handle = fixture.debugElement.query(By.css('.example-1 .fd-slider__handle'));

        const event = new MouseEvent('mousedown');
        handle.nativeElement.dispatchEvent(event);

        const mousemove = new MouseEvent('mousemove', { clientX: 1000 });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        fixture.detectChanges();

        expect(component.value1).toEqual(1);
    });

    it('should display 11 ticks marks and 11 Labels', () => {
        const ticksMarks = fixture.debugElement.queryAll(By.css('.example-1 .fd-slider__tick'));
        const labels = fixture.debugElement.queryAll(By.css('.example-1 .fd-slider__label'));

        expect(ticksMarks.length).toEqual(11);
        expect(labels.length).toEqual(11);
    });

    it('should display 11 ticks marks and 6 Labels', () => {
        const ticksMarks = fixture.debugElement.queryAll(By.css('.example-2 .fd-slider__tick'));
        const labels = fixture.debugElement.queryAll(By.css('.example-2 .fd-slider__label'));

        expect(ticksMarks.length).toEqual(11);
        expect(labels.length).toEqual(6);
    });

    it('should display custome values labels', () => {
        const labels = fixture.debugElement.queryAll(By.css('.example-3 .fd-slider__label'));

        expect(labels.length).toEqual(component.customValues.length);
        expect(labels[0].nativeElement.innerHTML).toEqual(component.customValues[0].label);
    });

    it('range slider should display 2 handles', async () => {
        const handles = fixture.debugElement.queryAll(By.css('.example-4 .fd-slider__handle'));

        await whenStable(fixture);

        expect(handles.length).toEqual(2);
    });

    it('range slider second handle should have the ability to be less than the first handle', async () => {
        const sliderWidth = fixture.debugElement.query(By.css('.example-4 .fd-slider__inner')).nativeElement.offsetWidth;
        const handles = fixture.debugElement.queryAll(By.css('.example-4 .fd-slider__handle'));

        const event = new MouseEvent('mousedown');
        handles[1].nativeElement.dispatchEvent(event);

        const mousemove = new MouseEvent('mousemove', { clientX: getPixelsByPercentage(sliderWidth, 10) });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        await whenStable(fixture);

        expect(component.value4).toEqual([10, 20]);
    });

    it('should contain is-disabled class', () => {
        const isDisabled = fixture.debugElement.query(By.css('.example-5.is-disabled'));

        expect(isDisabled).toBeTruthy();
    });

    it('should contain fd-slider__handle--lg class', () => {
        const isCozy = fixture.debugElement.query(By.css('.example-6 .fd-slider__handle--lg'));

        expect(isCozy).toBeTruthy();
    });

    function getPixelsByPercentage(sliderWidth: number, percentage: number): number {
        const bodyMargin = 20;
        const space = bodyClientWidth - sliderWidth - bodyMargin;

        return space + ((sliderWidth * percentage) / 100);
    }
});

export async function whenStable(fixture: ComponentFixture<TestSliderComponent>): Promise<void> {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
}
