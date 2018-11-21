import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLegendComponent } from './form-legend.component';

describe('FormLegendComponent', () => {
    let component: FormLegendComponent;
    let fixture: ComponentFixture<FormLegendComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormLegendComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLegendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
