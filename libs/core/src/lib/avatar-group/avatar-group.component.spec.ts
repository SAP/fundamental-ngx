import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';

import { Size } from '../utils/public_api';
import { AvatarGroupModule } from './avatar-group.module';
import { AvatarGroupComponent, AvatarGroupType } from './avatar-group.component';

const NUMBER_OF_ITEMS = 20;

@Component({
    template: `
        <fd-avatar-group #avatarGroup [type]="type" [size]="size">
            <div>
                <div *ngFor="let item of items" fd-avatar-group-item>
                    <fd-avatar [circle]="true" [border]="true" [size]="size" [label]="item"></fd-avatar>
                </div>
            </div>

            <fd-popover [noArrow]="false" placement="bottom">
                <fd-popover-control>
                    <button *ngIf="avatarGroup.overflowItemsCount > 0"
                            fd-button
                            fd-avatar-group-overflow-button
                            [size]="size">
                        <bdi fd-avatar-group-overflow-button-text>
                            +{{ avatarGroup.overflowItemsCount }}
                        </bdi>
                    </button>
                </fd-popover-control>
                <fd-popover-body>
                    <div class="fd-popover__wrapper">
                        <div fd-avatar-group-overflow-body>
                            <div *ngFor="let item of items; let idx = index;" fd-avatar-group-overflow-item>
                                <fd-avatar [circle]="true" [border]="true" size="s" [label]="item"></fd-avatar>
                            </div>
                        </div>
                    </div>
                </fd-popover-body>
            </fd-popover>
        </fd-avatar-group>
    `
})
class AvatarGroupTestComponent {
    @ViewChild('avatarGroup') avatarGroup: AvatarGroupComponent;
    items = Array.from(Array(NUMBER_OF_ITEMS).keys());
    type: AvatarGroupType = 'group';
    size: Size = 's';
}
describe('AvatarGroupComponent', () => {
    let component: AvatarGroupTestComponent;
    let fixture: ComponentFixture<AvatarGroupTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AvatarGroupTestComponent, AvatarGroupComponent],
            imports: [AvatarGroupModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(AvatarGroupComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
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
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--group-type');

        component.type = 'individual';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--individual-type');
    });

    it('should assign size class', () => {
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--s');

        component.size = 'xs';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--xs');

        component.size = 'm';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--m');

        component.size = 'l';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--l');

        component.size = 'xl';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar-group')).toHaveClass('fd-avatar-group--xl');
    });

    // TODO: figure out why the avatar components have no width
    xit('should hide part of items and display overflow button', () => {
        spyOnProperty(component.avatarGroup.avatarGroupContainer.nativeElement, 'offsetWidth').and.returnValue(500);
        const resetSpy = spyOn(<any>component.avatarGroup, '_reset').and.callThrough();
        const collapseSpy = spyOn(<any>component.avatarGroup, '_collapseItems').and.callThrough();

        (<any>component.avatarGroup)._onResize();

        expect(resetSpy).toHaveBeenCalled();
        expect(collapseSpy).toHaveBeenCalled();
        expect(component.avatarGroup.mainItems.first.elementRef.nativeElement.offsetWidth).toBeGreaterThan(0);
        expect(component.avatarGroup.allItemsCount).toEqual(NUMBER_OF_ITEMS);
        expect(component.avatarGroup.visibleItemsCount).toBeGreaterThan(0);
        expect(component.avatarGroup.visibleItemsCount).toBeLessThan(NUMBER_OF_ITEMS);
        expect(component.avatarGroup.overflowItemsCount).toBeGreaterThan(0);
        expect(component.avatarGroup.overflowItemsCount).toBeLessThan(NUMBER_OF_ITEMS);
        expect(fixture.nativeElement.querySelector('.fd-avatar-group__more-button')).toBeTruthy();
    });
});
