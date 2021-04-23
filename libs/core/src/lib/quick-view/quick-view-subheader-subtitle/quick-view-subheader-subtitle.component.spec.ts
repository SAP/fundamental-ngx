import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuickViewSubheaderSubtitleComponent } from './quick-view-subheader-subtitle.component';

describe('QuickViewSubheaderSubtitleComponent', () => {
    let component: QuickViewSubheaderSubtitleComponent;
    let fixture: ComponentFixture<QuickViewSubheaderSubtitleComponent>;

    beforeEach(waitForAsync(() => {
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
