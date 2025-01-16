import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListButtonDirective, NestedListExpandIconComponent, NestedListHeaderDirective, NestedListIconComponent, NestedListTitleDirective } from '../nested-list-directives';
import { NestedListStateService } from '../nested-list-state.service';
import { CommonModule } from '@angular/common';
import { CxNestedListModule } from '../nested-list.module';
import { NestedListContentDirective } from './nested-list-content.directive';
import { RouterModule } from '@angular/router';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedItemComponent } from '../nested-item/nested-item.component';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import { NestedListPopoverComponent } from '../nested-list-popover/nested-list-popover.component';
import { NestedListComponent } from '../nested-list/nested-list.component';
import { PreparedNestedListComponent } from '../prepared-nested-list/prepared-nested-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    template: `
        <div fdx-nested-list-content>
            <a fdx-nested-list-link>
                <span fdx-nested-list-icon [glyph]="'settings'"></span>
                <span fdx-nested-list-title>Link 1</span>
            </a>
            <a fdx-nested-list-expand-icon></a>
        </div>
    `,
    standalone: true,
    imports: [ 
        CommonModule,
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListButtonDirective,
        PopoverModule,
        RouterModule,
        IconComponent,
        ContentDensityModule,
        NestedListContentDirective
    ]
})
class TestNestedContainerComponent {
    @ViewChild(NestedListContentDirective)
    directiveElement: NestedListContentDirective;

    @ViewChild(NestedListExpandIconComponent)
    iconElement: NestedListExpandIconComponent;
}

describe('NestedContentDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: NestedListContentDirective;
    let iconElement: NestedListExpandIconComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestNestedContainerComponent, NoopAnimationsModule],
            providers: [NestedListStateService, NestedItemService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directiveElement = component.directiveElement;
        iconElement = component.iconElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        const classList = (directiveElement as any)._elementRef.nativeElement.classList;
        expect(classList.contains('has-child')).toBeFalsy();
        expect(classList.contains('is-selected')).toBeFalsy();

        directiveElement.selected = true;

        fixture.detectChanges();

        expect(classList.contains('is-selected')).toBeTruthy();
    });

    it('Should propagate expanded state to icon', () => {
        expect(iconElement.expanded).toBeFalsy();
        iconElement.changeExpandedState(true);
        fixture.detectChanges();
        expect(iconElement.expanded).toBeTruthy();
    });
});
