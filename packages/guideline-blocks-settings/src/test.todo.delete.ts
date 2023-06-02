/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingConfig, SettingValue, defineSettings } from './index';

/*******************************************************************************
 * Temporary File, delete before PR
 ******************************************************************************/

// Setup
const testSettings = defineSettings({
    main: [
        {
            id: 'color',
            type: 'colorInput',
        },
    ],
    layout: [
        {
            id: 'input',
            type: 'input',
        },
    ],
    basics: [
        {
            id: 'dropdown',
            type: 'dropdown',
            choices: [{ value: 'foo' }],
        },
    ],
});

// Color
export type confColor = SettingConfig<(typeof testSettings.main)[0]>;
export type valueColor = SettingValue<(typeof testSettings.main)[0]>;
// @ts-expect-error Test Invalid
export const invalidColor: valueColor = 777;
export const validColor: valueColor = { r: 77, g: 77, b: 77 };

// Normal Input

export type confInput = SettingConfig<(typeof testSettings.layout)[0]>;
export type valueInput = SettingValue<(typeof testSettings.layout)[0]>;
// @ts-expect-error Test Invalid
export const invalidInput: valueInput = 777;
export const validInput: valueInput = 'string';

// Dropdown
export type confDropdown = SettingConfig<(typeof testSettings.basics)[0]>;
export type valueDropdown = SettingValue<(typeof testSettings.basics)[0]>;
// @ts-expect-error Test Invalid
export const invalidDropdown: valueDropdown = {};
export const validDropdown: valueDropdown[] = ['string', 777];
