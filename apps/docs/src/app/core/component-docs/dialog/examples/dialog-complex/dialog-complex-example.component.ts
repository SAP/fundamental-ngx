import { Component, TemplateRef } from '@angular/core';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';

interface Fruit {
    id: number;
    name: string;
    price: number;
}

@Component({
    selector: 'fd-dialog-complex-example',
    templateUrl: './dialog-complex-example.component.html'
})
export class DialogComplexExampleComponent {
    fruitCollection: Fruit[] = [
        { id: 1, name: 'Pineapple', price: Infinity },
        { id: 2, name: 'Passion Fruit', price: 10.0 },
        { id: 3, name: 'Papaya', price: 8.99 },
        { id: 4, name: 'Kiwifruit', price: 3.0 },
        { id: 5, name: 'Mango', price: 15.0 },
        { id: 6, name: 'Pomegranate', price: 12.5 },
        { id: 7, name: 'Guava', price: 10.15 },
        { id: 8, name: 'Durian', price: 15.25 },
        { id: 9, name: 'Jackfruit', price: 10.0 },
        { id: 10, name: 'Dragon Fruit', price: 9.0 },
        { id: 11, name: 'Cherimoya', price: 7.45 },
        { id: 12, name: 'Kiwano', price: 4.5 },
        { id: 13, name: 'Korean Melon', price: 6.5 },
        { id: 14, name: 'Feijoa', price: 2.0 },
        { id: 15, name: 'Tamarillo ', price: 8.75 },
        { id: 16, name: 'Loquat', price: 0.99 }
    ];

    selectedFruits: Fruit[] = [];

    dialogRef: DialogRef;

    searchedPhrase = '';

    constructor(public _dialogService: DialogService) {}

    openDialog(template: TemplateRef<any>): void {
        this.dialogRef = this._dialogService.open(template, {
            width: '350px',
            height: '370px',
            draggable: true,
            resizable: true,
            verticalPadding: false,
            ariaLabelledBy: 'fd-dialog-header-3'
        });
        this.dialogRef.loading(true);
        setTimeout(() => this.dialogRef.loading(false), 2000);
    }

    get totalPrice(): number {
        const sum = this.selectedFruits.reduce((total, fruit) => total + fruit.price, 0);
        return Math.round(sum * 100) / 100;
    }

    filterFruits(fruits: Fruit[], searchedPhrase: string): Fruit[] {
        return this.fruitCollection.filter((fruit) => fruit.name.toLowerCase().includes(searchedPhrase.toLowerCase()));
    }

    isSelected(id: number): boolean {
        return this.selectedFruits.some((fruit) => fruit.id === id);
    }

    selectFruit(fruit: Fruit): void {
        const fruitIndex = this.selectedFruits.indexOf(fruit);

        if (fruitIndex !== -1) {
            this.selectedFruits.splice(fruitIndex, 1);
        } else {
            this.selectedFruits.push(fruit);
        }
    }

    clear(): void {
        this.searchedPhrase = '';
        this.selectedFruits = [];
    }

    checkout(): void {
        this.dialogRef.close();
    }
}
