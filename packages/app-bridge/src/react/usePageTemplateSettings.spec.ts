/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAppBridgeThemeStub } from '../tests';
import { usePageTemplateSettings } from './usePageTemplateSettings';

const DOCUMENT_ID = 3462;
const PAGE_SETTINGS = {
    myCustomSetting: 123,
};

describe('usePageTemplateSettings', () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    const loadUsePageTemplateSettings = async (
        pageTemplateSettings: Record<string, unknown>,
        template: Parameters<typeof usePageTemplateSettings>[1],
        documentId?: Parameters<typeof usePageTemplateSettings>[2],
    ) => {
        const appBridgeStub = getAppBridgeThemeStub({
            pageTemplateSettings,
        });

        const { result } = renderHook(() => usePageTemplateSettings(appBridgeStub, template, documentId));
        return { result, appBridgeStub };
    };

    it('returns the page settings for cover page', async () => {
        const { result } = await loadUsePageTemplateSettings(PAGE_SETTINGS, 'cover');

        expect(result.current.isLoading).toEqual(true);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual(PAGE_SETTINGS);
        });
    });

    it('updates the page settings for cover page', async () => {
        const { result } = await loadUsePageTemplateSettings(PAGE_SETTINGS, 'cover');

        expect(result.current.isLoading).toEqual(true);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual(PAGE_SETTINGS);
        });

        await result.current.updatePageTemplateSettings({ myCustomSetting: 456 });
        expect(result.current.isLoading).toEqual(false);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual({ ...PAGE_SETTINGS, myCustomSetting: 456 });
        });
    });

    it('returns the page settings for document page', async () => {
        const { result } = await loadUsePageTemplateSettings(PAGE_SETTINGS, 'documentPage', DOCUMENT_ID);

        expect(result.current.isLoading).toEqual(true);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual(PAGE_SETTINGS);
        });
    });

    it('returns `null` for document page if no document page id passed', async () => {
        const { result } = await loadUsePageTemplateSettings(PAGE_SETTINGS, 'documentPage');

        expect(result.current.isLoading).toEqual(false);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual(null);
        });

        expect(console.error).toHaveBeenCalledOnce();
    });

    it('returns the page settings for library page', async () => {
        const { result } = await loadUsePageTemplateSettings(PAGE_SETTINGS, 'library', DOCUMENT_ID);

        expect(result.current.isLoading).toEqual(true);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual(PAGE_SETTINGS);
        });
    });

    it('returns `null` for library page if no document id passed', async () => {
        const { result } = await loadUsePageTemplateSettings(PAGE_SETTINGS, 'library');

        expect(result.current.isLoading).toEqual(false);

        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.pageTemplateSettings).toEqual(null);
        });

        expect(console.error).toHaveBeenCalledOnce();
    });
});
