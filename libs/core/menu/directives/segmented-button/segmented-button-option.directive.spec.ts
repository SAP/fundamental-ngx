import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { whenStable } from '@fundamental-ngx/core/tests';
import { MenuInteractiveComponent } from '../../menu-interactive.component';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { MenuComponent } from '../../menu.component';
import { MenuAddonDirective } from '../menu-addon.directive';
import { MenuTitleDirective } from '../menu-title.directive';
import { SegmentedButtonHeaderDirective } from './segmented-button-header.directive';
import { SegmentedButtonOptionDirective } from './segmented-button-option.directive';

@Component({
    template: `
        <fd-menu>
            <li fd-menu-item fdMenuSegmentedButtonHeader [(ngModel)]="sortValue">
                <button fd-menu-interactive>
                    <fd-menu-addon position="before" glyph="sort"></fd-menu-addon>
                    <span fd-menu-title>Sort</span>
                </button>
            </li>
            <li fd-menu-item fdMenuSegmentedButtonOption value="asc">
                <button fd-menu-interactive>
                    <fd-menu-addon position="before" glyph="sort"></fd-menu-addon>
                    <span fd-menu-title>Ascending</span>
                </button>
            </li>
            <li fd-menu-item fdMenuSegmentedButtonOption value="desc">
                <button fd-menu-interactive>
                    <fd-menu-addon position="before" glyph="sort"></fd-menu-addon>
                    <span fd-menu-title>Descending</span>
                </button>
            </li>
        </fd-menu>
    `,
    imports: [
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuAddonDirective,
        MenuTitleDirective,
        SegmentedButtonHeaderDirective,
        SegmentedButtonOptionDirective,
        FormsModule
    ]
})
class SegmentedButtonOptionTestComponent {
    @ViewChild(NgModel) ngModel: NgModel;
    @ViewChildren(SegmentedButtonOptionDirective) options: QueryList<SegmentedButtonOptionDirective<string>>;

    sortValue: string | null = null;
}

describe('SegmentedButtonOptionDirective', () => {
    let fixture: ComponentFixture<SegmentedButtonOptionTestComponent>;
    let component: SegmentedButtonOptionTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SegmentedButtonOptionTestComponent]
        }).compileComponents();
    }));

    async function setup(): Promise<void> {
        fixture = TestBed.createComponent(SegmentedButtonOptionTestComponent);
        component = fixture.componentInstance;

        await whenStable(fixture);
        fixture.detectChanges();
        await whenStable(fixture);

        // Allow delay(0) in the directive to fire
        await new Promise((resolve) => setTimeout(resolve, 50));
        fixture.detectChanges();
        await whenStable(fixture);
    }

    function getOptionElements(): HTMLElement[] {
        return component.options.toArray().map((opt) => opt.elementRef.nativeElement);
    }

    it('should create the directives', async () => {
        await setup();
        expect(component.options.length).toBe(2);
    });

    it('should emit clicked when option is clicked', async () => {
        await setup();
        const spy = jest.fn();
        const optionDirective = component.options.first;
        optionDirective.clicked.subscribe(spy);

        getOptionElements()[0].click();

        expect(spy).toHaveBeenCalled();
    });

    it('should create dot element after view init', async () => {
        await setup();
        const dot = getOptionElements()[0].querySelector('.fd-menu__active-dot');
        expect(dot).toBeTruthy();
    });

    it('should hide dot when option is not selected', async () => {
        await setup();
        const dot = getOptionElements()[0].querySelector('.fd-menu__active-dot') as HTMLElement;
        expect(dot.style.display).toBe('none');
    });

    it('should show dot when option is selected', async () => {
        await setup();

        component.ngModel.control.setValue('asc');
        fixture.detectChanges();
        await whenStable(fixture);
        await new Promise((resolve) => setTimeout(resolve, 50));
        fixture.detectChanges();
        await whenStable(fixture);

        const dot = getOptionElements()[0].querySelector('.fd-menu__active-dot') as HTMLElement;
        expect(dot.style.display).toBe('inline-block');
    });

    it('should toggle dot visibility when selection changes', async () => {
        await setup();

        // Select first option
        component.ngModel.control.setValue('asc');
        fixture.detectChanges();
        await whenStable(fixture);
        await new Promise((resolve) => setTimeout(resolve, 50));
        fixture.detectChanges();
        await whenStable(fixture);

        const elements = getOptionElements();
        const ascDot = elements[0].querySelector('.fd-menu__active-dot') as HTMLElement;
        const descDot = elements[1].querySelector('.fd-menu__active-dot') as HTMLElement;

        expect(ascDot.style.display).toBe('inline-block');
        expect(descDot.style.display).toBe('none');

        // Switch to second option
        component.ngModel.control.setValue('desc');
        fixture.detectChanges();
        await whenStable(fixture);
        await new Promise((resolve) => setTimeout(resolve, 50));
        fixture.detectChanges();
        await whenStable(fixture);

        expect(ascDot.style.display).toBe('none');
        expect(descDot.style.display).toBe('inline-block');
    });
});
