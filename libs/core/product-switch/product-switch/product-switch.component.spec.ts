import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ProductSwitchModule } from '../product-switch.module';
import { ProductSwitchComponent } from './product-switch.component';

describe('ProductSwitchComponent', () => {
    let component: ProductSwitchComponent;
    let fixture: ComponentFixture<ProductSwitchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, ButtonComponent, DragAndDropModule, DragDropModule, ProductSwitchModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
