import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SelectPlatformComponent } from './select.component';
import { ElementRef, ViewChild, Component } from '@angular/core';

@Component({
    selector: 'fdp-select',
    template: `
        <fdp-select
            class="fd-select-popover-custom fd-popover-custom"
            [selectType]="'noborder'"
            [gylph]="'filter'"
            [list]="option"
            [placeholder]="'select from values'"
        >
        </fdp-select>
    `
})
class TestWrapperComponent {
    @ViewChild(SelectPlatformComponent, { static: true })
    selectRef: SelectPlatformComponent;

    @ViewChild(SelectPlatformComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    wrapperValue: string;
}

describe('SelectPlatformComponent', () => {
    let component: SelectPlatformComponent;
    let fixture: ComponentFixture<SelectPlatformComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectPlatformComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectPlatformComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
