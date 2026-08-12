import { Injectable } from '@angular/core';

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

export interface PeopleExample {
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

@Injectable({ providedIn: 'root' })
export class AvatarGroupDataExampleService {
    generate(num: number = 25): PeopleExample[] {
        const people: PeopleExample[] = [];

        for (let i = 0; i < num; i++) {
            const firstName = firstNames[i % firstNames.length];
            const lastName = lastNames[i % lastNames.length];
            const position = positions[i % positions.length];

            people.push({
                id: `avatar-${i}`,
                firstName,
                lastName,
                position,
                phone: `+01555000${String(i).padStart(4, '0')}`,
                mobile: `+01555001${String(i).padStart(4, '0')}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
                ...this._generateImage(i)
            });
        }

        return people;
    }

    private _generateImage(index: number): { imageUrl?: string; glyph?: string } | null {
        // cycle: image → glyph → no image → image → ...
        switch (index % 3) {
            case 0:
                return { imageUrl: `https://picsum.photos/seed/avatar${index}/400/400` };
            case 1:
                return { glyph: glyphs[index % glyphs.length] };
            default:
                return null;
        }
    }
}
