import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SliderComponent, SliderModule } from '@fundamental-ngx/core/slider';
import { whenStable } from '@fundamental-ngx/core/tests';
import { ContentDensityMode, mockedLocalContentDensityDirective } from '@fundamental-ngx/core/content-density';

const { contentDensityDirectiveProvider, setContentDensity } = mockedLocalContentDensityDirective(
    ContentDensityMode.COMPACT
);

@Component({
    template: `
        <fd-slider
            class="example-1"
            [(ngModel)]="value1"
            [min]="-1"
            [max]="1"
            [step]="0.2"
            [showTicks]="true"
            [showTicksLabels]="true"
            tooltipMode="readonly"
        ></fd-slider>

        <fd-slider
            class="example-2"
            [(ngModel)]="value2"
            [min]="-1"
            [max]="1"
            [step]="0.2"
            [showTicks]="true"
            [showTicksLabels]="true"
            [tickmarksBetweenLabels]="2"
            tooltipMode="editable"
        ></fd-slider>

        <fd-slider
            class="example-3"
            [(ngModel)]="value3"
            [showTicks]="true"
            [showTicksLabels]="true"
            [customValues]="customValues"
        ></fd-slider>

        <fd-slider class="example-4" [(ngModel)]="value4" mode="range"></fd-slider>

        <fd-slider class="example-5" [(ngModel)]="value5" [disabled]="true"></fd-slider>

        <fd-slider class="example-6" [(ngModel)]="value6" fdCozy></fd-slider>
    `
})
class TestSliderComponent {
    @ViewChildren(SliderComponent)
    sliders: QueryList<SliderComponent>;

    customValues = [
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

    value1 = 0;
    value2 = 0;
    value3 = this.customValues[4];
    value4 = [20, 70];
    value5 = 50;
    value6 = 50;
}

/** TODO: #6317 */
xdescribe('SliderComponent', () => {
    let component: TestSliderComponent;
    let fixture: ComponentFixture<TestSliderComponent>;
    let sliders: SliderComponent[];
    let bodyClientWidth = 0;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestSliderComponent],
            imports: [SliderModule, FormsModule],
            providers: [contentDensityDirectiveProvider]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestSliderComponent);
        component = fixture.debugElement.componentInstance;

        await whenStable(fixture);

        sliders = component.sliders.toArray();
        bodyClientWidth = fixture.nativeElement.ownerDocument.body.clientWidth;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should consume content density change', () => {
        setContentDensity(ContentDensityMode.COZY);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.fd-slider--lg').length).toBe(sliders.length);
        setContentDensity(ContentDensityMode.COMPACT);
        expect(fixture.nativeElement.querySelectorAll('.fd-slider--lg').length).toBe(0);
    });

    it('handle should be on the center of slider', () => {
        const handle = fixture.debugElement.query(By.css('.example-1 .fd-slider__handle'));

        expect(handle.nativeElement.style.left).toEqual('50%');
    });

    it('should emit value: "-0.8"', () => {
        const slider = sliders[0];
        const event = new MouseEvent('mousedown');

        slider.onHandleClick(event);

        const mousemove = new MouseEvent('mousemove', { clientX: getPixelsByPercentage(bodyClientWidth, 10) });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        expect(component.value1).toEqual(-0.8);
    });

    it('should emit value "-1" if cursor outside left side of slider', () => {
        const slider = sliders[0];
        const event = new MouseEvent('mousedown');

        slider.onHandleClick(event);

        const mousemove = new MouseEvent('mousemove', { clientX: -50 });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        expect(component.value1).toEqual(-1);
    });

    it('should emit value "1" if cursor outside right side of slider', () => {
        const slider = sliders[0];
        const event = new MouseEvent('mousedown');

        slider.onHandleClick(event);

        const mousemove = new MouseEvent('mousemove', { clientX: 1000 });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

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

    it('should display custom values labels', () => {
        const labels = fixture.debugElement.queryAll(By.css('.example-3 .fd-slider__label'));

        expect(labels.length).toEqual(component.customValues.length);
        expect(labels[0].nativeElement.innerHTML).toEqual(component.customValues[0].label);
    });

    it('range slider should display 2 handles', async () => {
        const handles = fixture.debugElement.queryAll(By.css('.example-4 .fd-slider__handle'));
        const slider = sliders[3];

        expect(slider._isRange).toEqual(true);
        expect(handles.length).toEqual(2);
        expect(slider.value[0]).toEqual(component.value4[0]);
        expect(slider.value[1]).toEqual(component.value4[1]);
    });

    it('range slider second handle should have the ability to be less than the first handle', () => {
        const slider = sliders[3];
        const event = { target: slider.rangeHandle2.nativeElement } as any;
        const valueOfFirstHandleBeforeMoving = slider.value[0];

        slider.onHandleClick(event);

        const mousemove = new MouseEvent('mousemove', { clientX: getPixelsByPercentage(bodyClientWidth, 11) });
        fixture.nativeElement.ownerDocument.dispatchEvent(mousemove);

        expect(slider.value[1]).toEqual(valueOfFirstHandleBeforeMoving);
    });

    it('should contain is-disabled class', () => {
        const isDisabled = fixture.debugElement.query(By.css('.example-5.is-disabled'));

        expect(isDisabled).toBeTruthy();
    });

    it('should contain fd-slider__handle--lg class', () => {
        const isCozy = fixture.debugElement.query(By.css('.example-6 .fd-slider__handle--lg'));

        expect(isCozy).toBeTruthy();
    });
});

function getPixelsByPercentage(width: number, percentage: number): number {
    return (width * percentage) / 100;
}
