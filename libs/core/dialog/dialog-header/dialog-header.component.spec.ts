import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, Type, ViewChild } from '@angular/core';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogCloseButtonComponent } from '../dialog-close-button/dialog-close-button.component';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogHeaderComponent } from './dialog-header.component';

@Component({
    template: `
        <fd-dialog-header>
            <ng-template fdkTemplate="header">
                <div fd-bar-right>
                    <fd-bar-element>
                        <button>Custom button</button>
                    </fd-bar-element>
                </div>
            </ng-template>
            <ng-template fdkTemplate="subheader">
                <div fd-bar-middle>
                    <fd-bar-element>
                        <input id="customInput" />
                    </fd-bar-element>
                </div>
            </ng-template>
        </fd-dialog-header>
    `,
    standalone: true,
    imports: [DialogHeaderComponent, TemplateDirective, BarModule]
})
class CustomHeaderTestComponent {
    @ViewChild(DialogHeaderComponent) dialogHeaderRef: DialogHeaderComponent;
}

@Component({
    template: `
        <fd-dialog-header>
            <h1 fd-title>Default Title</h1>
            <button fd-dialog-close-button></button>
        </fd-dialog-header>
    `,
    standalone: true,
    imports: [DialogHeaderComponent, DialogCloseButtonComponent, TitleComponent]
})
class DefaultHeaderTestComponent {
    @ViewChild(DialogHeaderComponent) dialogHeaderRef: DialogHeaderComponent;
}

describe('DialogHeaderComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [DialogHeaderComponent, CustomHeaderTestComponent, DefaultHeaderTestComponent],
            providers: [DialogConfig]
        }).overrideComponent(DialogHeaderComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });
    }));

    function setup<V>(testComponent): { fixture: ComponentFixture<V>; component: V } {
        const fixture = TestBed.createComponent(testComponent as any as Type<V>);
        const component = fixture.componentInstance;

        return { fixture, component };
    }

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', async () => {
        const { fixture, component } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);

        await wait(fixture);

        expect(component).toBeTruthy();
        expect(component.dialogHeaderRef).toBeTruthy();
    });

    it('should display in mobile mode', async () => {
        const { fixture, component } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);

        await wait(fixture);

        component.dialogHeaderRef.dialogConfig.mobile = true;
        component.dialogHeaderRef.dialogConfig.contentDensity = ContentDensityMode.COZY;

        await wait(fixture);
        const footerEl = fixture.nativeElement.querySelector('[fd-bar]');

        expect(footerEl.classList).toContain('fd-dialog__header');
        expect(footerEl.classList).toContain('is-cozy');
    });

    it('should use default template', async () => {
        const { fixture } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);
        await wait(fixture);

        const buttonEl = fixture.nativeElement.querySelector('[fd-dialog-close-button]');
        const headerEl = fixture.nativeElement.querySelector('.fd-bar--header');

        expect(buttonEl).toBeTruthy();
        expect(headerEl).toBeTruthy();
    });

    it('should use custom templates', async () => {
        const { fixture, component } = setup<CustomHeaderTestComponent>(CustomHeaderTestComponent);
        await wait(fixture);

        const headerEl = fixture.nativeElement.querySelector('.fd-bar--header-with-subheader');
        const subheaderEl = fixture.nativeElement.querySelector('.fd-bar--subheader');

        expect(headerEl).toBeTruthy();
        expect(subheaderEl).toBeTruthy();
        expect(component.dialogHeaderRef.customTemplates().length).toEqual(2);

        const button = headerEl.querySelector('button');
        expect(button.textContent).toContain('Custom button');

        const input = subheaderEl.querySelector('input');
        expect(input.id).toContain('customInput');
    });
});
