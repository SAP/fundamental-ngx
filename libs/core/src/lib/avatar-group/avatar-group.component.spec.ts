import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupComponent, AvatarGroupType } from './avatar-group.component';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowButtonDirective } from './directives/avatar-group-overflow-button.directive';
import { AvatarGroupOverflowButtonTextDirective } from './directives/avatar-group-overflow-button-text.directive';
import { AvatarGroupOverflowBodyDirective } from './directives/avatar-group-overflow-body.directive';
import { AvatarGroupOverflowItemDirective } from './directives/avatar-group-overflow-item.directive';

const NUMBER_OF_ITEMS = 20;

@Component({
    template: `
        <div style="width: 500px">
            <fd-avatar-group #avatarGroup [type]="type" [size]="size">
                <div>
                    <div *ngFor="let item of items" fd-avatar-group-item>
                        <fd-avatar [circle]="true" [border]="true" [size]="size" [label]="item"></fd-avatar>
                    </div>
                </div>

                <fd-popover [noArrow]="false" placement="bottom">
                    <fd-popover-control>
                        <button
                            *ngIf="avatarGroup.overflowItemsCount > 0"
                            fd-button
                            fd-avatar-group-overflow-button
                            [size]="size"
                        >
                            <bdi fd-avatar-group-overflow-button-text> +{{ avatarGroup.overflowItemsCount }} </bdi>
                        </button>
                    </fd-popover-control>

                    <fd-popover-body>
                        <div class="fd-popover__wrapper">
                            <div fd-avatar-group-overflow-body>
                                <div *ngFor="let item of items; let idx = index" fd-avatar-group-overflow-item>
                                    <fd-avatar [circle]="true" [border]="true" size="s" [label]="item"></fd-avatar>
                                </div>
                            </div>
                        </div>
                    </fd-popover-body>
                </fd-popover>
            </fd-avatar-group>
        </div>
    `,
    standalone: true,
    imports: [
        AvatarGroupComponent,
        PopoverModule,
        AvatarModule,
        ButtonModule,
        AvatarGroupTestComponent,
        AvatarGroupItemDirective,
        AvatarGroupOverflowButtonDirective,
        AvatarGroupOverflowButtonTextDirective,
        AvatarGroupOverflowBodyDirective,
        AvatarGroupOverflowItemDirective
    ]
})
class AvatarGroupTestComponent {
    @ViewChild('avatarGroup')
    avatarGroup: AvatarGroupComponent;

    items = Array.from(Array(NUMBER_OF_ITEMS).map((_, index) => `Item #${index}`));

    type: AvatarGroupType = 'group';

    size: Size = 's';
}
describe('AvatarGroupComponent', () => {
    let component: AvatarGroupTestComponent;
    let fixture: ComponentFixture<AvatarGroupTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarGroupTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarGroupTestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign type class', () => {
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain(
            'fd-avatar-group--group-type'
        );

        component.type = 'individual';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain(
            'fd-avatar-group--individual-type'
        );
    });

    it('should assign size class', () => {
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain('fd-avatar-group--s');

        component.size = 'xs';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain('fd-avatar-group--xs');

        component.size = 'm';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain('fd-avatar-group--m');

        component.size = 'l';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain('fd-avatar-group--l');

        component.size = 'xl';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group').classList).toContain('fd-avatar-group--xl');
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
        expect(fixture.nativeElement.querySelector('.fd-avatar-group__more-button')).toBeTruthy();
    });
});
