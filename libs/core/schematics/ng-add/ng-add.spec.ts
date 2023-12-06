import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from "path";

const collectionPath = path.join(__dirname, '../collection.json');

describe('ng-add schematic', () => {
    it('should run successfully', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        console.log(runner);
        expect(true).toBe(true);
    });
});
