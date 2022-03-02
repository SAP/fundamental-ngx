import { Directive, ElementRef, Self } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/fn/button';
import { SelectableItemToken } from '@fundamental-ngx/fn/cdk';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[customButton]',
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: CustomButtonDirective
        }
    ]
})
export class CustomButtonDirective implements SelectableItemToken<string> {
    clicked;

    constructor(@Self() private buttonComponent: ButtonComponent) {
        this.clicked = buttonComponent.clicked;
    }

    set value(val: string) {
        this.buttonComponent.value = val;
    }

    get value(): string {
        return this.buttonComponent.value;
    }

    elementRef(): ElementRef<HTMLElement> {
        return this.buttonComponent.elementRef();
    }

    getSelected(): boolean {
        return this.buttonComponent.getSelected();
    }

    setSelected(selected: boolean): void {
        this.buttonComponent.setSelected(selected);
    }
}
