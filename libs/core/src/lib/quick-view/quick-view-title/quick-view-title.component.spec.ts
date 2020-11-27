import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewTitleComponent } from './quick-view-title.component';

describe('QuickViewTitleComponent', () => {
    let component: QuickViewTitleComponent;
    let fixture: ComponentFixture<QuickViewTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
