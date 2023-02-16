import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-multi-input-addon-clicked-example',
    templateUrl: './multi-input-addon-clicked-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiInputAddonClickedExampleComponent {
    addOnClicked(event?: Event): void {
        console.log(event);
        window.alert('Add On Button Clicked!');
    }
}
