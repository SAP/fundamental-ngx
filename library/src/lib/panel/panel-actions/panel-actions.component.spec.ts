import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelActionsComponent } from './panel-actions.component';

describe('PanelActionsComponent', () => {
    let component: PanelActionsComponent;
    let fixture: ComponentFixture<PanelActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelActionsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have class assigned', () => {
        expect(fixture.nativeElement.className).toBe('fd-panel__actions');
    });
});
