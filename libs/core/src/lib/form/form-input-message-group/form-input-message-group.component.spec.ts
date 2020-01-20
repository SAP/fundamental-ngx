import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputMessageGroupComponent } from './form-input-message-group.component';
import { PopoverModule } from '../../popover/popover.module';
import { CommonModule } from '@angular/common';

describe('FormInputMessageGroupComponent', () => {
    let component: FormInputMessageGroupComponent;
    let fixture: ComponentFixture<FormInputMessageGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PopoverModule],
            declarations: [FormInputMessageGroupComponent]
        })
            .compileComponents();
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
