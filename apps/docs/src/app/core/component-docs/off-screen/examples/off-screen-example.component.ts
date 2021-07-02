import { Component } from '@angular/core';

@Component({
    selector: 'fd-off-screen-example',
    template: `<div fdOffScreen>Current count value is: {{ count }}</div>
        <br />
        <button fd-button label="Increament count" (click)="onIncrease()"></button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button fd-button label="Decreament count" (click)="onDecrease()"></button> `
})
export class OffScreenExampleComponent {
    count = 0;

    onIncrease(): void {
        this.count = this.count + 1;
    }

    onDecrease(): void {
        this.count = this.count - 1;
    }
}
