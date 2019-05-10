import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileContentComponent } from './product-tile-content.component';

describe('ProductTileContentComponent', () => {
    let component: ProductTileContentComponent;
    let fixture: ComponentFixture<ProductTileContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductTileContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTileContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
