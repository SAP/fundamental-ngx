import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupComponent } from './form-group.component';
import { By } from '@angular/platform-browser';

fdescribe('FormGroupComponent', () => {
    let component: FormGroupComponent;
    let fixture: ComponentFixture<FormGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        fixture.debugElement.query(By.css('.fd-form__group'))
        expect(component.fdFormGroupClass).toBe(true);
    });
});
