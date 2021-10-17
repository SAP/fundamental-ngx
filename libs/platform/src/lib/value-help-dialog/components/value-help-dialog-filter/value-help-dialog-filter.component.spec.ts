import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhdFilterComponent } from './value-help-dialog-filter.component';

describe('VhdFilterComponent', () => {
    let component: VhdFilterComponent;
    let fixture: ComponentFixture<VhdFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VhdFilterComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VhdFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
