/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PlatformButtonModule, ContentDensity } from '@fundamental-ngx/platform';

import { InputGroupComponent } from './input-group.component';
import { PlatformInputGroupModule } from './input-group.module';

@Component({
    template: `<fdp-panel title="Panel Title">
        <fdp-panel-content>Panel Content Text</fdp-panel-content>
    </fdp-panel>`
})
class PanelWithDefaultValuesComponent {
    @ViewChild(InputGroupComponent) panel: InputGroupComponent;
}
describe('PanelComponent default values', () => {
    let component: PanelWithDefaultValuesComponent;
    let fixture: ComponentFixture<PanelWithDefaultValuesComponent>;
    let panelComponent: InputGroupComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformInputGroupModule],
            declarations: [PanelWithDefaultValuesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelWithDefaultValuesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        panelComponent = component.panel;
    });

    it('Should be expandable by default', () => {
        expect(panelComponent.expandable).toBeTruthy();
    });

    it('Should be expanded by default', () => {
        expect(panelComponent.expanded).toBeTruthy();
    });

    it('Should have default value of collapseLabel as "Collapse Panel"', () => {
        expect(panelComponent.collapseLabel).toBe('Collapse Panel');
    });

    it('Should have default value of expandLabel as "Expand Panel"', () => {
        expect(panelComponent.expandLabel).toBe('Expand Panel');
    });
});
 */
