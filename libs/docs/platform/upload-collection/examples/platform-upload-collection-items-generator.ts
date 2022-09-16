import { uuidv4 } from '@fundamental-ngx/core/utils';
import {
    UploadCollectionFile,
    UploadCollectionFolder,
    UploadCollectionItem
} from '@fundamental-ngx/platform/upload-collection';

const firstNames = [
    'Liam',
    'Noah',
    'Oliver',
    'William',
    'Elijah',
    'James',
    'Benjamin',
    'Lucas',
    'Mason',
    'Ethan',
    'Alexander',
    'Henry',
    'Jacob',
    'Michael',
    'Daniel',
    'Logan',
    'Jackson',
    'Sebastian',
    'Jack',
    'Aiden'
];
const maxSize = 1024 * 1024 * 5;
const extensions = ['.jpg', '.png', '.pdf', '.xls'];

function generateRandomLetter(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
}

function randomDate(start: Date, end: Date): Date {
    return new Date(+start + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFiles(number: number): UploadCollectionFile[] {
    const files: UploadCollectionFile[] = [];

    for (let i = 0; i < number; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const fileSize = getRandomInt(1, maxSize);
        const extension = extensions[Math.floor(Math.random() * extensions.length)];

        let url: string | undefined;

        switch (extension) {
            case '.jpg':
            case '.png':
                url = 'https://picsum.photos/200';
                break;
            case '.pdf':
                url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
                break;
            case '.xls':
                url = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls';
                break;
        }

        if (!url) {
            continue;
        }

        files.push({
            documentId: uuidv4(),
            type: 'file',
            name: `File-${i + 1}${extension}`,
            uploadedBy: {
                id: uuidv4(),
                name: `${firstName} ${generateRandomLetter()}.`
            },
            url,
            uploadedOn: randomDate(new Date(2018, 0, 1), new Date()),
            fileSize,
            version: Math.floor(Math.random() * 10) || 1
        });
    }

    return files;
}

function generateFolders(numberOfFolders: number, maxLevelNesting = 3, currentLevel = 0): UploadCollectionFolder[] {
    const folders: UploadCollectionFolder[] = [];

    for (let i = 0; i < numberOfFolders; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const files: UploadCollectionItem[] = generateFiles(Math.floor(Math.random() * 10));

        if (maxLevelNesting !== currentLevel) {
            files.push(...generateFolders(Math.floor(Math.random() * 10), maxLevelNesting, currentLevel + 1));
        }

        folders.push({
            documentId: uuidv4(),
            type: 'folder',
            name: `Folder-${i + 1}`,
            uploadedBy: {
                id: uuidv4(),
                name: `${firstName} ${generateRandomLetter()}.`
            },
            uploadedOn: randomDate(new Date(2018, 0, 1), new Date()),
            files
        });
    }

    return folders;
}

export function generateUploadCollectionItems(
    numberOfFiles: number,
    numberOfFolders: number,
    folderMaxLevelNesting: number
): UploadCollectionItem[] {
    return [...generateFiles(numberOfFiles), ...generateFolders(numberOfFolders, folderMaxLevelNesting - 1)];
}
