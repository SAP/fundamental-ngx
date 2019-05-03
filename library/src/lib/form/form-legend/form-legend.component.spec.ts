import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLegendDirective } from './form-legend.directive';

describe('FormLegendDirective', () => {
    let component: FormLegendDirective;
    let fixture: ComponentFixture<FormLegendDirective>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormLegendDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLegendDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
