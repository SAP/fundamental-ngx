import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVariantItemComponent } from './manage-variant-item.component';

describe('ManageVariantItemComponent', () => {
    let component: ManageVariantItemComponent;
    let fixture: ComponentFixture<ManageVariantItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ManageVariantItemComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ManageVariantItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
