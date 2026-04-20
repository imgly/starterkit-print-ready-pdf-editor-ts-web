/**
 * CE.SDK Print-Ready PDF Editor Starterkit - Main Entry Point
 *
 * A design editor optimized for creating print-ready PDF exports with
 * bleed, crop marks, and CMYK color support.
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import { initPrintReadyPdfEditor } from './imgly';
import { resolveAssetPath } from './imgly/resolveAssetPath';

// ============================================================================
// Configuration
// ============================================================================

const config = {
  userId: 'starterkit-print-ready-pdf-editor-user'

  // Local assets
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Initialize Print-Ready PDF Editor
// ============================================================================

CreativeEditorSDK.create('#cesdk_container', config)
  .then(async (cesdk) => {
    // Debug access (remove in production)
    (window as any).cesdk = cesdk;

    await initPrintReadyPdfEditor(cesdk);

    // ============================================================================
    // Scene Loading
    // ============================================================================

    // Load the example scene for print-ready PDF export
    await cesdk.loadFromURL(resolveAssetPath('/assets/example-1.scene'));
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize CE.SDK:', error);
  });
