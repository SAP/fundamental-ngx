import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductMenuComponent } from './product-menu.component';
import { PopoverModule } from '../../popover/popover.module';
import { MenuModule } from '../../menu/menu.module';
import { IconModule } from '../../icon/icon.module';

describe('ProductMenuComponent', () => {
    let component: ProductMenuComponent;
    let fixture: ComponentFixture<ProductMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProductMenuComponent],
            imports: [PopoverModule, MenuModule, IconModule]
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
