<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# transaction-reconciliation-frontend -->

Problem Statement:

Building a backend service and a simple frontend interface to reconcile and
report discrepancies in financial transaction records between two systems: SourceSystemA
and SourceSystemB. Each system provides daily CSV files (potentially with 1 million+ rows)
that list transaction IDs, timestamps, amounts, currencies, and status (e.g., SUCCESS,
FAILED).

```
Goals:
1. Load and parse both files efficiently.
2. Detect and return:
○ Transactions present in A but missing in B (and vice versa)
○ Amount mismatches
○ Status mismatches
3. Expose the results via a REST API.
4. Build a simple dashboard that allows uploading the CSVs and viewing a summary report.

```

Expected Deliverables:
● Backend service (preferably using Node.js/NestJS or Python/Django)
● Efficient file handling (streaming/parsing large data)
● REST endpoint: /reconcile
● Frontend (React/Next.js or Vue.js) to upload CSVs and display results
● README with setup instructions

```
Evaluation Criteria:
● Efficiency and memory use when handling large files
● Use of appropriate data structures (hash maps, sets)
● Clean RESTful architecture and code structure
● UI/UX of the dashboard
● Error handling and validations

```

Bonus:
● Implement pagination or virtual scrolling for results
● Use Web Workers or threading to handle large file parsing in the frontend
