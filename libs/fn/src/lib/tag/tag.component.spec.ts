import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentalTagComponent } from './tag.component';

describe('ExperimentalTagComponent', () => {
    let component: ExperimentalTagComponent;
    let fixture: ComponentFixture<ExperimentalTagComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExperimentalTagComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExperimentalTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
