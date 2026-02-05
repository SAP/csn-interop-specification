// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CSN Interop Specification",
  tagline: "Specification for interoperable CSN as import / export format.",
  url: "https://sap.github.io",
  baseUrl: "/csn-interop-specification",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  onDuplicateRoutes: "throw",
  staticDirectories: ["static"],
  favicon: "img/favicon.ico",
  organizationName: "SAP", // Usually your GitHub org/user name.
  projectName: "csn-interop-specification", // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
      onBrokenMarkdownImages: "throw",
    },
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          routeBasePath: "/",
        },
        blog: false, // disable the blog plugin
        theme: {
          customCss: require.resolve("./static/css/custom.css"),
        },
      }),
    ],
  ],

  scripts: ["/csn-interop-specification/js/custom.js"],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/annotations",
            to: "/spec-v1/extensions",
          },
          {
            from: "/annotations/aggregation",
            to: "/spec-v1/extensions/aggregation",
          },
          {
            from: "/annotations/analytics-details",
            to: "/spec-v1/extensions/analytics-details",
          },
          {
            from: "/annotations/consumption",
            to: "/spec-v1/extensions/consumption",
          },
          {
            from: "/annotations/enduser-text",
            to: "/spec-v1/extensions/end-user-text",
          },
          {
            from: "/spec-v1/extensions/enduser-text",
            to: "/spec-v1/extensions/end-user-text",
          },
          {
            from: "/annotations/entity-relationship",
            to: "/spec-v1/extensions/entity-relationship",
          },
          {
            from: "/annotations/object-model",
            to: "/spec-v1/extensions/object-model",
          },
          {
            from: "/annotations/objectmodel",
            to: "/spec-v1/extensions/object-model",
          },
          {
            from: "/annotations/odm",
            to: "/spec-v1/extensions/odm",
          },
          {
            from: "/annotations/personal-data",
            to: "/spec-v1/extensions/personal-data",
          },
          {
            from: "/annotations/semantics",
            to: "/spec-v1/extensions/semantics",
          },
        ],
      },
    ],
  ],

  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        searchResultLimits: 10,
        hashed: true,
        indexBlog: false,
        indexPages: false,
        language: ["en"],
        docsRouteBasePath: "/",
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      prism: {
        theme: prismThemes.nightOwl,
      },
      mermaid: {
        theme: { light: "neutral", dark: "forest" },
      },
      navbar: {
        title: "",
        logo: {
          alt: "CSN Interop Specification",
          src: "img/logo.png#1",
        },
        items: [
          {
            label: "Overview",
            to: "/",
          },
          {
            label: "Primer",
            to: "/primer",
          },
          {
            label: "Interface Documentation",
            to: "/spec-v1/csn-interop-effective",
          },
          {
            label: "Tools",
            to: "/tools",
          },
          {
            label: "FAQ",
            to: "/faq",
          },
          {
            href: "https://github.com/SAP/csn-interop-specification",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            label: "GitHub Repository",
            to: "https://github.com/SAP/csn-interop-specification",
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SAP SE. Made available under Apache License 2.0.\n\n This site is hosted by GitHub Pages. Please see the GitHub Privacy Statement for any information how GitHub processes your personal data.`,
      },
    }),
};

module.exports = config;
