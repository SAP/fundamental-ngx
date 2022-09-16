export function getRandomString(length: number): string {
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz 0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return result;
}
