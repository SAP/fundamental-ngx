import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { NestedItemComponent } from '../nested-item/nested-item.component';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import {
    NestedListButtonDirective,
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListTitleDirective
} from '../nested-list-directives';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListPopoverComponent } from '../nested-list-popover/nested-list-popover.component';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListComponent } from '../nested-list/nested-list.component';
import { PreparedNestedListComponent } from './prepared-nested-list.component';

describe('NestedListPopoverComponent', () => {
    let component: PreparedNestedListComponent;
    let fixture: ComponentFixture<PreparedNestedListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
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
                NestedListContentDirective,
                NoopAnimationsModule
            ],
            providers: [NestedListStateService, MenuKeyboardService, NestedListKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreparedNestedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
