import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Size } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { AvatarGroupLegacyComponent, AvatarGroupLegacyType } from './avatar-group-legacy.component';
import { AvatarGroupLegacyItemDirective } from './directives/avatar-group-legacy-item.directive';
import { AvatarGroupLegacyOverflowBodyDirective } from './directives/avatar-group-legacy-overflow-body.directive';
import { AvatarGroupLegacyOverflowButtonTextDirective } from './directives/avatar-group-legacy-overflow-button-text.directive';
import { AvatarGroupLegacyOverflowButtonDirective } from './directives/avatar-group-legacy-overflow-button.directive';
import { AvatarGroupLegacyOverflowItemDirective } from './directives/avatar-group-legacy-overflow-item.directive';

const NUMBER_OF_ITEMS = 20;

@Component({
    template: `
        <div [style.width.px]="500">
            <fd-avatar-group-legacy #avatarGroup [type]="type" [size]="size">
                <div>
                    @for (item of items; track item) {
                        <div fd-avatar-group-legacy-item>
                            <fd-avatar [circle]="true" [border]="true" [size]="size" [label]="item"></fd-avatar>
                        </div>
                    }
                </div>
                <fd-popover [noArrow]="false" placement="bottom">
                    <fd-popover-control>
                        @if (avatarGroup.overflowItemsCount > 0) {
                            <button fd-button fd-avatar-group-legacy-overflow-button [size]="size">
                                <bdi fd-avatar-group-legacy-overflow-button-text>
                                    +{{ avatarGroup.overflowItemsCount }}
                                </bdi>
                            </button>
                        }
                    </fd-popover-control>
                    <fd-popover-body>
                        <div class="fd-popover__wrapper">
                            <div fd-avatar-group-legacy-overflow-body>
                                @for (item of items; track item; let idx = $index) {
                                    <div fd-avatar-group-legacy-overflow-item>
                                        <fd-avatar [circle]="true" [border]="true" size="s" [label]="item"></fd-avatar>
                                    </div>
                                }
                            </div>
                        </div>
                    </fd-popover-body>
                </fd-popover>
            </fd-avatar-group-legacy>
        </div>
    `,
    standalone: true,
    imports: [
        AvatarGroupLegacyComponent,
        PopoverModule,
        AvatarComponent,
        ButtonComponent,
        AvatarGroupLegacyTestComponent,
        AvatarGroupLegacyItemDirective,
        AvatarGroupLegacyOverflowButtonDirective,
        AvatarGroupLegacyOverflowButtonTextDirective,
        AvatarGroupLegacyOverflowBodyDirective,
        AvatarGroupLegacyOverflowItemDirective
    ]
})
class AvatarGroupLegacyTestComponent {
    @ViewChild('avatarGroup')
    avatarGroup: AvatarGroupLegacyComponent;

    items = Array.from(Array(NUMBER_OF_ITEMS).map((_, index) => `Item #${index}`));

    type: AvatarGroupLegacyType = 'group';

    size: Size = 's';
}
describe('AvatarGroupLegacyComponent', () => {
    let component: AvatarGroupLegacyTestComponent;
    let fixture: ComponentFixture<AvatarGroupLegacyTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarGroupLegacyTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarGroupLegacyTestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign type class', () => {
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--group-type'
        );

        component.type = 'individual';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--individual-type'
        );
    });

    it('should assign size class', () => {
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--s'
        );

        component.size = 'xs';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--xs'
        );

        component.size = 'm';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--m'
        );

        component.size = 'l';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--l'
        );

        component.size = 'xl';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy').classList).toContain(
            'fd-avatar-group-legacy--xl'
        );
    });

    it('should hide part of items and display overflow button', () => {
        const resetSpy = jest.spyOn(component.avatarGroup as any, '_reset');
        const collapseSpy = jest.spyOn(component.avatarGroup as any, '_collapseItems');

        jest.spyOn(component.avatarGroup as any, '_avatarGroupWidth', 'get').mockReturnValue(500);
        jest.spyOn(component.avatarGroup.mainItems.first._element, 'offsetWidth', 'get').mockReturnValue(50);

        (<any>component.avatarGroup)._onResize();
        fixture.detectChanges();

        expect(resetSpy).toHaveBeenCalled();
        expect(collapseSpy).toHaveBeenCalled();
        expect(component.avatarGroup.mainItems.first._element.offsetWidth).toBeGreaterThan(0);
        expect(component.avatarGroup.allItemsCount).toEqual(NUMBER_OF_ITEMS);
        expect(component.avatarGroup.overflowItemsCount).toBeGreaterThan(0);
        expect(component.avatarGroup.overflowItemsCount).toBeLessThan(NUMBER_OF_ITEMS);
        expect(fixture.nativeElement.querySelector('.fd-avatar-group-legacy__more-button')).toBeTruthy();
    });
});
