# **To-Do List for German Vocabulary Improvement Application**

A step-by-step guide to help you build the German Vocabulary Improvement Application. Each task is designed to ensure incremental progress, thorough testing, and best practices throughout the development process.

---

## **1. Set Up the Project Environment**

### **1.1 Initialize the Next.js Application**

- [ ] **Install Node.js and npm**
  Ensure you have Node.js and npm installed on your machine.

- [ ] **Create a New Next.js Project**
  Run `npx create-next-app german-vocab-app` in your terminal.

- [ ] **Navigate to Project Directory**
  `cd german-vocab-app`

### **1.2 Set Up Version Control**

- [ ] **Initialize Git Repository**
  Run `git init` in the project directory.

- [ ] **Create .gitignore File**
  Exclude unnecessary files and directories:
    - `node_modules`
    - `.next`
    - `.env`
    - `.DS_Store` (macOS)
    - `dist`

- [ ] **Make Initial Commit**
  ```
  git add .
  git commit -m "Initial commit - Set up Next.js project"
  ```

- [ ] **Create GitHub Repository**
  Create a new repository named `german-vocab-app` on GitHub.

- [ ] **Add Remote Origin and Push**
  ```
  git remote add origin https://github.com/yourusername/german-vocab-app.git
  git branch -M main
  git push -u origin main
  ```

### **1.3 Install Dependencies**

- [ ] **Install Styled-Components**
  `npm install styled-components`

- [ ] **Install Papaparse for CSV Parsing**
  `npm install papaparse`

### **1.4 Configure Styled-Components**

- [ ] **Set Up Babel Configuration**
  Install Babel plugin:
  ```
  npm install --save-dev babel-plugin-styled-components
  ```
  Create or update `.babelrc`:
  ```json
  {
    "presets": ["next/babel"],
    "plugins": [["styled-components", { "ssr": true }]]
  }
  ```

- [ ] **Configure Server-Side Rendering (SSR)**
  Create `_document.js` in `pages/` directory:
  ```jsx
  // pages/_document.js
  import Document from 'next/document';
  import { ServerStyleSheet } from 'styled-components';

  export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const sheet = new ServerStyleSheet();
      const originalRenderPage = ctx.renderPage;

      try {
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: App => props =>
              sheet.collectStyles(<App {...props} />),
          });

        const initialProps = await Document.getInitialProps(ctx);
        return {
          ...initialProps,
          styles: (
            <>
              {initialProps.styles}
              {sheet.getStyleElement()}
            </>
          ),
        };
      } finally {
        sheet.seal();
      }
    }
  }
  ```

---

## **2. Design the Application Architecture**

### **2.1 Plan Core Components**

- [ ] **WordCard Component**
    - Displays a random German noun.
    - Provides three buttons for gender selection: **der**, **die**, **das**.

- [ ] **AdjectiveQuiz Component**
    - Presents a sentence with the noun and preposition.
    - Includes dropdowns for selecting the correct article and adjective ending.
    - Provides hints for two-way prepositions indicating direction or position.

- [ ] **App Component**
    - Manages the application state.
    - Controls the flow between `WordCard` and `AdjectiveQuiz` based on user interactions.

### **2.2 Set Up Project Structure**

- [ ] **Create Components Directory**
    - Inside the `src` or root directory, create a `components` folder.

- [ ] **Organize Assets and Styles**
    - Create directories for styles (`styles/`) and data (`public/data/`).

---

## **3. Implement the WordCard Component**

### **3.1 Create the WordCard Component**

- [ ] **Set Up Functional Component**
    - Create `WordCard.js` inside the `components` directory.
    - Import `React`, `useState`, and `useEffect`.

- [ ] **Export the Component**
    - Ensure `WordCard` is exported for use in other parts of the app.

### **3.2 Display Placeholder Word**

- [ ] **Render Placeholder Word**
    - Display a hardcoded German noun (e.g., "Haus") prominently.

- [ ] **Style the Word Display**
    - Use `styled-components` to center the word and set an appropriate font size.

### **3.3 Add Gender Selection Buttons**

- [ ] **Create Gender Buttons**
    - Add three buttons labeled "der", "die", and "das" below the word.

- [ ] **Style the Buttons**
    - Use `styled-components` to style buttons uniformly.
    - Ensure buttons are easily tappable on mobile devices.

---

## **4. Load and Parse CSV Data**

### **4.1 Add nouns.csv Data File**

- [ ] **Create Data Directory**
    - Inside `public/`, create a `data/` directory.

- [ ] **Add CSV File**
    - Create `nouns.csv` with the following structure:
      ```csv
      Word,Article
      Buch,Das
      Haus,Das
      Tisch,Der
      ```
    - Expand the list with more nouns as needed.

### **4.2 Implement Data Loading**

- [ ] **Load CSV Data on Component Mount**
    - In `WordCard.js`, use `useEffect` to fetch `nouns.csv` when the component mounts.

- [ ] **Parse CSV Data**
    - Use `papaparse` to parse the CSV content.
      ```jsx
      useEffect(() => {
        fetch('/data/nouns.csv')
          .then(response => response.text())
          .then(csvData => {
            const parsedData = Papa.parse(csvData, { header: true });
            setNouns(parsedData.data);
          });
      }, []);
      ```

- [ ] **Handle Errors**
    - Implement error handling for data fetching and parsing.

### **4.3 Display Random Words**

- [ ] **Implement Random Word Selection**
    - Use `useState` to keep track of the current word.
    - Create a function to select a random word from the nouns array.

- [ ] **Avoid Consecutive Repeats**
    - Ensure the same word doesn't appear twice in a row.

- [ ] **Update Word Display**
    - Replace the placeholder word with the randomly selected word.

---

## **5. Implement Gender Selection Logic**

### **5.1 Handle User Selection**

- [ ] **Add onClick Handlers**
    - Attach `onClick` events to each gender button.

- [ ] **Compare Selection with Correct Gender**
    - Check if the user's selection matches the article of the current word.

### **5.2 Provide Feedback**

- [ ] **Display Feedback Messages**
    - If correct: Show a positive message (e.g., "Correct!").
    - If incorrect: Show the correct gender and proceed to the quiz.

- [ ] **Manage Feedback State**
    - Use `useState` to control the display of feedback messages.

- [ ] **Advance to Next Word or Quiz**
    - If correct: Wait briefly and then load a new random word.
    - If incorrect: Transition to the `AdjectiveQuiz` component.

### **5.3 Ensure Single Selection Processing**

- [ ] **Disable Buttons After Selection**
    - Prevent multiple selections by disabling buttons after one is clicked.

- [ ] **Re-enable Buttons for Next Word**
    - Reset button states when a new word is displayed.

---

## **6. Implement the AdjectiveQuiz Component**

### **6.1 Create the AdjectiveQuiz Component**

- [ ] **Set Up Functional Component**
    - Create `AdjectiveQuiz.js` in the `components` directory.
    - Accept props for the current noun and its article.

- [ ] **Export the Component**
    - Ensure `AdjectiveQuiz` is exported.

### **6.2 Design the Quiz Interface**

- [ ] **Construct the Sentence**
    - Display a sentence incorporating the noun and a preposition.
    - Use placeholders for the article and adjective ending.

- [ ] **Add Dropdowns for User Input**
    - Include dropdown menus for selecting the correct article.
    - Include dropdowns for selecting the correct adjective ending.

### **6.3 Implement Validation Logic**

- [ ] **Determine Correct Answers**
    - Based on the noun's gender and the case required by the preposition.

- [ ] **Handle User Submission**
    - Validate the user's selections when they submit their answers.

- [ ] **Provide Feedback**
    - Inform the user if their answers are correct or incorrect.

### **6.4 Provide Hints for Two-Way Prepositions**

- [ ] **Implement Preposition Logic**
    - Determine if the preposition requires accusative (direction) or dative (position) case.

- [ ] **Display Hints**
    - Offer hints or explanations about the preposition's effect on the case.

---

## **7. Integrate Components and Manage State**

### **7.1 Update the App Component**

- [ ] **Manage Application State**
    - Use `useState` to handle which component is displayed.
    - States may include `showQuiz`, `currentWord`, `userGuess`, etc.

- [ ] **Import Child Components**
    - Import `WordCard` and `AdjectiveQuiz` into `App.js`.

- [ ] **Render Components Conditionally**
    - Display `WordCard` or `AdjectiveQuiz` based on the state.

### **7.2 Pass Necessary Props and Callbacks**

- [ ] **Provide Data to Child Components**
    - Pass `currentWord` and other relevant data to `WordCard` and `AdjectiveQuiz`.

- [ ] **Handle State Changes from Children**
    - Pass callback functions to update the main application state from child components.

### **7.3 Reset States After Quiz**

- [ ] **Reset for Next Round**
    - After the quiz, reset states to show a new word in `WordCard`.

- [ ] **Ensure Smooth Transitions**
    - Make the user experience seamless when moving between components.

---

## **8. Style the Application**

### **8.1 Apply Global Styles**

- [ ] **Create a Global Style Component**
    - Use `createGlobalStyle` from `styled-components`.

- [ ] **Define Base Styles**
    - Set default font family, background color, and margin resets.

- [ ] **Integrate Global Styles**
    - Include `<GlobalStyle />` at the top level of your app (e.g., in `App.js`).

### **8.2 Style WordCard Component**

- [ ] **Enhance Word Display**
    - Use large, clear typography.
    - Center the word horizontally and vertically.

- [ ] **Style Gender Buttons**
    - Ensure buttons are visually appealing and consistent.
    - Add hover and active states.

### **8.3 Style AdjectiveQuiz Component**

- [ ] **Design the Quiz Layout**
    - Arrange elements for readability.
    - Highlight the interactive parts (dropdowns).

- [ ] **Maintain Consistent Styling**
    - Use the same color scheme and typography as `WordCard`.

### **8.4 Ensure Responsive Design**

- [ ] **Use Responsive Units**
    - Employ relative units like `%`, `em`, `rem` instead of fixed pixels.

- [ ] **Test on Different Screen Sizes**
    - Verify that the layout adapts to mobile, tablet, and desktop views.

- [ ] **Implement Mobile-Friendly Interactions**
    - Ensure touch targets are appropriately sized.

---

## **9. Set Up Testing Framework**

### **9.1 Install Testing Libraries**

- [ ] **Install Jest and React Testing Library**
  ```
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom
  ```

### **9.2 Configure Jest**

- [ ] **Add Test Scripts to package.json**
  ```json
  "scripts": {
    "test": "jest"
  }
  ```

- [ ] **Set Up Jest Configurations**
    - Create `jest.config.js` if necessary.

### **9.3 Write Unit Tests for WordCard**

- [ ] **Create WordCard.test.js**

- [ ] **Test Component Rendering**
    - Verify that `WordCard` renders without crashing.

- [ ] **Test Data Loading**
    - Mock the CSV data and test that words are loaded correctly.

- [ ] **Test User Interaction**
    - Simulate button clicks and verify the correct feedback is shown.

### **9.4 Write Unit Tests for AdjectiveQuiz**

- [ ] **Create AdjectiveQuiz.test.js**

- [ ] **Test Component Rendering**
    - Verify that the quiz displays correctly with given props.

- [ ] **Test Validation Logic**
    - Mock user selections and confirm validation outcomes.

### **9.5 Write Integration Tests in App.test.js**

- [ ] **Simulate User Flow**
    - Test the transition from `WordCard` to `AdjectiveQuiz`.

- [ ] **Verify State Management**
    - Ensure the application state updates as expected throughout interactions.

### **9.6 Run Tests and Ensure Coverage**

- [ ] **Execute Tests**
  ```
  npm test
  ```

- [ ] **Check for Passing Tests**
    - All tests should pass without errors.

- [ ] **Aim for High Coverage**
    - Ensure critical parts of your code are covered by tests.

---

## **10. Configure Deployment**

### **10.1 Set Up GitHub Actions**

- [ ] **Create Workflow File**
    - Create `.github/workflows/deploy.yml`.

- [ ] **Configure Deployment Workflow**
    - Use GitHub Actions to automate builds and deployment.
    - Example configuration:
      ```yaml
      name: Deploy to GitHub Pages

      on:
        push:
          branches:
            - main

      jobs:
        build-and-deploy:
          runs-on: ubuntu-latest
          steps:
            - name: Checkout
              uses: actions/checkout@v2

            - name: Setup Node.js
              uses: actions/setup-node@v2
              with:
                node-version: '14'

            - name: Install Dependencies
              run: npm install

            - name: Build Project
              run: |
                npm run build
                npm run export

            - name: Deploy
              uses: peaceiris/actions-gh-pages@v3
              with:
                github_token: ${{ secrets.GITHUB_TOKEN }}
                publish_dir: ./out
      ```

### **10.2 Configure Next.js for GitHub Pages**

- [ ] **Set basePath and assetPrefix**
    - Update `next.config.js`:
      ```javascript
      module.exports = {
        basePath: '/german-vocab-app',
        assetPrefix: '/german-vocab-app/',
      };
      ```

### **10.3 Test Deployment**

- [ ] **Push Changes to GitHub**
    - Commit and push all changes to `main`.

- [ ] **Monitor GitHub Actions**
    - Ensure the workflow runs successfully.

- [ ] **Verify Live Application**
    - Access your app at `https://yourusername.github.io/german-vocab-app/` and test functionality.

---

## **11. Conduct Manual Testing and Optimize Performance**

### **11.1 Perform Cross-Device Testing**

- [ ] **Test on Mobile Devices**
    - Use physical devices or emulators.

- [ ] **Test on Tablets and Desktops**

### **11.2 Perform Cross-Browser Testing**

- [ ] **Test on Popular Browsers**
    - Chrome
    - Firefox
    - Safari
    - Edge

### **11.3 Check Accessibility**

- [ ] **Use Accessibility Tools**
    - Lighthouse in Chrome DevTools.
    - Axe Browser Extension.

- [ ] **Ensure Keyboard Navigation**
    - All interactive elements should be accessible via keyboard.

- [ ] **Test with Screen Readers**
    - Use NVDA, VoiceOver, or similar tools.

- [ ] **Verify Color Contrast**
    - Ensure text meets WCAG contrast ratios.

### **11.4 Optimize Performance**

- [ ] **Analyze Performance Metrics**
    - Use Lighthouse to assess performance scores.

- [ ] **Optimize Images**
    - Compress images if any are used.

- [ ] **Enable Code Splitting**
    - Take advantage of Next.js's automatic code splitting.

- [ ] **Implement Lazy Loading**
    - Lazy load components if applicable.

- [ ] **Minimize Bundle Size**
    - Review dependencies and remove unused ones.

---

## **12. Additional Enhancements**

### **12.1 Expand Vocabulary Dataset**

- [ ] **Add More Nouns**
    - Increase the number of words in `nouns.csv`.

- [ ] **Include Plural Forms**
    - Add plural versions and note irregular plurals.

### **12.2 Improve Randomization Logic**

- [ ] **Implement Shuffle Algorithm**
    - Ensure all words are presented before repeating.

- [ ] **Track Used Words**
    - Keep track of words already shown in the current session.

### **12.3 Add Progress Tracking**

- [ ] **Implement Scorekeeping**
    - Display correct and incorrect attempt counts.

- [ ] **Show Progress Indicators**
    - Use a progress bar or similar visual cues.

### **12.4 Implement Localization**

- [ ] **Prepare for Multiple Languages**
    - Structure the application to support i18n.

- [ ] **Use a Localization Library**
    - Consider libraries like `react-intl` or `i18next`.

### **12.5 Add User Authentication (Advanced)**

- [ ] **Implement Login System**
    - Allow users to create accounts and save progress.

- [ ] **Choose Authentication Method**
    - Use services like Firebase Authentication.

- [ ] **Set Up a Backend**
    - If necessary, create a backend to handle data persistence.

---

## **13. Final Review and Refactoring**

### **13.1 Conduct Code Review**

- [ ] **Review for Consistency**
    - Check code styling and format across all files.

- [ ] **Refactor for Efficiency**
    - Optimize functions and remove redundant code.

### **13.2 Update Documentation**

- [ ] **Complete README.md**
    - Include:
        - Project overview
        - Installation instructions
        - Usage guide
        - Contribution guidelines

- [ ] **Add Comments in Code**
    - Document complex logic and decisions.

### **13.3 Final Testing**

- [ ] **Run All Tests**
    - Ensure unit and integration tests pass.

- [ ] **Manual Testing**
    - Perform a final walkthrough of the application.

### **13.4 Final Deployment**

- [ ] **Deploy Latest Version**
    - Push final changes and verify deployment.

- [ ] **Inform Stakeholders**
    - If applicable, notify others that the project is complete.
