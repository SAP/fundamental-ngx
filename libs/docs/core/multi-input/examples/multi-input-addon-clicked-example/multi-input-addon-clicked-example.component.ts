import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-addon-clicked-example',
    templateUrl: './multi-input-addon-clicked-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MultiInputModule]
})
export class MultiInputAddonClickedExampleComponent {
    addOnClicked(event?: Event): void {
        console.log(event);
        window.alert('Add On Button Clicked!');
    }
}
