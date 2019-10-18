import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuComponent } from './product-menu.component';
import { PopoverModule } from '../../popover/popover.module';
import { MenuModule } from '../../menu/menu.module';
import { IdentifierModule } from '../../identifier/identifier.module';

describe('ProductMenuComponent', () => {
    let component: ProductMenuComponent;
    let fixture: ComponentFixture<ProductMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductMenuComponent],
            imports: [PopoverModule, MenuModule, IdentifierModule]
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
