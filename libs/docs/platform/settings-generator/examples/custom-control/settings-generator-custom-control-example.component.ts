import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import {
    BaseDynamicFormFieldItem,
    BaseDynamicFormGeneratorControl,
    dynamicFormFieldProvider,
    dynamicFormGroupChildProvider,
    DynamicFormItemChoice,
    DynamicFormValue,
    FormGeneratorService
} from '@fundamental-ngx/platform/form';
import {
    SettingsGeneratorComponent,
    SettingsGeneratorModule,
    SettingsModel
} from '@fundamental-ngx/platform/settings-generator';
import { SliderComponent } from '@fundamental-ngx/platform/slider';
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
    viewProviders: [dynamicFormFieldProvider, dynamicFormGroupChildProvider],
    imports: [FormsModule, ReactiveFormsModule, SliderComponent]
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SettingsGeneratorModule, BarModule]
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
            sidebarWidth: {
                minWidth: '20rem',
                width: '20rem',
                maxWidth: '20rem',
                wrapSidebarTitle: true,
                wrapSidebarDescription: true
            },
            items: [
                {
                    title: 'First list item with long title text that wraps rather than truncates at certain screen sizes due to custom properties in the sidebar configuration',
                    description:
                        'This is an example of a description with long text that wraps rather than truncates due to custom properties in the sidebar width configuration',
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
                    ],
                    wrapSectionTitle: true
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
