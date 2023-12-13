import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, forwardRef } from '@angular/core';
import { ClickedDirective } from '@fundamental-ngx/cdk/utils';
import { ListModule } from '@fundamental-ngx/core/list';
import {
    BaseDynamicFormGeneratorControl,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-theme-selector-list',
    templateUrl: './theme-selector-list.component.html',
    styleUrl: './theme-selector-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    standalone: true,
    imports: [ListModule, ClickedDirective, forwardRef(() => ThemeSelectorListIconComponent), NgTemplateOutlet]
})
export class ThemeSelectorListComponent extends BaseDynamicFormGeneratorControl implements OnInit {
    /** @ignore */
    currentTheme: string;

    /** @ignore */
    ngOnInit(): void {
        this.currentTheme = this.formItem.default;
    }

    /** @ignore */
    setTheme(value: string): void {
        const control = this.form.get([this.formGroupName, this.name]);
        this.currentTheme = value;
        control?.setValue(value);
    }
}

@Component({
    selector: 'fdp-theme-selector-list-icon',
    templateUrl: './icon.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThemeSelectorListIconComponent {
    /** @ignore */
    @Input()
    size = 40;
}
