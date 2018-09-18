import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileMediaComponent } from './product-tile-media.component';

describe('ProductTileMediaComponent', () => {
    let component: ProductTileMediaComponent;
    let fixture: ComponentFixture<ProductTileMediaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductTileMediaComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTileMediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
