/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pc from 'picocolors';
import { Logger, copyFolder, updatePackageJsonProjectName } from '../utils/index.js';

const CONTENT_BLOCK_PREFIX = 'content-block-';

export const createNewContentBlock = (contentBlockName: string, template = 'tailwind'): void => {
    Logger.info('Creating the content block...');

    const blockPathInBlue = pc.blue(`./${contentBlockName}`);
    Logger.info(`Scaffholding content block in ${blockPathInBlue}...`);

    const templateDir = resolve(fileURLToPath(import.meta.url), `../../templates/${CONTENT_BLOCK_PREFIX}${template}`);
    copyFolder(templateDir, contentBlockName, { exclude: ['node_modules'] });

    updatePackageJsonProjectName(contentBlockName);

    Logger.defaultInfo(`\n${Logger.spacer(11)}You can now access the project and install dependencies.`);
    const blockNameInBlue = pc.blue(`./${contentBlockName}`);
    Logger.defaultInfo(`${Logger.spacer(4)}cd ${blockNameInBlue}`);
    Logger.defaultInfo(`${Logger.spacer(4)}npm i`);
    Logger.defaultInfo(`${Logger.spacer(4)}npm run serve`);

    Logger.defaultInfo(`\n${Logger.spacer(11)}Happy hacking!`);
};
