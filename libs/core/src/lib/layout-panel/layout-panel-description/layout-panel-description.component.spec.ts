import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutPanelDescriptionComponent } from './layout-panel-description.component';

describe('LayoutPanelDescriptionComponent', () => {
    let component: LayoutPanelDescriptionComponent;
    let fixture: ComponentFixture<LayoutPanelDescriptionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelDescriptionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
