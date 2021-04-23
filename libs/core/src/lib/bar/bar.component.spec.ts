import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarComponent } from './bar.component';

describe('BarComponent', () => {
    let component: BarComponent;
    let fixture: ComponentFixture<BarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
