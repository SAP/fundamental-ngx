import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMultiComboboxComponent } from './mobile-multi-combobox.component';

describe('MobileMultiComboboxComponent', () => {
    let component: MobileMultiComboboxComponent;
    let fixture: ComponentFixture<MobileMultiComboboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MobileMultiComboboxComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MobileMultiComboboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
