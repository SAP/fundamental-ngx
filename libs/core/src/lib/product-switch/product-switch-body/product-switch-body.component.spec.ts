import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSwitchBodyComponent } from './product-switch-body.component';
import { ButtonModule, PopoverModule } from '@fundamental-ngx/core';
import { DragAndDropModule } from '../../utils/drag-and-drop/drag-and-drop.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('ProductSwitchBodyComponent', () => {
    let component: ProductSwitchBodyComponent;
    let fixture: ComponentFixture<ProductSwitchBodyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, ButtonModule, DragAndDropModule, DragDropModule],
            declarations: [ProductSwitchBodyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitchBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
