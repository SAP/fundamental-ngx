import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';

describe('ProductTileComponent', () => {
    let component: ProductTileComponent;
    let fixture: ComponentFixture<ProductTileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductTileComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component, '_setProperties').and.callThrough();
        spyOn(component, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('fd-product-tile');
    });

    it('should add the appropriate classes', () => {
        component.disabled = true;
        component.ngOnInit();
        expect(component._setProperties).toHaveBeenCalled();
        expect(component._addClassToElement).toHaveBeenCalledWith('is-disabled');
    });
});
