import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputComponent } from './multi-input.component';

describe('MultiInputComponent', () => {
    let component: MultiInputComponent;
    let fixture: ComponentFixture<MultiInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
