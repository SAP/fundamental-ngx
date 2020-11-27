import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewGroupItemLabelComponent } from './quick-view-group-item-label.component';

describe('QuickViewGroupItemLabelComponent', () => {
    let component: QuickViewGroupItemLabelComponent;
    let fixture: ComponentFixture<QuickViewGroupItemLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewGroupItemLabelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewGroupItemLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
