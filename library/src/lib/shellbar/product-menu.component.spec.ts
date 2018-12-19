import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuComponent } from './product-menu.component';

describe('ProductMenuComponent', () => {
    let component: ProductMenuComponent;
    let fixture: ComponentFixture<ProductMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
