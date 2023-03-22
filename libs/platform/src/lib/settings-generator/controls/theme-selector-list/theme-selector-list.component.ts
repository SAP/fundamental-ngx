import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
    BaseDynamicFormGeneratorControl,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-theme-selector-list',
    templateUrl: './theme-selector-list.component.html',
    styleUrls: ['./theme-selector-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class ThemeSelectorListComponent extends BaseDynamicFormGeneratorControl implements OnInit {
    /** @hidden */
    currentTheme: string;

    /** @hidden */
    ngOnInit(): void {
        this.currentTheme = this.formItem.default;
    }

    /** @hidden */
    setTheme(value: string): void {
        const control = this.form.get([this.formGroupName, this.name]);
        this.currentTheme = value;
        control?.setValue(value);
    }
}

@Component({
    selector: 'fdp-theme-selector-list-icon',
    templateUrl: './icon.svg',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSelectorListIconComponent {
    /** @hidden */
    @Input()
    size = 40;
}
