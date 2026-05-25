/**
 * Tailwind CSS Configuration
 * Per get-design.md, AC-1.1, AC-1.2
 */

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            // ========================================================================
            // COLOR SYSTEM (AC-1.1, get-design.md)
            // ========================================================================
            colors: {
                // Brand Core
                "prime-black": "#1A1A1A",
                "prime-black-soft": "#242424",
                "prime-black-muted": "#333333",
                "accent-gold": "#C9A961",
                "accent-gold-hover": "#B9984F",
                "accent-gold-soft": "#F3E8C8",
                "accent-red": "#B33A3A",
                "accent-red-hover": "#9F3030",
                "accent-red-soft": "#F7E4E4",
                "neutral-white": "#FFFFFF",
                "soft-gray": "#F5F5F5",

                // Surfaces
                "surface-primary": "#FFFFFF",
                "surface-secondary": "#F5F5F5",
                "surface-card": "#FFFFFF",
                "surface-muted": "#FAFAFA",

                // Borders
                "border-default": "#E5E5E5",
                "border-strong": "#D4D4D4",

                // Text
                "text-primary": "#1A1A1A",
                "text-secondary": "#525252",
                "text-muted": "#737373",
                "text-disabled": "#A3A3A3",
                "text-on-dark": "#FFFFFF",
                "text-on-gold": "#1A1A1A",

                // Status
                "status-success": "#2F855A",
                "status-success-soft": "#E6F4EC",
                "status-warning": "#C9A961",
                "status-warning-soft": "#F3E8C8",
                "status-purple": "#7C3AED",
                "status-purple-soft": "#EFE7FF",
                "status-info": "#2563EB",
                "status-info-soft": "#E8F0FF",
                scrim: "#000000",
            },

            // ========================================================================
            // TYPOGRAPHY (get-design.md)
            // ========================================================================
            fontSize: {
                "display-xl": ["40px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "0" }],
                "display-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
                "display-md": ["24px", { lineHeight: "1.25", fontWeight: "700" }],
                "title-lg": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
                "title-md": ["18px", { lineHeight: "1.35", fontWeight: "600" }],
                "title-sm": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
                "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
                "body-md": ["16px", { lineHeight: "1.55", fontWeight: "400" }],
                "body-sm": ["14px", { lineHeight: "1.45", fontWeight: "400" }],
                caption: ["13px", { lineHeight: "1.35", fontWeight: "500" }],
                "caption-muted": ["13px", { lineHeight: "1.35", fontWeight: "400" }],
                micro: ["12px", { lineHeight: "1.3", fontWeight: "500" }],
                badge: ["12px", { lineHeight: "1.25", fontWeight: "600" }],
                "table-head": ["12px", { lineHeight: "1.33", fontWeight: "700", letterSpacing: "0" }],
                "table-cell": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
                "button-md": ["14px", { lineHeight: "1.4", fontWeight: "600" }],
                "button-lg": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
                "nav-link": ["14px", { lineHeight: "1.4", fontWeight: "600" }],
            },

            fontFamily: {
                sans: [
                    "var(--font-geist-sans)",
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "'Segoe UI'",
                    "sans-serif",
                ],
            },

            // ========================================================================
            // SPACING (get-design.md)
            // ========================================================================
            spacing: {
                "xxs": "4px",
                "xs": "8px",
                "sm": "12px",
                "md": "16px",
                "lg": "24px",
                "xl": "32px",
                "xxl": "48px",
                "section": "64px",
            },

            // ========================================================================
            // BORDER RADIUS (get-design.md)
            // ========================================================================
            borderRadius: {
                none: "0px",
                xs: "4px",
                sm: "6px",
                md: "8px",
                lg: "12px",
                xl: "16px",
                full: "9999px",
            },

            // ========================================================================
            // SHADOWS (get-design.md)
            // ========================================================================
            boxShadow: {
                none: "none",
                sm: "0 1px 2px rgba(0,0,0,0.06)",
                md: "0 8px 24px rgba(0,0,0,0.08)",
                lg: "0 16px 40px rgba(0,0,0,0.12)",
                "focus-gold": "0 0 0 3px rgba(201,169,97,0.28)",
            },

            // ========================================================================
            // RESPONSIVE CONTAINER (AC-1.2)
            // ========================================================================
            screens: {
                xs: "0px",
                sm: "640px",     // Mobile
                md: "1024px",    // Tablet & Desktop
                lg: "1280px",    // Desktop
                xl: "1536px",    // Wide Desktop
            },

            maxWidth: {
                container: "1280px",
                narrow: "768px",
                wide: "1440px",
            },
        },
    },

    plugins: [],
};

export default config;
