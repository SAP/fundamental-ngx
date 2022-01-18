import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperimentalButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ButtonComponent', () => {
    let component: ExperimentalButtonComponent;
    let fixture: ComponentFixture<ExperimentalButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FormsModule],
                declarations: [ExperimentalButtonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ExperimentalButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
