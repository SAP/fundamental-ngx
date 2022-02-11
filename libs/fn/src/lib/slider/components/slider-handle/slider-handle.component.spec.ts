import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHandleComponent } from './slider-handle.component';

const ariaValues = {
    ariaLabel: {
        attr: 'aria-label',
        value: 'slider minimum value is 0, maximum value is 100'
    },
    ariaLabelledBy: {
        attr: 'aria-labelledby',
        value: 'aria labelled by'
    },
    ariaValueMax: {
        attr: 'aria-valuemax',
        value: 'value is 100'
    },
    ariaValueMin: {
        attr: 'aria-valuemin',
        value: 'value is 0'
    },
    ariaValueNow: {
        attr: 'aria-valuenow',
        value: '50'
    },
    ariaValueText: {
        attr: 'aria-valuetext',
        value: 'current value is 50'
    }
};

describe('SliderHandleComponent', () => {
    let component: SliderHandleComponent;
    let fixture: ComponentFixture<SliderHandleComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SliderHandleComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderHandleComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply necessary attributes', () => {
        const roleAttr = element.getAttribute('role');
        const tabIndexAttr = element.getAttribute('tabindex');

        expect(roleAttr).toEqual('slider');
        expect(tabIndexAttr).toEqual('0');

        for (const [key, value] of Object.entries(ariaValues)) {
            component[key] = value.value;
        }

        fixture.detectChanges();

        for (const value of Object.values(ariaValues)) {
            const attr = element.getAttribute(value.attr);
            expect(attr).toEqual(value.value);
        }
    });
});
