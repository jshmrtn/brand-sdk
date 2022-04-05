import minimist from 'minimist';
import buildOptions from 'minimist-options';
import { join } from 'path';
import { exit } from 'process';
import { createNewContentBlock } from './commands/createContentBlock';
import { createContentBlockDeployment } from './commands/deployContentBlock';
import { loginUser } from './commands/login';
import { logoutUser } from './commands/logout';
import { createContentBlockDevelopmentServer } from './commands/serveContentBlock';
import { Bundler } from './utils/compile';
import Logger from './utils/logger';
import { printLogo } from './utils/logo';
import { getValidInstanceUrl } from './utils/url';

enum Argument {
    ContentBlockPath = 'contentBlockPath',
    DryRun = 'dryRun',
    Experimental = 'experimental',
    EntryPath = 'entryPath',
    Minify = 'minify',
    NoVerify = 'noVerify',
    Port = 'port',
    OutDir = 'outDir',
    SettingsPath = 'settingsPath',
}

const options = buildOptions({
    [Argument.ContentBlockPath]: {
        type: 'string',
        default: '.',
    },
    [Argument.DryRun]: {
        type: 'boolean',
        default: false,
    },
    [Argument.Experimental]: {
        type: 'boolean',
        default: false,
    },
    [Argument.EntryPath]: {
        type: 'string',
        alias: 'e',
        default: join('src', 'index.tsx'),
    },
    [Argument.Minify]: {
        type: 'boolean',
        alias: 'm',
        default: false,
    },
    [Argument.NoVerify]: {
        type: 'boolean',
        default: false,
    },
    [Argument.OutDir]: {
        type: 'string',
        alias: 'o',
        default: 'dist',
    },
    [Argument.Port]: {
        type: 'number',
        alias: 'p',
        default: 5600,
    },
    [Argument.SettingsPath]: {
        type: 'string',
        alias: 'e',
        default: join('src', 'settings.ts'),
    },
});
const parseArgs = minimist(process.argv.slice(2), options);

printLogo();

(async () => {
    switch (parseArgs._[0]) {
        case 'block':
            const bundler = parseArgs[Argument.Experimental] ? Bundler.Webpack : Bundler.Rollup;

            switch (parseArgs._[1]) {
                case 'create':
                    const blockName = parseArgs._[2] || '';
                    createNewContentBlock(blockName);
                    break;

                case 'serve':
                    createContentBlockDevelopmentServer(
                        parseArgs[Argument.ContentBlockPath],
                        [parseArgs[Argument.EntryPath], parseArgs[Argument.SettingsPath]],
                        parseArgs[Argument.Port],
                        {
                            minify: parseArgs[Argument.Minify],
                            bundler,
                        }
                    );
                    break;

                case 'deploy':
                    const instanceUrl = getValidInstanceUrl(parseArgs.instance || process.env.INSTANCE_URL);
                    await createContentBlockDeployment(
                        instanceUrl,
                        parseArgs[Argument.ContentBlockPath],
                        [parseArgs[Argument.EntryPath], parseArgs[Argument.SettingsPath]],
                        parseArgs[Argument.OutDir],
                        {
                            dryRun: parseArgs[Argument.DryRun],
                            noVerify: parseArgs[Argument.NoVerify],
                            openInBrowser: parseArgs.open,
                            bundler,
                        }
                    );
                    break;
            }
            break;

        case 'login':
            const instanceUrl = getValidInstanceUrl(parseArgs.instance || process.env.INSTANCE_URL);
            await loginUser(instanceUrl, parseArgs[Argument.Port]);
            break;

        case 'logout':
            logoutUser();
            exit(1);

        default:
            Logger.error('This command is not yet handled');
            exit(1);
    }
})();
