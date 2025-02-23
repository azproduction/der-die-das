## Project Specification: German Vocabulary Improvement Application

### 1. Project Overview
A single-page mobile web application designed to help users improve their German vocabulary, with a focus on learning word genders. The application displays random German nouns and allows users to guess their gender. If the user guesses incorrectly, the app provides the correct gender and offers a quiz on adjective endings.

### 2. Technologies Used
- Next.js static app generator
- React
- Styled-components
- GitHub Pages (for hosting)
- GitHub Actions (for deployment)
- Papaparse (for CSV parsing)

### 3. User Interaction and Flow
- **Word Display**: A random word from the CSV file is displayed prominently, taking the entire width of the screen.
- **Gender Selection**: Three buttons (der, die, das) allow users to select the gender.
- **Feedback**:
    - If the user selects the correct gender, a new word is shown.
    - If the user selects the wrong gender, the correct gender is displayed along with a quiz to choose the correct adjective ending.
- **Adjective Ending Quiz**: The quiz appears immediately, using a dropdown to select the correct article and adjective ending based on the sentence context.
- **Two-Way Prepositions**: Provide hints if the preposition indicates direction or position.

### 4. Data Handling
- **CSV File**: Stores the nouns and their genders.
- **CSV Structure**:
  ```csv
  Word,Article
  Buch,Das
  Haus,Das
  Tisch,Der
  ```
- **Sentence Construction**: Prepositions, articles, and adjectives are hardcoded and permutated in the application logic.

### 5. Application Architecture
#### 5.1 Frontend
- **React Components**:
    - `WordCard`: Displays the random word and gender selection buttons.
    - `AdjectiveQuiz`: Displays the quiz for selecting the correct article and adjective ending.
    - `App`: Main component that manages state and renders `WordCard` and `AdjectiveQuiz` components.
- **Styled Components**: Used for styling the application with a minimalistic black and white theme.
- **Data Fetching**: Use `papaparse` to load and parse the CSV file containing nouns and their genders.

#### 5.2 Backend
- No backend required as the application is a static site.

#### 5.3 Deployment
- **GitHub Pages**: Hosting the static site.
- **GitHub Actions**: Automate the build and deployment process.

### 6. Error Handling
- **CSV Loading**: Handle errors in loading or parsing the CSV file, and display a user-friendly error message.
- **Gender Selection**: Ensure that only one gender selection is processed at a time.
- **Quiz Input**: Validate the dropdown selection to ensure it matches the expected format.

### 7. Testing Plan
- **Unit Tests**:
    - Test the `WordCard` component for correct word and button rendering.
    - Test the `AdjectiveQuiz` component for correct quiz rendering and validation.
- **Integration Tests**:
    - Test the complete user flow from word display to gender selection to adjective ending quiz.
- **Manual Testing**:
    - Verify that the application displays random words without repetition.
    - Verify that the correct gender feedback and quiz are shown upon incorrect gender selection.
    - Verify that the hints for two-way prepositions are provided correctly.
