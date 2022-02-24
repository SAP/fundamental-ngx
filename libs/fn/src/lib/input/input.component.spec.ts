import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { InputState } from './input-base';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should appropriate states', () => {
        const states: InputState[] = ['positive', 'negative', 'critical', 'info'];

        states.forEach((state) => {
            component.state = state;
            fixture.detectChanges();

            expect(fixture.nativeElement.classList).toContain(`fn-input--${state}`);
        });
    });
});
