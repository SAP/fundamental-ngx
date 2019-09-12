import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGridComponent } from './layout-grid.component';

describe('PanelComponent', () => {
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

    it('should apply the appropriate classes', () => {
        component.columnSpan = 2;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-has-grid-column-span-2');
    });
});
