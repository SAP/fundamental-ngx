import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewGroupItemComponent } from './quick-view-group-item.component';

describe('QuickViewGroupItemComponent', () => {
    let component: QuickViewGroupItemComponent;
    let fixture: ComponentFixture<QuickViewGroupItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewGroupItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewGroupItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
