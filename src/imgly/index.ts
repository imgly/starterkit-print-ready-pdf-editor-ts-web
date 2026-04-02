/**
 * CE.SDK Print-Ready PDF Editor - Initialization Module
 *
 * This module provides the main entry point for initializing the print-ready PDF editor.
 * Import and call `initPrintReadyPdfEditor()` to configure a CE.SDK instance for
 * print-ready PDF export with PDF/X-3 compliance, CMYK color profiles, and bleed margins.
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import {
  BlurAssetSource,
  ColorPaletteAssetSource,
  CropPresetsAssetSource,
  DemoAssetSources,
  EffectsAssetSource,
  FiltersAssetSource,
  PagePresetsAssetSource,
  StickerAssetSource,
  TextAssetSource,
  TextComponentAssetSource,
  TypefaceAssetSource,
  UploadAssetSources,
  VectorShapeAssetSource
} from '@cesdk/cesdk-js/plugins';

// Configuration and plugins
import { PrintReadyPdfEditorConfig } from './config/plugin';
import { setupBackgroundRemovalPlugin } from './plugins/background-removal';
import { ExportPrintReadyPDFPanelPlugin } from './plugins/export-print-ready-pdf';

// Re-export for external use
export { PrintReadyPdfEditorConfig } from './config/plugin';
export { setupBackgroundRemovalPlugin } from './plugins/background-removal';
export { ExportPrintReadyPDFPanelPlugin } from './plugins/export-print-ready-pdf';

/**
 * Initialize the CE.SDK Print-Ready PDF Editor with a complete configuration.
 *
 * This function configures a CE.SDK instance with:
 * - Print-ready PDF editor UI configuration
 * - PDF/X-3 export panel with bleed margins and color profiles
 * - Background removal plugin
 * - Asset source plugins (templates, images, shapes, text, etc.)
 * - Actions dropdown in navigation bar
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 */
export async function initPrintReadyPdfEditor(cesdk: CreativeEditorSDK) {
  // ============================================================================
  // Configuration Plugin
  // ============================================================================

  // Add the print-ready PDF editor configuration plugin
  // This sets up the UI, features, settings, and i18n for design editing
  await cesdk.addPlugin(new PrintReadyPdfEditorConfig());

  // ============================================================================
  // Export Print-Ready PDF Panel Plugin
  // ============================================================================

  // Add the custom export panel for print-ready PDFs
  // This provides PDF/X-3 export with color profiles and bleed margins
  await cesdk.addPlugin(ExportPrintReadyPDFPanelPlugin());

  // ============================================================================
  // Theme and Locale
  // ============================================================================

  // Configure appearance: 'light' | 'dark' | 'system'
  // cesdk.setTheme('dark');
  // cesdk.setLocale('en');

  // ============================================================================
  // Background Removal Plugin
  // ============================================================================

  // Setup AI-powered background removal
  // Requires: npm install @imgly/background-removal onnxruntime-web
  setupBackgroundRemovalPlugin(cesdk);

  // ============================================================================
  // Asset Source Plugins
  // ============================================================================

  // Asset source plugins provide built-in asset libraries

  // Blur presets for blur effects
  await cesdk.addPlugin(new BlurAssetSource());

  // Color palettes for design
  await cesdk.addPlugin(new ColorPaletteAssetSource());

  // Crop presets (aspect ratios)
  await cesdk.addPlugin(new CropPresetsAssetSource());

  // Local upload sources (images)
  await cesdk.addPlugin(
    new UploadAssetSources({
      include: ['ly.img.image.upload']
    })
  );

  // Demo assets (templates, images)
  await cesdk.addPlugin(
    new DemoAssetSources({
      include: [
        'ly.img.templates.blank.*',
        'ly.img.templates.presentation.*',
        'ly.img.templates.print.*',
        'ly.img.templates.social.*',
        'ly.img.image.*'
      ]
    })
  );

  // Visual effects (adjustments, vignette, etc.)
  await cesdk.addPlugin(new EffectsAssetSource());

  // Photo filters (LUT, duotone)
  await cesdk.addPlugin(new FiltersAssetSource());

  // Page format presets (A4, Letter, social media sizes)
  await cesdk.addPlugin(new PagePresetsAssetSource());

  // Sticker assets
  await cesdk.addPlugin(new StickerAssetSource());

  // Text presets (headlines, body text styles)
  await cesdk.addPlugin(new TextAssetSource());

  // Text components (pre-designed text layouts)
  await cesdk.addPlugin(new TextComponentAssetSource());

  // Typeface/font assets
  await cesdk.addPlugin(new TypefaceAssetSource());

  // Vector shapes (rectangles, circles, arrows, etc.)
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // ============================================================================
  // Navigation Bar Configuration
  // ============================================================================

  // Add the print-ready PDF export button to the navigation bar
  cesdk.ui.insertOrderComponent(
    { in: 'ly.img.navigation.bar', position: 'end' },
    'ly.img.export-print-ready-pdf.navigationBar'
  );

  // ============================================================================
  // Scene Loading
  // ============================================================================

  // Load the example scene for print-ready PDF export
  await cesdk.loadFromURL('https://img.ly/showcases/cesdk/example-1.scene');
}
