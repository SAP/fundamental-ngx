import { chain, Rule } from '@angular-devkit/schematics';
import { addBtpPackage } from './add-btp-package';
import { replaceFdWithBtp } from './replace-fd-with-btp';
import { MigrateToFdpSplitterSchema } from './schema';

/**
 * Migrates the project to the new splitter component.
 * @param options
 */
export function migrateToFdbSplitter(options: MigrateToFdpSplitterSchema): Rule {
    return chain([addBtpPackage(), replaceFdWithBtp(options)]);
}
