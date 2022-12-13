import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormInputMessageGroupComponent } from './form-input-message-group.component';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '@fundamental-ngx/core/popover';

describe('FormInputMessageGroupComponent', () => {
    let component: FormInputMessageGroupComponent;
    let fixture: ComponentFixture<FormInputMessageGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PopoverModule],
            declarations: [FormInputMessageGroupComponent]
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
