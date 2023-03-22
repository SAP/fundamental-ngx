import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    BaseDynamicFormFieldItem,
    BaseDynamicFormGeneratorControl,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider,
    DynamicFormItemChoice,
    DynamicFormValue,
    FormGeneratorService
} from '@fundamental-ngx/platform/form';
import { SettingsGeneratorComponent, SettingsModel } from '@fundamental-ngx/platform/settings-generator';
import { take } from 'rxjs/operators';

@Component({
    selector: 'fdp-settings-generator-slider',
    template: `
        <ng-container [formGroup]="form">
            <ng-container [formGroupName]="formGroupName">
                <fdp-slider
                    [customValues]="formItem.choices || []"
                    [showTicks]="!!formItem.guiOptions?.showTicks"
                    [showTicksLabels]="!!formItem.guiOptions?.showTicksLabels"
                    [name]="name"
                    [formControlName]="name"
                ></fdp-slider>
            </ng-container>
        </ng-container>
    `,
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider]
})
export class PlatformFormGeneratorCustomSliderElementComponent extends BaseDynamicFormGeneratorControl<SliderDynamicFormControl> {
    constructor() {
        super();
    }
}

export interface SliderDynamicFormControl extends BaseDynamicFormFieldItem<{ value: number; label: string }> {
    type: 'slider';
    choices: DynamicFormItemChoice<number> | ((formValue?: DynamicFormValue) => DynamicFormItemChoice);
    guiOptions?: BaseDynamicFormFieldItem['guiOptions'] & {
        showTicks: boolean;
        showTicksLabels: boolean;
    };
}

@Component({
    selector: 'fdp-settings-generator-custom-control-example',
    templateUrl: './settings-generator-custom-control-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsGeneratorCustomControlExampleComponent {
    // By specifying first generic type of SettingsModel we are notifying typescipt's suggestions engine to include SliderDynamicFormControl type into available `items` options.
    schema: SettingsModel<SliderDynamicFormControl>;

    @ViewChild(SettingsGeneratorComponent)
    settingsGenerator: SettingsGeneratorComponent;

    private readonly _cdr = inject(ChangeDetectorRef);

    private readonly _formGeneratorService = inject(FormGeneratorService);

    ngOnInit(): void {
        this._formGeneratorService.addComponent(PlatformFormGeneratorCustomSliderElementComponent, ['slider']);
        this.schema = {
            appearance: 'sidebar',
            sidebarWidth: '30%',
            items: [
                {
                    title: 'First list item',
                    id: 'sliderExample',
                    thumbnail: {
                        icon: {
                            glyph: 'equalizer',
                            font: 'BusinessSuiteInAppSymbols'
                        }
                    },
                    items: [
                        {
                            type: 'slider',
                            default: { value: 30, label: 'Thirty' },
                            message: 'Slider custom component',
                            name: 'slider',
                            choices: [
                                { value: 10, label: 'Ten' },
                                { value: 20, label: 'Twenty' },
                                { value: 30, label: 'Thirty' },
                                { value: 40, label: 'Forty' }
                            ],
                            guiOptions: {
                                column: 1,
                                showTicks: true,
                                showTicksLabels: true
                            }
                        }
                    ]
                }
            ]
        };

        this._cdr.detectChanges();
    }

    submit(): void {
        this.settingsGenerator
            .submit()
            .pipe(take(1))
            .subscribe((result: any) => {
                console.log(result);
            });
    }
}
