import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuickViewGroupItemContentComponent } from './quick-view-group-item-content.component';

describe('QuickViewGroupItemContentComponent', () => {
    let component: QuickViewGroupItemContentComponent;
    let fixture: ComponentFixture<QuickViewGroupItemContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewGroupItemContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewGroupItemContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
