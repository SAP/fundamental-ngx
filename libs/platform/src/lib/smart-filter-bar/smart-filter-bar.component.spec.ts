import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFilterBarComponent } from './smart-filter-bar.component';

describe('SmartFilterBarComponent', () => {
    let component: SmartFilterBarComponent;
    let fixture: ComponentFixture<SmartFilterBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SmartFilterBarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SmartFilterBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
