# Recipe Sharing Frontend

This is the frontend of the **Recipe Sharing App**, built using **React** via [Create React App](https://github.com/facebook/create-react-app). Users can browse, search, and view detailed recipes shared by a community of cooking enthusiasts.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

git clone https://github.com/your-username/recipesharing.git
cd recipesharing

2. Install the dependencies:

npm install

3. In the project directory, you can run:

npm start

Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload automatically if you make edits.
You will also see lint errors (if any) in the console.

4. Folder Structure
public/
|
├──images/
├──index.html
src/
│
├── components/       # Reusable UI components (e.g. RecipeCard, Navbar, Searchbar,...)
├── pages/            # Page-level components (e.g. HomePage, RecipeDetail,..)
├── styles/           # css files
├── types/            # recipe details 
├── lib/              # mock data
├── App.js            # Main application component
├── index.js          # Entry point
├── package-lock.json
|__ package.json

5. Mock Data Integration

For development purposes, mock data is used to simulate the actual recipe data. The mock data is stored in the lib/ directory, and you can update it as necessary to reflect the type of data app will interact with in the future.
 

























