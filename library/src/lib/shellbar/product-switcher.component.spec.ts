import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwitcherComponent } from './product-switcher.component';

describe('ProductSwitcherComponent', () => {
    let component: ProductSwitcherComponent;
    let fixture: ComponentFixture<ProductSwitcherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductSwitcherComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
