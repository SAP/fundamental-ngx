import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PanelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-panel');
    });

    it('should apply the appropriate classes', () => {
        component.span = 2;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-has-grid-column-span-2');
    });
});
