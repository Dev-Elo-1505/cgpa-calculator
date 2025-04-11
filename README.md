# 5-Point CGPA Calculator

This is a **5-Point CGPA Calculator** built with **React** and **TypeScript** that helps students calculate their CGPA based on their courses, grades, and units. It provides an intuitive interface to input course data, compute CGPA, and track degree classification.

### Key Features:
- **Dynamic Course Management**: Add and remove courses with corresponding grades and units.
- **CGPA Calculation**: Automatically calculates CGPA based on the entered grades and units.
- **Degree Classification**: Displays degree classification based on the calculated CGPA (First Class, Second Class Upper, etc.).
- **Persistence**: The app saves course data, CGPA, and last semester CGPA to **localStorage**, so your data persists even after a browser refresh.
- **Previous CGPA Integration**: Option to include your previous semester's CGPA to calculate an average CGPA.
- **Responsive UI**: Works well on both desktop and mobile devices, making it easy to calculate CGPA on the go.
- **Reset Button**: Clear all data, including localStorage, with a single button click.

### Tech Stack:
- **Frontend**: React.js, TypeScript, Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Persistence**: localStorage
- **Icon Library**: React Icons

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cgpa-calculator.git
2. Navigate to the project directory:
   ```bash
   cd cgpa-calculator
3. Install the dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run dev

### How to Use:
1. Add your courses along with the course code, grade, and unit.
2. Input your previous semester's CGPA (optional).
3. Click the "Calculate CGPA" button to see your current CGPA and degree classification.

### Additional nice-to-haves:
1. PDF Export: Add functionality to download the CGPA report as a PDF.
2. Validation and Error Handling: Improve the input validation with better error messages.
3. User Authentication: Option to sign in and save data across devices.
