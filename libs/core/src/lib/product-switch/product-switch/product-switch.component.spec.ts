import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopoverModule } from '../../popover/popover.module';
import { ButtonModule } from '../../button/button.module';
import { DragAndDropModule } from '../../utils/drag-and-drop/drag-and-drop.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProductSwitchComponent } from './product-switch.component';

describe('ProductSwitchComponent', () => {
    let component: ProductSwitchComponent;
    let fixture: ComponentFixture<ProductSwitchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, ButtonModule, DragAndDropModule, DragDropModule],
            declarations: [ProductSwitchComponent]
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
