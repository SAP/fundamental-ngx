import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwitcherProductTitleComponent } from './product-switcher-product-title.component';

describe('ProductSwitcherProductTitleComponent', () => {
    let component: ProductSwitcherProductTitleComponent;
    let fixture: ComponentFixture<ProductSwitcherProductTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductSwitcherProductTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitcherProductTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
