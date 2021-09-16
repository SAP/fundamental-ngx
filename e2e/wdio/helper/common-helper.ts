import { click } from '../driver/wdio';

export function checkLinkTargetDestination(element: string, site: string): void {
    click(element);
    expect(browser).toHaveUrlContaining(site);
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomString(length: number): string {
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz 0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return result;
}
