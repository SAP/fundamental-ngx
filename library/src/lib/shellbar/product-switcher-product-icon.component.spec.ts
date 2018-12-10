import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwitcherProductIconComponent } from './product-switcher-product-icon.component';

describe('ProductSwitcherProductIconComponent', () => {
    let component: ProductSwitcherProductIconComponent;
    let fixture: ComponentFixture<ProductSwitcherProductIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductSwitcherProductIconComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitcherProductIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
