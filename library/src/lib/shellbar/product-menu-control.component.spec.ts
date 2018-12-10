import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuControlComponent } from './product-menu-control.component';

describe('ProductMenuControlComponent', () => {
    let component: ProductMenuControlComponent;
    let fixture: ComponentFixture<ProductMenuControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductMenuControlComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductMenuControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
