import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLabelDirective } from './form-label.directive';

describe('FormLabelDirective', () => {
    let component: FormLabelDirective;
    let fixture: ComponentFixture<FormLabelDirective>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormLabelDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormLabelDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
