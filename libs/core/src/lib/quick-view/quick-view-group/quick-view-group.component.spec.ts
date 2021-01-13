import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewGroupComponent } from './quick-view-group.component';

describe('QuickViewGroupComponent', () => {
    let component: QuickViewGroupComponent;
    let fixture: ComponentFixture<QuickViewGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
