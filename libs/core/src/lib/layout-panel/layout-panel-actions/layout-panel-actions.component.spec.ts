import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelActionsComponent } from './layout-panel-actions.component';

describe('LayoutPanelActionsComponent', () => {
    let component: LayoutPanelActionsComponent;
    let fixture: ComponentFixture<LayoutPanelActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelActionsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have class assigned', () => {
        expect(fixture.nativeElement.className).toBe('fd-layout-panel__actions');
    });
});
