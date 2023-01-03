import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusableItemComponent } from './focusable-item.component';

describe('FocusableItemComponent', () => {
    let component: FocusableItemComponent;
    let fixture: ComponentFixture<FocusableItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FocusableItemComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FocusableItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
