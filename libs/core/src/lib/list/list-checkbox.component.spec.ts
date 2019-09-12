import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckboxComponent } from './list-checkbox.component';
import { FormsModule } from '@angular/forms';
import { FormModule } from '@fundamental-ngx/core';

describe('ListCheckboxComponent', () => {
    let component: ListCheckboxComponent;
    let fixture: ComponentFixture<ListCheckboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListCheckboxComponent],
            imports: [FormsModule, FormModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
