import { Component, signal } from '@angular/core';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { IconDesign } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/paddings.css';

// Import the icon used in this example
import '@ui5/webcomponents-icons/dist/da-2.js';

@Component({
    selector: 'ui5-icon-designs-example',
    templateUrl: './designs.html',
    standalone: true,
    imports: [Icon, Label, Select, Option]
})
export class IconDesignsExample {
    readonly demoIcons = signal([
        { name: 'da-2', design: IconDesign.Default, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.Contrast, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.Critical, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.Information, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.Negative, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.Neutral, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.NonInteractive, label: 'Diamond' },
        { name: 'da-2', design: IconDesign.Positive, label: 'Diamond' }
    ]);
}
