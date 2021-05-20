import { Injectable } from '@angular/core';

const firstNames = ['John', 'Sarah', 'Jason', 'Christian', 'Jessica', 'Jonathan', 'Gordon', 'Simon', 'Jason', 'Whitney', 'Chris', 'David'];
const lastNames = ['Doe', 'Parker', 'Goldwell', 'Bow', 'Bale', 'Smith', 'Jason', 'Swan', 'Carter', 'Copper'];
const positions = ['Marketing Manager', 'Visual Designer', 'Software Developer'];
const glyphs = ['accidental-leave', 'account', 'activity-individual', 'action-settings', 'add-contact', 'addresses', 'attachment-photo', 'batch-payments', 'calendar'];

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

@Injectable({ providedIn: 'root' })
export class AvatarGroupDataExampleService {
    generate(num: number = 25): PeopleExample[] {
        const people: PeopleExample[] = [];

        for (let i = 0; i < num; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const position = positions[Math.floor(Math.random() * positions.length)];

            people.push({
                id: this._generateId(),
                firstName: firstName,
                lastName: lastName,
                position: position,
                phone: this._generatePhone(),
                mobile: this._generatePhone(),
                email: this._generateEmail(firstName, lastName),
                ...this._generateImage()
            });
        }

        return people;
    }

    private _generateImage(): { imageUrl?: string; glyph?: string; } {
        const option = Math.floor(Math.random() * 3);

        switch (option) {
            case 1:
                return { imageUrl: `https://i.pravatar.cc/400?u=${this._generateId()}` }; // 'http://placeimg.com/400/400/people'
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
