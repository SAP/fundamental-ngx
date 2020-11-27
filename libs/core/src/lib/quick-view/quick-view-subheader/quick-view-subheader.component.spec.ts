import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewSubheaderComponent } from './quick-view-subheader.component';

describe('QuickViewSubheaderComponent', () => {
    let component: QuickViewSubheaderComponent;
    let fixture: ComponentFixture<QuickViewSubheaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewSubheaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewSubheaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
