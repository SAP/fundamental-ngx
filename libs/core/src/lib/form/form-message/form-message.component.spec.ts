import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormMessageComponent } from './form-message.component';

describe('FormMessageComponent', () => {
    let component: FormMessageComponent;
    let fixture: ComponentFixture<FormMessageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormMessageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
