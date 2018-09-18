import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputGroupSearchComponent } from './input-group-search.component';

describe('InputGroupSearchComponent', () => {
    let component: InputGroupSearchComponent;
    let fixture: ComponentFixture<InputGroupSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [InputGroupSearchComponent]
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

    it('should get the input', () => {
        component.inputText = 'input';
        expect(component.getInput()).toBe('input');
    });
});
