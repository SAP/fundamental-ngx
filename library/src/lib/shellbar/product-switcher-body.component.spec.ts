import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwitcherBodyComponent } from './product-switcher-body.component';

describe('ProductSwitcherBodyComponent', () => {
    let component: ProductSwitcherBodyComponent;
    let fixture: ComponentFixture<ProductSwitcherBodyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductSwitcherBodyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitcherBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
