import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputGroupNumberComponent } from './input-group-number.component';

describe('InputGroupNumberComponent', () => {
    let component: InputGroupNumberComponent;
    let fixture: ComponentFixture<InputGroupNumberComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [InputGroupNumberComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get the input and increment/decrement properly', () => {
        component.inputText = 0;
        expect(component.getInput()).toBe(0);
        component.stepUpClicked();
        expect(component.getInput()).toBe(1);
        component.stepDownClicked();
        expect(component.getInput()).toBe(0);
    });
});
