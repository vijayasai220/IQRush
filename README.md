# React Native Quiz App  

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)  

<!-- Project Description -->
This is a quiz application built with [React Native](https://reactnative.dev) featuring two interactive quizzes with immediate feedback and results tracking.  

## Features  

- 🎯 Two comprehensive quizzes (General Knowledge and Advanced)  
- 📱 Fully responsive design for Android and iOS  
- ✅ Real-time answer validation with visual feedback  
- 📊 Detailed results summary with percentage score  
- 🔒 Prevents back navigation during quiz attempts  
- 📝 Question-by-question review after completion  
- 🔄 Progress indicator for each quiz  

## Getting Started  

> **Note**: Ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.  

### **Step 1: Clone the Repository**  
```
git clone https://github.com/vijayasai220/IQRush.git
cd IQRush
```

### **Step 2: Install Dependencies**  
```
# Using npm
npm install

# OR using Yarn
yarn install
```

### **Step 3: Start Metro Bundler**  
```
# Using npm
npm start

# OR using Yarn
yarn start
```

### **Step 4: Run the App**  

#### **Android**  
```
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### **iOS**  
```
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Run the app
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Project Structure  
```
IQRush/
├── android/          # Android native code
├── ios/              # iOS native code
├── src/
│   ├── App.tsx       # Main application component
│   ├── data/         # Quiz questions and data
│   ├── screens/      # Application screens
│   └── styles/       # Global stylesheets
├── .gitignore
├── package.json
└── README.md
```

## App Overview  

### **Quiz Selection Screen**  
- Lists available quizzes  
- Shows the number of questions per quiz  

### **Quiz Screen**  
- Displays one question at a time  
- Shows a progress bar  
- Validates answers immediately  
- Prevents back button navigation  

### **Results Screen**  
- Shows score summary (correct/incorrect)  
- Calculates percentage score  
- Provides detailed question review  

## Modifying the App  

- To add new quizzes, edit the quizzes array in `App.tsx`  
- To change styles, modify the `StyleSheet` objects  
- To add features, create new components in the `src/` directory  

The app supports **Fast Refresh** – your changes will appear instantly as you save files.  

## Troubleshooting  

If you encounter issues:  

- **Reset Metro cache:**  
  ```
  npm start -- --reset-cache
  ```
- **Clean Android build:**  
  ```
  cd android && ./gradlew clean && cd ..
  ```
- **Reinstall dependencies:**  
  ```
  rm -rf node_modules && npm install
  ```

For more help, see [React Native's Troubleshooting guide](https://reactnative.dev/docs/troubleshooting).  

## Dependencies  

- **React Native** 0.72  
- **React** 18.2  
- **TypeScript** 4.8  

## License  

This project is licensed under the **MIT License** – see the `LICENSE` file for details.  

## Contact  

**Vijayasai Chitturi**  
- **GitHub**: [vijayasai220](https://github.com/vijayasai220)  
- **Project Link**: [IQRush](https://github.com/vijayasai220/IQRush)  
