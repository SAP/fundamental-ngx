import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputGroupSearchComponent } from './input-group-search.component';
import { ButtonModule } from '../button/button.module';
import { InputGroupAddOnDirective, InputGroupInputDirective } from '@fundamental-ngx/core';

describe('InputGroupSearchComponent', () => {
    let component: InputGroupSearchComponent;
    let fixture: ComponentFixture<InputGroupSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ButtonModule],
            declarations: [InputGroupSearchComponent, InputGroupInputDirective, InputGroupAddOnDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
