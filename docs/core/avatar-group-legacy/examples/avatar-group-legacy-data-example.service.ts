import { Injectable } from '@angular/core';

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
        id: 'p001',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Marketing Manager',
        phone: '+012345678901',
        mobile: '+012345678902',
        email: 'John_Doe_001@example.com'
    },
    {
        id: 'p002',
        firstName: 'Sarah',
        lastName: 'Parker',
        position: 'Visual Designer',
        phone: '+012345678903',
        mobile: '+012345678904',
        email: 'Sarah_Parker_002@example.com',
        glyph: 'accidental-leave'
    },
    {
        id: 'p003',
        firstName: 'Jason',
        lastName: 'Goldwell',
        position: 'Software Developer',
        phone: '+012345678905',
        mobile: '+012345678906',
        email: 'Jason_Goldwell_003@example.com'
    },
    {
        id: 'p004',
        firstName: 'Christian',
        lastName: 'Bow',
        position: 'Marketing Manager',
        phone: '+012345678907',
        mobile: '+012345678908',
        email: 'Christian_Bow_004@example.com',
        glyph: 'account'
    },
    {
        id: 'p005',
        firstName: 'Jessica',
        lastName: 'Bale',
        position: 'Visual Designer',
        phone: '+012345678909',
        mobile: '+012345678910',
        email: 'Jessica_Bale_005@example.com'
    },
    {
        id: 'p006',
        firstName: 'Jonathan',
        lastName: 'Smith',
        position: 'Software Developer',
        phone: '+012345678911',
        mobile: '+012345678912',
        email: 'Jonathan_Smith_006@example.com',
        glyph: 'activity-individual'
    },
    {
        id: 'p007',
        firstName: 'Gordon',
        lastName: 'Jason',
        position: 'Marketing Manager',
        phone: '+012345678913',
        mobile: '+012345678914',
        email: 'Gordon_Jason_007@example.com'
    },
    {
        id: 'p008',
        firstName: 'Simon',
        lastName: 'Swan',
        position: 'Visual Designer',
        phone: '+012345678915',
        mobile: '+012345678916',
        email: 'Simon_Swan_008@example.com',
        glyph: 'action-settings'
    },
    {
        id: 'p009',
        firstName: 'Whitney',
        lastName: 'Carter',
        position: 'Software Developer',
        phone: '+012345678917',
        mobile: '+012345678918',
        email: 'Whitney_Carter_009@example.com'
    },
    {
        id: 'p010',
        firstName: 'Chris',
        lastName: 'Copper',
        position: 'Marketing Manager',
        phone: '+012345678919',
        mobile: '+012345678920',
        email: 'Chris_Copper_010@example.com',
        glyph: 'add-contact'
    },
    {
        id: 'p011',
        firstName: 'David',
        lastName: 'Doe',
        position: 'Visual Designer',
        phone: '+012345678921',
        mobile: '+012345678922',
        email: 'David_Doe_011@example.com'
    },
    {
        id: 'p012',
        firstName: 'John',
        lastName: 'Parker',
        position: 'Software Developer',
        phone: '+012345678923',
        mobile: '+012345678924',
        email: 'John_Parker_012@example.com',
        glyph: 'addresses'
    },
    {
        id: 'p013',
        firstName: 'Sarah',
        lastName: 'Goldwell',
        position: 'Marketing Manager',
        phone: '+012345678925',
        mobile: '+012345678926',
        email: 'Sarah_Goldwell_013@example.com'
    },
    {
        id: 'p014',
        firstName: 'Jason',
        lastName: 'Bow',
        position: 'Visual Designer',
        phone: '+012345678927',
        mobile: '+012345678928',
        email: 'Jason_Bow_014@example.com',
        glyph: 'attachment-photo'
    },
    {
        id: 'p015',
        firstName: 'Christian',
        lastName: 'Bale',
        position: 'Software Developer',
        phone: '+012345678929',
        mobile: '+012345678930',
        email: 'Christian_Bale_015@example.com'
    },
    {
        id: 'p016',
        firstName: 'Jessica',
        lastName: 'Smith',
        position: 'Marketing Manager',
        phone: '+012345678931',
        mobile: '+012345678932',
        email: 'Jessica_Smith_016@example.com',
        glyph: 'batch-payments'
    },
    {
        id: 'p017',
        firstName: 'Jonathan',
        lastName: 'Jason',
        position: 'Visual Designer',
        phone: '+012345678933',
        mobile: '+012345678934',
        email: 'Jonathan_Jason_017@example.com'
    },
    {
        id: 'p018',
        firstName: 'Gordon',
        lastName: 'Swan',
        position: 'Software Developer',
        phone: '+012345678935',
        mobile: '+012345678936',
        email: 'Gordon_Swan_018@example.com',
        glyph: 'calendar'
    },
    {
        id: 'p019',
        firstName: 'Simon',
        lastName: 'Carter',
        position: 'Marketing Manager',
        phone: '+012345678937',
        mobile: '+012345678938',
        email: 'Simon_Carter_019@example.com'
    },
    {
        id: 'p020',
        firstName: 'Whitney',
        lastName: 'Copper',
        position: 'Visual Designer',
        phone: '+012345678939',
        mobile: '+012345678940',
        email: 'Whitney_Copper_020@example.com',
        glyph: 'accidental-leave'
    },
    {
        id: 'p021',
        firstName: 'Chris',
        lastName: 'Doe',
        position: 'Software Developer',
        phone: '+012345678941',
        mobile: '+012345678942',
        email: 'Chris_Doe_021@example.com'
    },
    {
        id: 'p022',
        firstName: 'David',
        lastName: 'Parker',
        position: 'Marketing Manager',
        phone: '+012345678943',
        mobile: '+012345678944',
        email: 'David_Parker_022@example.com',
        glyph: 'account'
    },
    {
        id: 'p023',
        firstName: 'John',
        lastName: 'Goldwell',
        position: 'Visual Designer',
        phone: '+012345678945',
        mobile: '+012345678946',
        email: 'John_Goldwell_023@example.com'
    },
    {
        id: 'p024',
        firstName: 'Sarah',
        lastName: 'Bow',
        position: 'Software Developer',
        phone: '+012345678947',
        mobile: '+012345678948',
        email: 'Sarah_Bow_024@example.com',
        glyph: 'activity-individual'
    },
    {
        id: 'p025',
        firstName: 'Jason',
        lastName: 'Bale',
        position: 'Marketing Manager',
        phone: '+012345678949',
        mobile: '+012345678950',
        email: 'Jason_Bale_025@example.com'
    }
];

@Injectable({ providedIn: 'root' })
export class AvatarGroupLegacyDataExampleService {
    generate(num: number = 25): PeopleExample[] {
        return PEOPLE.slice(0, Math.min(num, PEOPLE.length));
    }
}
