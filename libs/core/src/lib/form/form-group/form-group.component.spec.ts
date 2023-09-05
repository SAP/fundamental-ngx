import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
    let component: FormGroupComponent;
    let fixture: ComponentFixture<FormGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormGroupComponent]
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
});
