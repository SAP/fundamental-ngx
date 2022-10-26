import { Component } from '@angular/core';

type CarType = { id: string; name: string };

@Component({
    selector: 'fd-select-custom-comparator-example',
    templateUrl: './select-custom-comparator-example.component.html'
})
export class SelectCustomComparatorExample {
    carTypes: CarType[] = [
        { id: '1', name: 'Hatchback' },
        { id: '2', name: 'Sedan' },
        { id: '3', name: 'Coupe' }
    ];
    selectedCarType: CarType = { id: '1', name: 'Hatchback' };

    get optionMatchedByValue(): string {
        const matchingIndex = this.carTypes.findIndex((carType) => this.comparator(carType, this.selectedCarType));
        if (matchingIndex < 0) {
            return 'No available option that matches the selected option by value';
        }
        return JSON.stringify(this.carTypes[matchingIndex], undefined, 2);
    }

    get optionMatchedByReference(): string {
        const matchingIndex = this.carTypes.findIndex((carType) => carType === this.selectedCarType);
        if (matchingIndex < 0) {
            return 'No available option that matches the selected option by reference';
        }
        return JSON.stringify(this.carTypes[matchingIndex], undefined, 2);
    }

    comparator: (obj1: CarType, obj2: CarType) => boolean = (obj1: CarType, obj2: CarType) =>
        obj1 && obj2 && obj1.id === obj2.id;

    setCarTypeByCopy(newValue: CarType): void {
        this.selectedCarType = { ...newValue };
    }
}
