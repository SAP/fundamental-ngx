import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentalCheckboxComponent } from './checkbox.component';

describe('ExperimentalCheckboxComponent', () => {
    let component: ExperimentalCheckboxComponent;
    let fixture: ComponentFixture<ExperimentalCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExperimentalCheckboxComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExperimentalCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
