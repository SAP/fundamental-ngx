import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormInputMessageGroupComponent } from './form-input-message-group.component';

describe('FormInputMessageGroupComponent', () => {
    let component: FormInputMessageGroupComponent;
    let fixture: ComponentFixture<FormInputMessageGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormInputMessageGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormInputMessageGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
