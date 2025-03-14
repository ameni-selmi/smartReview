# **SmartReview - Word Add-in**

SmartReview is a **Microsoft Word Add-in** designed to help users review and improve their documents. It provides suggestions for improving clarity, grammar, and style, and allows users to apply changes directly within Word.

---

## **Features**
- **Sign-In Screen**: A simple UI for user authentication (simulated).
- **Navigation Tabs**: Three tabs (Review, Ask, Draft) with smooth transitions.
- **Review Tab**:
  - Select the user’s representation (e.g., Ketrone, MAA).
  - Add context for the review.
  - Simulate an API call to get document suggestions.
  - Display suggestions with options to:
    - **Navigate to Cursor**: Select and navigate to the text in the document.
    - **Apply Change**: Replace the text with the suggested update.
    - **Dismiss**: Hide the suggestion.
- **Tailwind CSS**: Modern and responsive UI design.
- **Heroicons**: Pre-built icons for a polished look.

---
## **Video Demo**
Watch the video below to see SmartReview in action:

[SmartReview Demo](https://drive.google.com/file/d/1SAL2SsC5RCyTZeoShYAamYz_tN3wsmnr/view?usp=sharing)
---

## **Getting Started**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Microsoft Word (Desktop or Web)

---

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/ameni-selmi/smartReview.git
   cd smartreview-word-addin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open Microsoft Word and sideload the add-in:
   - Go to the **Insert** tab.
   - Click **Get Add-ins** > **Upload My Add-in**.
   - Upload the `manifest.xml` file from the project.

---

### **Running the Project**
1. Start the development server:
   ```bash
   npm start
   ```

2. Open Microsoft Word and load the add-in:
   - Go to the **Home** tab.
   - Click the **SmartReview** button to open the task pane.

---

## **Usage**
1. **Sign In**:
   - Enter a username and a password then click **Sign In** (simulated authentication).

2. **Review Tab**:
   - Select the user’s representation (e.g., Ketrone, MAA).
   - Add context for the review.
   - Click **Review Document** to simulate an API call and display suggestions.

3. **Suggestions**:
   - For each suggestion:
     - Click **Navigate to Cursor** to select and navigate to the text in the document.
     - Click **Apply Change** to replace the text with the suggested update.
     - Click **Dismiss** to hide the suggestion.

---

## **Technologies Used**
- **Frontend**:
  - React
  - Tailwind CSS
  - Heroicons
- **Backend**:
  - Simulated API calls (no backend required for this project)
- **Tools**:
  - Microsoft Office.js API
  - Webpack
  - npm
---

## **Acknowledgments**
- [Microsoft Office.js API](https://learn.microsoft.com/en-us/office/dev/add-ins/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)

