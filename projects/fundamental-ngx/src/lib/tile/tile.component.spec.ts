import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileComponent } from './tile.component';

describe('TileComponent', () => {
    let component: TileComponent;
    let fixture: ComponentFixture<TileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TileComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-tile');
    });

    it('should add the appropriate classes', () => {
        component.disabled = true;
        component.rowSpan = 1;
        component.columnSpan = 2;
        component.colorAccent = 3;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('is-disabled');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-has-grid-row-span-1');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-has-grid-column-span-2');
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-has-background-color-accent-3');
    });
});
