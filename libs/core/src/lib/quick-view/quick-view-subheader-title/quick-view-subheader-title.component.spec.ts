import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewSubheaderTitleComponent } from './quick-view-subheader-title.component';

describe('QuickViewSubheaderTitleComponent', () => {
    let component: QuickViewSubheaderTitleComponent;
    let fixture: ComponentFixture<QuickViewSubheaderTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewSubheaderTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewSubheaderTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
