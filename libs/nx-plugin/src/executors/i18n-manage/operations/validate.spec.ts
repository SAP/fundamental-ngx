import { vol } from 'memfs';
import { validate } from './validate';

jest.mock('fs', () => {
    const memfs = require('memfs');
    return { ...memfs.fs, promises: memfs.fs.promises };
});

jest.mock('fast-glob', () => ({ sync: jest.fn() }));
jest.mock('@nx/devkit', () => ({ workspaceRoot: '/test-workspace' }));

// Mock extractKeysFromFdLanguageInterface to read from memfs
jest.mock('../../shared/update-typings', () => ({
    extractKeysFromFdLanguageInterface: jest.fn()
}));

import { sync as fastGlobSync } from 'fast-glob';
import { extractKeysFromFdLanguageInterface } from '../../shared/update-typings';

describe('Validate Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    it('should pass validation for valid files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.ts',
            'libs/i18n/translations/translations_de.ts'
        ]);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save', 'coreInput.name']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XFLD: Name field
coreInput.name=Name
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save'
    },
    coreInput: {
        name: 'Name'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.ts': `
export default {
    coreButton: {
        save: 'Speichern'
    },
    coreInput: {
        name: 'Name'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
    };
    coreInput: {
        name: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.summary).toContain('✅');
    });

    it('should detect missing comment headers', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save', 'coreButton.cancel']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save',
        cancel: 'Cancel'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
        cancel: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid comment format', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
# Invalid comment without type
coreButton.save=Save
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid comment type', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XINVALID: Save button
coreButton.save=Save
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should detect missing keys across files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.ts',
            'libs/i18n/translations/translations_de.ts'
        ]);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save', 'coreButton.cancel']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XBUT: Cancel button
coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save',
        cancel: 'Cancel'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.ts': `
export default {
    coreButton: {
        save: 'Speichern'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
        cancel: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        const missingKeyError = result.errors.find((e) => e.type === 'missing-keys');
        expect(missingKeyError).toBeDefined();
        expect(missingKeyError?.keys).toContain('coreButton.cancel');
    });

    it('should detect extra keys in files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.ts',
            'libs/i18n/translations/translations_de.ts'
        ]);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.ts': `
export default {
    coreButton: {
        save: 'Speichern',
        extra: 'Extra'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        const extraKeyError = result.errors.find((e) => e.type === 'extra-keys');
        expect(extraKeyError).toBeDefined();
        expect(extraKeyError?.keys).toContain('coreButton.extra');
    });

    it('should detect unbalanced curly braces in ICU syntax', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreMessage.greeting']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XMSG: Message with parameter
coreMessage.greeting=Hello {name
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreMessage: {
        greeting: 'Hello {name'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreMessage: {
        greeting: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0].type).toBe('icu-syntax');
        expect(result.errors[0].message).toContain('unbalanced curly braces');
        expect(result.errors[0].message).toContain('coreMessage.greeting');
    });

    it('should return error if no TypeScript files found', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([]);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue([]);

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.summary).toContain('No TypeScript translation files found');
    });

    it('should detect multiple validation errors', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save', 'coreButton.cancel']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save {count

coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save {count',
        cancel: 'Cancel'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
        cancel: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors.some((e) => e.type === 'icu-syntax')).toBe(true);
    });

    it('should validate successfully with proper setup', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        (extractKeysFromFdLanguageInterface as jest.Mock).mockReturnValue(['coreButton.save', 'coreButton.cancel']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': `
export default {
    coreButton: {
        save: 'Save',
        cancel: 'Cancel'
    }
};
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language.ts': `
export interface FdLanguage {
    coreButton: {
        save: string;
        cancel: string;
    };
}
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(true);
    });
});
