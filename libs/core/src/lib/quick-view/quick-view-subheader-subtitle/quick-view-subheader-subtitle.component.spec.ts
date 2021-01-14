import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewSubheaderSubtitleComponent } from './quick-view-subheader-subtitle.component';

describe('QuickViewSubheaderSubtitleComponent', () => {
    let component: QuickViewSubheaderSubtitleComponent;
    let fixture: ComponentFixture<QuickViewSubheaderSubtitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickViewSubheaderSubtitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickViewSubheaderSubtitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
