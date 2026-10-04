# Changelog

## v1.3.0

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v1.2.0...v1.3.0)

### 🚀 Enhancements

- **composables:** Add `usePageQuery` composable with tests ([766f650](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/766f650))
- **components:** Add `BaseFooter` component with tests ([a7df2ce](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/a7df2ce))
- **error-page:** Add error page component with tests ([a084bf9](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/a084bf9))
- **composables:** Add  composable with tests ([8691416](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/8691416))

### 🩹 Fixes

- **ui:** Improve link styles in base navigation ([55d00bf](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/55d00bf))
- **error-page:** Adjust styles for status code and message ([f70e770](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/f70e770))

### 🏡 Chore

- **release:** Add missing commits to v1.2.0 changelog ([24a9421](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/24a9421))
- **git:** Add commitlint commit-msg hook ([5abd912](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/5abd912))
- **commitlint:** Convert config to TypeScript ([2facf1b](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/2facf1b))
- **git:** Run lint-staged on server and shared ([930ad41](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/930ad41))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v1.2.0

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v1.1.0...v1.2.0)

### 🚀 Enhancements

- **locations:** Add locations feature with components, pages, and tests ([5bf3cd3](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/5bf3cd3))
- **docs:** Add nuxt-ui skills ([317c45e](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/317c45e))
- **components:** Update menu nav component ([6886630](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/6886630))
- **components:** Add icons to base navigation menu ([10fa488](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/10fa488))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v1.1.0

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v1.0.0...v1.1.0)

### 🚀 Enhancements

- **characters:** Improve error handling and add clear search option ([1b7c42b](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/1b7c42b))
- **mcp:** Add Playwright MCP server configuration ([fae95d3](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/fae95d3))

### 💅 Refactors

- **utils:** Ensure unique random number generation ([5da7735](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/5da7735))
- **characters:** Update search functionality ([686865a](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/686865a))

### 📖 Documentation

- Add CLAUDE.md with development and architectural guidelines ([743fa83](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/743fa83))

### ✅ Tests

- **utils:** Add unit tests for validation, random numbers, and resource URL ([6a47a9a](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/6a47a9a))
- **repositories:** Add unit tests for CharactersRepository and EpisodesRepository ([10d5e11](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/10d5e11))
- **composables:** Add unit tests for `useRequiredAsyncData` ([4b2898e](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/4b2898e))
- **utils:** Add unit tests for `upstream-api` ([d4a6e8c](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/d4a6e8c))
- **components:** Add unit tests for CharacterCard, EpisodeCard, and LiveIndicator ([bc54119](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/bc54119))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v1.0.0

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v0.0.4...v1.0.0)

### 🚀 Enhancements

- **config:** Enable TypeScript type checking and typed pages ([b39a3f8](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/b39a3f8))
- **config:** Optimize Vite dependencies ([30c3c42](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/30c3c42))
- **webauthn:** Add WebAuthn registration and verification ([80e7869](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/80e7869))
- **webauthn:** Improve registration feedback and add authentication button ([536f250](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/536f250))
- **episode:** Display episode details and characters on episode view ([4b3daac](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/4b3daac))
- **api:** Add cached handler for Rick and Morty API requests ([c9187fc](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/c9187fc))
- Enhance data fetching and validation ([4711d79](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/4711d79))
- **ui:** Introduce reusable BaseBackLink component ([3b58eba](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3b58eba))
- **vitest:** Suppress experimental Suspense warning in console ([94db518](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/94db518))

### 🩹 Fixes

- **types:** Add explicit type annotations for route params ([12034eb](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/12034eb))

### 💅 Refactors

- **webauthn:** Rename functions and simplify composable usage ([2caa1c2](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/2caa1c2))
- **webauthn:** Remove WebAuthn-related code ([21f3343](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/21f3343))
- **seo:** Remove unused Twitter meta properties ([5e88441](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/5e88441))
- **ui:** Improve `episode-card` design and accessibility ([417f0a1](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/417f0a1))
- **ui:** Enhance `episode-card` styles and introduce dark mode support ([441e401](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/441e401))
- **seo:** Remove unused `ogImage` property from `episodes.vue` ([4eb8c6f](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/4eb8c6f))
- **ui:** Improve character and episode card responsiveness ([65408b6](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/65408b6))
- **ui:** Replace card implementations with reusable BaseMediaCard ([cbb072f](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/cbb072f))
- Update fetch library and rename utility for clarity ([25bc2ab](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/25bc2ab))
- **ui:** Merge hero title and image components into hero section ([cfc0475](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/cfc0475))
- Simplify component imports and adjust type paths ([2b4a7a8](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/2b4a7a8))

### 🏡 Chore

- **dependencies:** Update pnpm-lock.yaml with dependency upgrades ([98d62a7](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/98d62a7))
- **dependencies:** Update pnpm-lock.yaml with new dependencies ([bda02e5](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/bda02e5))
- **dependencies:** Remove WebAuthn and related unused dependencies ([07bb0a8](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/07bb0a8))
- **dependencies:** Update dependencies and pnpm workspace configs ([8656165](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/8656165))
- **dependencies:** Update pnpm workspace dependencies ([ef25aee](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/ef25aee))
- **dependencies:** Update dependencies in pnpm-lock.yaml ([2cb5d24](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/2cb5d24))
- **dependencies:** Update @nuxt/test-utils, @vitest/coverage-v8 ([9e11041](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/9e11041))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v0.0.4

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v0.0.3...v0.0.4)

### 🚀 Enhancements

- **repositories:** Refactor characters repository and add episodes repository ([0bc6d54](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/0bc6d54))
- **episodes:** Fetch episodes data and update template ([ef35e54](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/ef35e54))
- **episodes:** Add SEO meta tags to episodes page ([41860a0](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/41860a0))
- **layout:** Introduce reusable ColumnLayout component ([c37ff09](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/c37ff09))
- **layout:** Add reusable GridLayout component ([b21c39a](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/b21c39a))
- **episodes:** Implement paginated episodes fetching and update UI ([5879ed2](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/5879ed2))
- **episodes:** Enhance card hover effects ([c78efc2](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/c78efc2))
- **episodes:** Add episode detail page and enhance episode card reusability ([7dca824](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/7dca824))
- **tests:** Add unit tests for base components ([3806fa7](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3806fa7))
- **tests:** Add unit test for BaseColorModeBtn ([31da580](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/31da580))

### 🩹 Fixes

- **episodes:** Correct episode-card closing tag in episodes.vue ([d729c3c](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/d729c3c))
- **tests:** Update setup file path and add logo data attribute ([5c8d5e1](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/5c8d5e1))

### 🏡 Chore

- **dependencies:** Remove unused simple-icons package ([0da6841](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/0da6841))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v0.0.3

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- **characters:** Refactor character card layout and add new components ([9c89572](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/9c89572))
- **layout:** Improve BaseHeader structure and update dependencies ([3d7c14b](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3d7c14b))
- **characters:** Enhance character pages and improve styling ([af88dbc](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/af88dbc))
- **seo:** Update metadata and enhance pagination functionality ([eac2d66](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/eac2d66))
- **characters:** Add search functionality and improve theming ([37aa380](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/37aa380))
- **characters:** Enhance API error handling and refactor characters logic ([83cd13e](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/83cd13e))
- **characters:** Trim search input and improve conditional rendering ([d28078d](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/d28078d))
- **characters:** Add dynamic character detail page ([a36e0d5](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/a36e0d5))
- **characters:** Wrap pagination in client-only condition ([97fdfc9](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/97fdfc9))
- **testing:** Add Vitest setup with configuration and BaseHeader tests ([1082af7](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/1082af7))

### 💅 Refactors

- **components:** Standardize component casing in templates ([3cd2c4a](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3cd2c4a))

### 🏡 Chore

- **docs:** Update README ([3e8247c](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3e8247c))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v0.0.2

[compare changes](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- **characters:** Add CharactersRepository and random character fetching ([b18e596](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/b18e596))
- **layout:** Enhance theming and add LiveIndicator component ([aff191e](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/aff191e))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

## v0.0.1


### 🚀 Enhancements

- **icons:** Add hero and logo SVG assets ([0bd9aaa](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/0bd9aaa))
- **layout:** Update app structure and index page ([b2bfeb1](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/b2bfeb1))
- **formatting:** Integrate Prettier with Tailwind CSS plugin ([3f40686](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3f40686))
- **tooling:** Add Husky and lint-staged for pre-commit hooks ([164b502](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/164b502))
- **formatting:** Update Prettier configuration ([41aac4b](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/41aac4b))
- **tooling:** Replace pre-commit script with type checking ([eee4e55](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/eee4e55))
- **layout:** Add BaseHeader and update app structure ([78c808d](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/78c808d))
- **layout:** Add BaseNav and pages for Characters and Episodes ([9b353ca](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/9b353ca))
- **layout:** Add BaseNav and pages for Characters and Episodes ([3588976](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/3588976))
- **layout:** Enhance BaseHeader with dark mode ([01aef18](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/01aef18))
- **layout:** Refactor BaseHeader and improve theming ([8fe5793](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/8fe5793))
- **hero:** Add HeroSection component with title and image ([61e00cb](https://github.com/AndreiDetenkov/nuxt-rick-and-morty/commit/61e00cb))

### ❤️ Contributors

- Andrei.detenkov <a.detenkov@gmail.com>

