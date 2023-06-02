/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { SettingBlock, SettingValue } from './blocks';

export type Bundle<AppBridge> = {
    /**
     * A function which allows you to get the block value of a given id.
     * @param id Represent the setting id.
     * @returns The value of the setting.
     */
    getBlock: (id: string) => { value?: SettingValue<AppBridge> } | null;

    /**
     * A function that returns an instance of the App Bridge.
     */
    getAppBridge: () => AppBridge;

    /**
     * A function that allows you to programmatically set the value for a block by its id.
     * @param id Represents the setting id.
     * @param value The new value to set.
     */
    setBlockValue: (id: string, value: SettingBlock<AppBridge>['value']) => void;
};
