<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15RimoTFcZF8iX9bhfaajG2s5MWPLqkAQ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Repository layout

Application source lives in `src/`, with the existing component and service folders preserved. Run the existing commands from the repository root. HTML entry points, build configuration, environment files, and deployment entry points remain at the root.

### Moved files

| Previous path | Current path |
| --- | --- |
| `App.tsx` | [`src/App.tsx`](src/App.tsx) |
| `components/BrainrotCard.tsx` | [`src/components/BrainrotCard.tsx`](src/components/BrainrotCard.tsx) |
| `components/ConfirmationModal.tsx` | [`src/components/ConfirmationModal.tsx`](src/components/ConfirmationModal.tsx) |
| `components/Header.tsx` | [`src/components/Header.tsx`](src/components/Header.tsx) |
| `components/StyledButton.tsx` | [`src/components/StyledButton.tsx`](src/components/StyledButton.tsx) |
| `components/icons/BrainIcon.tsx` | [`src/components/icons/BrainIcon.tsx`](src/components/icons/BrainIcon.tsx) |
| `components/icons/CartIcon.tsx` | [`src/components/icons/CartIcon.tsx`](src/components/icons/CartIcon.tsx) |
| `components/icons/CheckIcon.tsx` | [`src/components/icons/CheckIcon.tsx`](src/components/icons/CheckIcon.tsx) |
| `components/icons/TrashIcon.tsx` | [`src/components/icons/TrashIcon.tsx`](src/components/icons/TrashIcon.tsx) |
| `constants.ts` | [`src/constants.ts`](src/constants.ts) |
| `index.tsx` | [`src/index.tsx`](src/index.tsx) |
| `translations.ts` | [`src/translations.ts`](src/translations.ts) |
| `types.ts` | [`src/types.ts`](src/types.ts) |
| `views/CartView.tsx` | [`src/views/CartView.tsx`](src/views/CartView.tsx) |
| `views/MainView.tsx` | [`src/views/MainView.tsx`](src/views/MainView.tsx) |
