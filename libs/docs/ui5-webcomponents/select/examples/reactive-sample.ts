import { NgStyle } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

interface Product {
    id: string;
    name: string;
    price: number;
}

@Component({
    selector: 'ui5-doc-select-reactive-sample',
    templateUrl: './reactive-sample.html',
    standalone: true,
    imports: [ReactiveFormsModule, Select, Option, Button, Input, Label, NgStyle]
})
export class ReactiveSample {
    private fb = new FormBuilder();

    orderForm: FormGroup = this.fb.group({
        product: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]]
    });

    products = signal<Product[]>([
        { id: 'laptop', name: 'Laptop', price: 999 },
        { id: 'mouse', name: 'Wireless Mouse', price: 29 },
        { id: 'keyboard', name: 'Mechanical Keyboard', price: 89 },
        { id: 'monitor', name: '27" Monitor', price: 349 },
        { id: 'headphones', name: 'Noise-Canceling Headphones', price: 199 }
    ]);

    // Convert form value changes to signals for reactive computed properties
    productValue = toSignal(this.orderForm.controls['product'].valueChanges, { initialValue: '' });
    quantityValue = toSignal(this.orderForm.controls['quantity'].valueChanges, { initialValue: 1 });

    selectedProductInfo = computed(() => {
        const productId = this.productValue();
        return this.products().find((p) => p.id === productId);
    });

    totalPrice = computed(() => {
        const product = this.selectedProductInfo();
        const qty = this.quantityValue() || 0;
        return product ? product.price * qty : 0;
    });

    isFormValid = toSignal(this.orderForm.statusChanges, { initialValue: this.orderForm.status });

    resetForm(): void {
        this.orderForm.reset({ product: '', quantity: 1 });
    }

    submitOrder(): void {
        if (this.orderForm.valid) {
            alert(
                `Order submitted:\n` +
                    `Product: ${this.selectedProductInfo()?.name}\n` +
                    `Quantity: ${this.quantityValue()}\n` +
                    `Total: $${this.totalPrice()}`
            );
        }
    }
}
