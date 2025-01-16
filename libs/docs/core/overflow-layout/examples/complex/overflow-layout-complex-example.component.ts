import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, ViewChild, ViewEncapsulation } from '@angular/core';
import { KeyUtil, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupLegacyModule } from '@fundamental-ngx/core/avatar-group-legacy';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import {
    PopoverBodyComponent,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';

@Component({
    selector: 'fd-overflow-layout-complex-example',
    templateUrl: './overflow-layout-complex-example.component.html',
    styleUrls: ['./overflow-layout-complex-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        QuickViewModule,
        BarModule,
        AvatarComponent,
        LinkComponent,
        OverflowLayoutModule,
        PopoverComponent,
        PopoverControlComponent,
        NgTemplateOutlet,
        PopoverBodyComponent,
        ButtonComponent,
        AvatarGroupLegacyModule,
        PopoverBodyHeaderDirective
    ]
})
export class OverflowLayoutComplexExampleComponent {
    size: Size = 's';

    itemsToRender: any[];

    @ViewChild('overflowPopover', { read: PopoverComponent })
    overflowPopover: PopoverComponent;

    private _overflowPopoverStage: 'main' | 'detail' = 'main';

    set overflowPopoverStage(value: 'main' | 'detail') {
        this._overflowPopoverStage = value;
        this.overflowPopover.refreshPosition();
    }

    get overflowPopoverStage(): 'main' | 'detail' {
        return this._overflowPopoverStage;
    }

    personDetails: any = null;

    get isDetailStage(): boolean {
        return this.overflowPopoverStage === 'detail';
    }

    constructor(private _avatarService: AvatarGeneratorExampleService) {
        this.itemsToRender = this._avatarService.generate();
    }

    addItem(): void {
        this.itemsToRender.push(this._avatarService.generateAvatar());
    }

    removeItem(): void {
        this.itemsToRender.pop();
    }

    openOverflowDetails(idx: number): void {
        this.personDetails = this.itemsToRender[idx];
        this.overflowPopoverStage = 'detail';
    }

    openOverflowMain(): void {
        this.personDetails = null;
        this.overflowPopoverStage = 'main';
    }

    handleControlClick(event: MouseEvent, popover: PopoverComponent): void {
        popover.open();
    }

    handleControlKeydown(event: KeyboardEvent, popover: PopoverComponent): void {
        if (!KeyUtil.isKeyCode(event, [ESCAPE, TAB, SPACE, ENTER])) {
            return;
        }

        if (KeyUtil.isKeyCode(event, [ESCAPE, TAB])) {
            popover.close();
        }

        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            popover.open();
        }
    }

    handleOverflowPopoverOpen(isOpen: boolean): void {
        if (isOpen) {
            this.openOverflowMain();
        }
    }
}

const firstNames = [
    'John',
    'Sarah',
    'Jason',
    'Christian',
    'Jessica',
    'Jonathan',
    'Gordon',
    'Simon',
    'Jason',
    'Whitney',
    'Chris',
    'David'
];
const lastNames = ['Doe', 'Parker', 'Goldwell', 'Bow', 'Bale', 'Smith', 'Jason', 'Swan', 'Carter', 'Copper'];
const positions = ['Marketing Manager', 'Visual Designer', 'Software Developer'];
const glyphs = [
    'accidental-leave',
    'account',
    'activity-individual',
    'action-settings',
    'add-contact',
    'addresses',
    'attachment-photo',
    'batch-payments',
    'calendar'
];

interface PeopleExample {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    phone: string;
    mobile: string;
    email: string;
    imageUrl?: string;
    glyph?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AvatarGeneratorExampleService {
    constructor() {}

    generate(num: number = 45): PeopleExample[] {
        const people: PeopleExample[] = [];

        for (let i = 0; i < num; i++) {
            people.push(this.generateAvatar());
        }

        return people;
    }

    generateAvatar(): PeopleExample {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const position = positions[Math.floor(Math.random() * positions.length)];

        return {
            id: this._generateId(),
            firstName,
            lastName,
            position,
            phone: this._generatePhone(),
            mobile: this._generatePhone(),
            email: this._generateEmail(firstName, lastName),
            ...this._generateImage()
        };
    }

    private _generateImage(): { imageUrl?: string; glyph?: string } | null {
        const option = Math.floor(Math.random() * 3);

        switch (option) {
            case 1:
                return { imageUrl: `https://i.pravatar.cc/400?u=${this._generateId()}` }; // 'https://picsum.photos/400/400?people'
            case 2:
                return { glyph: glyphs[Math.floor(Math.random() * glyphs.length)] };
            case 3:
            default:
                return null;
        }
    }

    private _generateId(): string {
        return Math.random().toString(36).substring(6);
    }

    private _generateEmail(firstName: string, lastName: string): string {
        return `${firstName}_${lastName}_${Math.random().toString(36).substring(6)}@example.com`;
    }

    private _generatePhone(): string {
        return '+01' + Math.random().toString().slice(2, 11);
    }
}
