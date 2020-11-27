import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewGroupTitleComponent } from './quick-view-group-title.component';

describe('QuickViewGroupTitleComponent', () => {
    let component: QuickViewGroupTitleComponent;
    let fixture: ComponentFixture<QuickViewGroupTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewGroupTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewGroupTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
