import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGridComponent } from './layout-grid.component';

describe('LayoutGridComponent', () => {
    let component: LayoutGridComponent;
    let fixture: ComponentFixture<LayoutGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutGridComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutGridComponent);
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

    it('should apply the appropriate classes gap size', () => {
        component.gapSize = 2;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-layout-grid--gap-2');
    });

    it('should apply the appropriate no gap', () => {
        component.nogap = true;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-layout-grid--no-gap');
    });

    it('should apply the appropriate classes', () => {
        component.col = 2;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-layout-grid--col-2');
    });
});
