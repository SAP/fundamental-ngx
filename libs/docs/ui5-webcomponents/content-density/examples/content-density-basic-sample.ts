import { Component, computed, inject, Signal } from '@angular/core';
import {
    ContentDensityDirective,
    ContentDensityMode,
    GlobalContentDensityService
} from '@fundamental-ngx/core/content-density';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Switch } from '@fundamental-ngx/ui5-webcomponents/switch';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';

@Component({
    selector: 'ui5-content-density-basic-sample',
    templateUrl: './content-density-basic-sample.html',
    standalone: true,
    imports: [
        Button,
        CheckBox,
        ContentDensityDirective,
        DatePicker,
        Input,
        Label,
        Option,
        SegmentedButton,
        SegmentedButtonItem,
        Select,
        Switch,
        Table,
        TableCell,
        TableHeaderCell,
        TableHeaderRow,
        TableRow
    ]
})
export class ContentDensityBasicSampleComponent {
    /** Expose ContentDensityMode enum for template */
    protected readonly ContentDensityMode = ContentDensityMode;

    /** Current content density as a signal */
    protected readonly currentDensity: Signal<ContentDensityMode>;

    /** Computed signal for display label */
    protected readonly densityLabel: Signal<string>;

    private readonly _contentDensityService = inject(GlobalContentDensityService);

    constructor() {
        this.currentDensity = this._contentDensityService.currentDensitySignal;
        this.densityLabel = computed(() => {
            const density = this.currentDensity();
            return density ? density.charAt(0).toUpperCase() + density.slice(1) : '';
        });
    }

    protected selectDensity(density: ContentDensityMode): void {
        this._contentDensityService.updateContentDensity(density);
    }
}
