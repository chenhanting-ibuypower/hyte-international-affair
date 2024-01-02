# My Translation App

This project is a multilingual translation enhancement application with a focus on brand-specific terminology. It uses a fine-tuning feedback system to enhance translation accuracy. The application supports an array of language codes including 'en-US', 'en-GB', 'es', 'de', 'fr', 'pl', 'it', 'nl', 'ko', 'ja', 'zh-TW', 'zh-CN', and 'pt'.

## Features

- Translate original English content into the ten specified languages.
- Re-translate this content back into Chinese.
- Compare the back-translated Chinese content with the original English to ensure that the meaning remains consistent and accurate.
- An iterative process to continuously improve the translation model.
- A feedback system based on an API, specifically designed for translating brand-specific terminology.

## Project Structure

The project has the following structure:

```
my-translation-app
├── src
│   ├── components
│   │   ├── FeedbackTable.tsx
│   │   ├── AddButton.tsx
│   │   └── Pagination.tsx
│   ├── pages
│   │   ├── api
│   │   │   └── translate.ts
│   │   └── index.tsx
│   ├── services
│   │   └── translationService.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── backTranslationCheck.ts
├── public
│   └── locales
│       ├── en
│       ├── es
│       ├── de
│       ├── fr
│       ├── pl
│       ├── it
│       ├── nl
│       ├── ko
│       ├── ja
│       ├── zh-TW
│       ├── zh-CN
│       └── pt
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the project:

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.