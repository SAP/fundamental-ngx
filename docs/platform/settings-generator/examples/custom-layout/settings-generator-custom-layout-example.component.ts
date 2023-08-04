import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';
import { TabPanelComponent } from '@fundamental-ngx/core/tabs';
import { AnyDynamicFormFieldItem } from '@fundamental-ngx/platform/form';
import {
    BaseSettingsGeneratorLayout,
    BaseSettingsModel,
    SettingsGeneratorComponent,
    SettingsGeneratorLayoutAccessorService,
    SettingsModel
} from '@fundamental-ngx/platform/settings-generator';
import { take } from 'rxjs/operators';

@Component({
    selector: 'fdp-settings-generator-tabs-layout',
    template: `
        <fd-tab-list *ngIf="settings">
            <fd-tab *ngFor="let tab of settings.items" [title]="tab.title | fdkAsyncOrSync">
                <fdp-settings-generator-content [settings]="tab"></fdp-settings-generator-content>
            </fd-tab>
        </fd-tab-list>
    `
})
export class SettingsGeneratorTabsLayoutComponent extends BaseSettingsGeneratorLayout {
    protected _destroyRef = inject(DestroyRef);

    @ViewChildren(TabPanelComponent)
    tabPanels: QueryList<TabPanelComponent>;

    /**
     * Abstract method implementation for activating defined section and (optionally) group.
     * @param path Path of the section and optional group. String joined by dot(.)
     * @param element Element reference.
     */
    focusElementByPath(path: string, element: ElementRef<HTMLElement>): void {
        const pathArray = path.split('.');
        const sectionIndex =
            this.settings?.items.findIndex((section) => {
                return (<any>section).id === pathArray[0];
            }) ?? -1;
        if (sectionIndex > -1) {
            this.tabPanels.get(sectionIndex)!.open(true);
        }
    }
}

export interface TabbedSettingsLayout extends BaseSettingsModel<AnyDynamicFormFieldItem> {
    appearance: 'tabs';
}

export interface FlatSettingsLayout extends BaseSettingsModel<AnyDynamicFormFieldItem> {
    appearance: 'flat';
}

@Component({
    selector: 'fdp-settings-generator-custom-layout-example',
    templateUrl: './settings-generator-custom-layout-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsGeneratorCustomLayoutExampleComponent {
    @ViewChild('firstTabContent')
    firstTabContent: TemplateRef<any>;

    @ViewChild('secondTabContent')
    secondTabContent: TemplateRef<any>;

    @ViewChild(SettingsGeneratorComponent)
    settingsGenerator: SettingsGeneratorComponent;
    /**
     * First generic argument is responsible for additional control types.
     * Second generic argument is responsible for additional layout types.
     */
    schema: SettingsModel<AnyDynamicFormFieldItem, TabbedSettingsLayout | FlatSettingsLayout>;

    private readonly _settingsGeneratorLayoutService = inject(SettingsGeneratorLayoutAccessorService);

    private readonly _cdr = inject(ChangeDetectorRef);
    ngOnInit(): void {
        this._settingsGeneratorLayoutService.addLayout('tabs', SettingsGeneratorTabsLayoutComponent);
    }

    ngAfterViewInit(): void {
        this.schema = {
            appearance: 'tabs', // or 'flat', or default 'sidebar'.
            items: [
                {
                    title: 'First tab',
                    template: this.firstTabContent
                },
                {
                    title: 'Second tab',
                    template: this.secondTabContent
                },
                {
                    title: 'Third tab',
                    id: 'thirdTab',
                    items: [
                        {
                            name: 'textInput',
                            type: 'input',
                            message: 'Text input',
                            validators: [Validators.required]
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
