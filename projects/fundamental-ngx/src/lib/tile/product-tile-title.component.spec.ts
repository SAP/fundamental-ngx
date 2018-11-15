import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileTitleComponent } from './product-tile-title.component';

describe('ProductTileTitleComponent', () => {
    let component: ProductTileTitleComponent;
    let fixture: ComponentFixture<ProductTileTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductTileTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTileTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
