import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelComponent } from './layout-panel.component';

describe('LayoutPanelComponent', () => {
    let component: LayoutPanelComponent;
    let fixture: ComponentFixture<LayoutPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
    });
});
