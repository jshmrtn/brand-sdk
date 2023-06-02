/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';

import type { IconEnum } from '.';
import type { BaseBlock, ValueOrPromisedValue } from './base';

export type Choice<T extends string | number = string | number> = {
    /**
     * The label of the item.
     */
    label?: string | number;

    /**
     * The icon of the item.
     *
     * The full list of icons can be found here {@link https://github.com/Frontify/fondue/blob/beta/src/foundation/Icon/IconEnum.ts}
     */
    icon?: IconEnum | keyof typeof IconEnum | ReactElement;

    /**
     * The value of the item.
     */
    value: T;
};

export type ChoicesType<AppBridge, T extends string | number = string | number> = {
    /**
     * The list of available choices in the setting.
     */
    choices: ValueOrPromisedValue<AppBridge, Choice<T>[]>;
} & BaseBlock<AppBridge, T>;
