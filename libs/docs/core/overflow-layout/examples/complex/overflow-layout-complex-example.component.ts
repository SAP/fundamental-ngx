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
    @ViewChild('overflowPopover', { read: PopoverComponent })
    overflowPopover: PopoverComponent;

    size: Size = 's';

    itemsToRender: any[];

    personDetails: any = null;

    private _overflowPopoverStage: 'main' | 'detail' = 'main';

    set overflowPopoverStage(value: 'main' | 'detail') {
        this._overflowPopoverStage = value;
        this.overflowPopover.refreshPosition();
    }

    get overflowPopoverStage(): 'main' | 'detail' {
        return this._overflowPopoverStage;
    }

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

const PEOPLE: PeopleExample[] = [
    {
        id: 'a001',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Marketing Manager',
        phone: '+012345670001',
        mobile: '+012345670002',
        email: 'John_Doe_001@example.com'
    },
    {
        id: 'a002',
        firstName: 'Sarah',
        lastName: 'Parker',
        position: 'Visual Designer',
        phone: '+012345670003',
        mobile: '+012345670004',
        email: 'Sarah_Parker_002@example.com',
        glyph: 'accidental-leave'
    },
    {
        id: 'a003',
        firstName: 'Jason',
        lastName: 'Goldwell',
        position: 'Software Developer',
        phone: '+012345670005',
        mobile: '+012345670006',
        email: 'Jason_Goldwell_003@example.com'
    },
    {
        id: 'a004',
        firstName: 'Christian',
        lastName: 'Bow',
        position: 'Marketing Manager',
        phone: '+012345670007',
        mobile: '+012345670008',
        email: 'Christian_Bow_004@example.com',
        glyph: 'account'
    },
    {
        id: 'a005',
        firstName: 'Jessica',
        lastName: 'Bale',
        position: 'Visual Designer',
        phone: '+012345670009',
        mobile: '+012345670010',
        email: 'Jessica_Bale_005@example.com'
    },
    {
        id: 'a006',
        firstName: 'Jonathan',
        lastName: 'Smith',
        position: 'Software Developer',
        phone: '+012345670011',
        mobile: '+012345670012',
        email: 'Jonathan_Smith_006@example.com',
        glyph: 'activity-individual'
    },
    {
        id: 'a007',
        firstName: 'Gordon',
        lastName: 'Jason',
        position: 'Marketing Manager',
        phone: '+012345670013',
        mobile: '+012345670014',
        email: 'Gordon_Jason_007@example.com'
    },
    {
        id: 'a008',
        firstName: 'Simon',
        lastName: 'Swan',
        position: 'Visual Designer',
        phone: '+012345670015',
        mobile: '+012345670016',
        email: 'Simon_Swan_008@example.com',
        glyph: 'action-settings'
    },
    {
        id: 'a009',
        firstName: 'Whitney',
        lastName: 'Carter',
        position: 'Software Developer',
        phone: '+012345670017',
        mobile: '+012345670018',
        email: 'Whitney_Carter_009@example.com'
    },
    {
        id: 'a010',
        firstName: 'Chris',
        lastName: 'Copper',
        position: 'Marketing Manager',
        phone: '+012345670019',
        mobile: '+012345670020',
        email: 'Chris_Copper_010@example.com',
        glyph: 'add-contact'
    },
    {
        id: 'a011',
        firstName: 'David',
        lastName: 'Doe',
        position: 'Visual Designer',
        phone: '+012345670021',
        mobile: '+012345670022',
        email: 'David_Doe_011@example.com'
    },
    {
        id: 'a012',
        firstName: 'John',
        lastName: 'Parker',
        position: 'Software Developer',
        phone: '+012345670023',
        mobile: '+012345670024',
        email: 'John_Parker_012@example.com',
        glyph: 'addresses'
    },
    {
        id: 'a013',
        firstName: 'Sarah',
        lastName: 'Goldwell',
        position: 'Marketing Manager',
        phone: '+012345670025',
        mobile: '+012345670026',
        email: 'Sarah_Goldwell_013@example.com'
    },
    {
        id: 'a014',
        firstName: 'Jason',
        lastName: 'Bow',
        position: 'Visual Designer',
        phone: '+012345670027',
        mobile: '+012345670028',
        email: 'Jason_Bow_014@example.com',
        glyph: 'attachment-photo'
    },
    {
        id: 'a015',
        firstName: 'Christian',
        lastName: 'Bale',
        position: 'Software Developer',
        phone: '+012345670029',
        mobile: '+012345670030',
        email: 'Christian_Bale_015@example.com'
    },
    {
        id: 'a016',
        firstName: 'Jessica',
        lastName: 'Smith',
        position: 'Marketing Manager',
        phone: '+012345670031',
        mobile: '+012345670032',
        email: 'Jessica_Smith_016@example.com',
        glyph: 'batch-payments'
    },
    {
        id: 'a017',
        firstName: 'Jonathan',
        lastName: 'Jason',
        position: 'Visual Designer',
        phone: '+012345670033',
        mobile: '+012345670034',
        email: 'Jonathan_Jason_017@example.com'
    },
    {
        id: 'a018',
        firstName: 'Gordon',
        lastName: 'Swan',
        position: 'Software Developer',
        phone: '+012345670035',
        mobile: '+012345670036',
        email: 'Gordon_Swan_018@example.com',
        glyph: 'calendar'
    },
    {
        id: 'a019',
        firstName: 'Simon',
        lastName: 'Carter',
        position: 'Marketing Manager',
        phone: '+012345670037',
        mobile: '+012345670038',
        email: 'Simon_Carter_019@example.com'
    },
    {
        id: 'a020',
        firstName: 'Whitney',
        lastName: 'Copper',
        position: 'Visual Designer',
        phone: '+012345670039',
        mobile: '+012345670040',
        email: 'Whitney_Copper_020@example.com',
        glyph: 'accidental-leave'
    },
    {
        id: 'a021',
        firstName: 'Chris',
        lastName: 'Doe',
        position: 'Software Developer',
        phone: '+012345670041',
        mobile: '+012345670042',
        email: 'Chris_Doe_021@example.com'
    },
    {
        id: 'a022',
        firstName: 'David',
        lastName: 'Parker',
        position: 'Marketing Manager',
        phone: '+012345670043',
        mobile: '+012345670044',
        email: 'David_Parker_022@example.com',
        glyph: 'account'
    },
    {
        id: 'a023',
        firstName: 'John',
        lastName: 'Goldwell',
        position: 'Visual Designer',
        phone: '+012345670045',
        mobile: '+012345670046',
        email: 'John_Goldwell_023@example.com'
    },
    {
        id: 'a024',
        firstName: 'Sarah',
        lastName: 'Bow',
        position: 'Software Developer',
        phone: '+012345670047',
        mobile: '+012345670048',
        email: 'Sarah_Bow_024@example.com',
        glyph: 'activity-individual'
    },
    {
        id: 'a025',
        firstName: 'Jason',
        lastName: 'Bale',
        position: 'Marketing Manager',
        phone: '+012345670049',
        mobile: '+012345670050',
        email: 'Jason_Bale_025@example.com'
    },
    {
        id: 'a026',
        firstName: 'Jessica',
        lastName: 'Goldwell',
        position: 'Visual Designer',
        phone: '+012345670051',
        mobile: '+012345670052',
        email: 'Jessica_Goldwell_026@example.com',
        glyph: 'action-settings'
    },
    {
        id: 'a027',
        firstName: 'Jonathan',
        lastName: 'Copper',
        position: 'Software Developer',
        phone: '+012345670053',
        mobile: '+012345670054',
        email: 'Jonathan_Copper_027@example.com'
    },
    {
        id: 'a028',
        firstName: 'Gordon',
        lastName: 'Bale',
        position: 'Marketing Manager',
        phone: '+012345670055',
        mobile: '+012345670056',
        email: 'Gordon_Bale_028@example.com',
        glyph: 'add-contact'
    },
    {
        id: 'a029',
        firstName: 'Simon',
        lastName: 'Smith',
        position: 'Visual Designer',
        phone: '+012345670057',
        mobile: '+012345670058',
        email: 'Simon_Smith_029@example.com'
    },
    {
        id: 'a030',
        firstName: 'Whitney',
        lastName: 'Doe',
        position: 'Software Developer',
        phone: '+012345670059',
        mobile: '+012345670060',
        email: 'Whitney_Doe_030@example.com',
        glyph: 'addresses'
    },
    {
        id: 'a031',
        firstName: 'Chris',
        lastName: 'Parker',
        position: 'Marketing Manager',
        phone: '+012345670061',
        mobile: '+012345670062',
        email: 'Chris_Parker_031@example.com'
    },
    {
        id: 'a032',
        firstName: 'David',
        lastName: 'Goldwell',
        position: 'Visual Designer',
        phone: '+012345670063',
        mobile: '+012345670064',
        email: 'David_Goldwell_032@example.com',
        glyph: 'attachment-photo'
    },
    {
        id: 'a033',
        firstName: 'John',
        lastName: 'Bow',
        position: 'Software Developer',
        phone: '+012345670065',
        mobile: '+012345670066',
        email: 'John_Bow_033@example.com'
    },
    {
        id: 'a034',
        firstName: 'Sarah',
        lastName: 'Carter',
        position: 'Marketing Manager',
        phone: '+012345670067',
        mobile: '+012345670068',
        email: 'Sarah_Carter_034@example.com',
        glyph: 'batch-payments'
    },
    {
        id: 'a035',
        firstName: 'Jason',
        lastName: 'Swan',
        position: 'Visual Designer',
        phone: '+012345670069',
        mobile: '+012345670070',
        email: 'Jason_Swan_035@example.com'
    },
    {
        id: 'a036',
        firstName: 'Christian',
        lastName: 'Carter',
        position: 'Software Developer',
        phone: '+012345670071',
        mobile: '+012345670072',
        email: 'Christian_Carter_036@example.com',
        glyph: 'calendar'
    },
    {
        id: 'a037',
        firstName: 'Jessica',
        lastName: 'Jason',
        position: 'Marketing Manager',
        phone: '+012345670073',
        mobile: '+012345670074',
        email: 'Jessica_Jason_037@example.com'
    },
    {
        id: 'a038',
        firstName: 'Jonathan',
        lastName: 'Bow',
        position: 'Visual Designer',
        phone: '+012345670075',
        mobile: '+012345670076',
        email: 'Jonathan_Bow_038@example.com',
        glyph: 'accidental-leave'
    },
    {
        id: 'a039',
        firstName: 'Gordon',
        lastName: 'Parker',
        position: 'Software Developer',
        phone: '+012345670077',
        mobile: '+012345670078',
        email: 'Gordon_Parker_039@example.com'
    },
    {
        id: 'a040',
        firstName: 'Simon',
        lastName: 'Bale',
        position: 'Marketing Manager',
        phone: '+012345670079',
        mobile: '+012345670080',
        email: 'Simon_Bale_040@example.com',
        glyph: 'account'
    },
    {
        id: 'a041',
        firstName: 'Whitney',
        lastName: 'Smith',
        position: 'Visual Designer',
        phone: '+012345670081',
        mobile: '+012345670082',
        email: 'Whitney_Smith_041@example.com'
    },
    {
        id: 'a042',
        firstName: 'Chris',
        lastName: 'Swan',
        position: 'Software Developer',
        phone: '+012345670083',
        mobile: '+012345670084',
        email: 'Chris_Swan_042@example.com',
        glyph: 'activity-individual'
    },
    {
        id: 'a043',
        firstName: 'David',
        lastName: 'Jason',
        position: 'Marketing Manager',
        phone: '+012345670085',
        mobile: '+012345670086',
        email: 'David_Jason_043@example.com'
    },
    {
        id: 'a044',
        firstName: 'John',
        lastName: 'Smith',
        position: 'Visual Designer',
        phone: '+012345670087',
        mobile: '+012345670088',
        email: 'John_Smith_044@example.com',
        glyph: 'action-settings'
    },
    {
        id: 'a045',
        firstName: 'Sarah',
        lastName: 'Copper',
        position: 'Software Developer',
        phone: '+012345670089',
        mobile: '+012345670090',
        email: 'Sarah_Copper_045@example.com'
    }
];

@Injectable({
    providedIn: 'root'
})
export class AvatarGeneratorExampleService {
    private _extraCount = 0;

    generate(num: number = 45): PeopleExample[] {
        return PEOPLE.slice(0, Math.min(num, PEOPLE.length));
    }

    generateAvatar(): PeopleExample {
        this._extraCount++;
        const n = this._extraCount;
        const padded = String(n).padStart(3, '0');
        const glyphs = ['accidental-leave', 'account', 'activity-individual', 'action-settings', 'add-contact'];
        const glyph = n % 2 === 0 ? { glyph: glyphs[n % glyphs.length] } : {};
        return {
            id: `extra-${padded}`,
            firstName: 'Extra',
            lastName: `User${padded}`,
            position: 'Software Developer',
            phone: `+019999${padded}`,
            mobile: `+019998${padded}`,
            email: `extra_user_${padded}@example.com`,
            ...glyph
        };
    }
}
