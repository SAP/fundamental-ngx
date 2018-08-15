import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGridComponent } from './panel-grid.component';

describe('PanelGridComponent', () => {
    let component: PanelGridComponent;
    let fixture: ComponentFixture<PanelGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelGridComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-panel-grid');
    });

    it('should apply the appropriate classes', () => {
        component.col = 2;
        component.nogap = true;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-panel-grid--2col');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-panel-grid--nogap');
    });
});
