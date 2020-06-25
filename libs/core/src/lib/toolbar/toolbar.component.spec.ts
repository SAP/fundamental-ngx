/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewChild, Component, ViewChildren, QueryList } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';
import { whenStable } from '../utils/tests/when-stable';
import { ToolbarItemDirective } from './toolbar-item.directive';
import { ToolbarSpacerComponent } from './toolbar-spacer.component';
import { ToolbarSeparatorComponent } from './toolbar-separator.component';

@Component({
    template: `
        <div [style.width]="width">
            <fd-toolbar #toolbar [shouldOverflow]="true">
                <button fd-toolbar-item fd-button [compact]="true">Button1</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button [compact]="true">Button2</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button [compact]="true">Button3</button>
                <button fd-toolbar-item fd-button [compact]="true">Button4</button>

                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>

                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>

                <button fd-toolbar-item fd-button [compact]="true">Button5</button>
                <button fd-toolbar-item fd-button [compact]="true">Button6</button>
                <button fd-toolbar-item fd-button [compact]="true">Button7</button>
                <button fd-toolbar-item fd-button [compact]="true">Button8</button>
                <button fd-toolbar-item fd-button [compact]="true">Button9</button>
                <button fd-toolbar-item fd-button [compact]="true">Button10</button>
                <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>
                <button fd-toolbar-item fd-button [compact]="true">Button11</button>
                <button fd-toolbar-item fd-button [compact]="true">Button12</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
                <button fd-toolbar-item fd-button [compact]="true">Button13</button>
                <button fd-toolbar-item fd-button [compact]="true">Button14</button>
                <button fd-toolbar-item fd-button [compact]="true">Button15</button>
                <button fd-toolbar-item fd-button [compact]="true">Button16</button>
                <button fd-toolbar-item fd-button [compact]="true">Button17</button>
                <button fd-toolbar-item fd-button [compact]="true">Button18</button>
                <button fd-toolbar-item fd-button [compact]="true">Button19</button>
                <button fd-toolbar-item fd-button [compact]="true">Button20</button>
                <fd-toolbar-separator fd-toolbar-item></fd-toolbar-separator>
            </fd-toolbar>
        </div>
    `
})
class ToolbarTestComponent {
    @ViewChild('toolbar') toolbar: ToolbarComponent;
    @ViewChildren(ToolbarItemDirective) childrens: QueryList<ToolbarItemDirective>;

    width = '300px';
}

describe('ToolbarComponent', () => {
    let toolbar: ToolbarComponent;
    let hostComponent: ToolbarTestComponent;
    let fixture: ComponentFixture<ToolbarTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent,
                ToolbarTestComponent,
                ToolbarItemDirective,
                ToolbarSpacerComponent,
                ToolbarSeparatorComponent
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(ToolbarTestComponent);

        await whenStable(fixture);

        hostComponent = fixture.componentInstance;
        toolbar = hostComponent.toolbar;
        toolbar.toolbarItems = hostComponent.childrens;

        await whenStable(fixture);
    });

    it('should create', async () => {
        expect(hostComponent).toBeTruthy();
    });

    it('should overflow', async () => {
        toolbar.ngOnInit();

        await whenStable(fixture);

        expect(toolbar['_overflowElements'].length).toBeGreaterThan(0);

        hostComponent.width = '99999px';

        await whenStable(fixture);

        toolbar['_onResize']().subscribe(async () => {
            await whenStable(fixture);
            expect(toolbar['_overflowElements'].length).toEqual(0);
        });
    });
});
