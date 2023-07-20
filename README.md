# 🚀 Incognito Url Maker Frontend

The frontend app is responsible for allowing users to shorten and customize long URLs using the application's API. Users can input a long URL, provide a customized alias (masked), and create a shortened URL with the customized alias. The app also provides the ability to copy the shortened URL to the clipboard and clear the form.

## Tech Stack

**Client:** React, Typescript, axios, react-loader-spinner.

## Function Optimization

createMaskedUrl(): This function is responsible for validating the input data (origin URL and masked alias), making an API request to create the shortened URL, and updating the state with the customized URL.

clear(): This function clears all input fields and resets the state to their initial values.

## UI Components

**The Main component renders different sections based on the application's state:**
Loading Indicator: When the loading state is true, a loading spinner is displayed.

Form Section: If customizedUrl is empty, the form section is rendered. It allows users to input the long URL and the desired masked alias and submit the form to create a customized URL.

Error Handling: If there is an error (non-empty error state), it will be displayed below the form section.

Customized URL Section: If customizedUrl is not empty, the section displaying the customized URL is rendered. It also provides buttons to copy the URL to the clipboard and clear the form.

## Screenshots

![App Screenshot](https://i.ibb.co/8YPDDw5/Screenshot-2023-07-20-at-12-07-50.png)
![App Screenshot](https://i.ibb.co/3cch5sS/Screenshot-2023-07-20-at-12-08-52.png)
![App Screenshot](https://i.ibb.co/0QDH2xZ/Screenshot-2023-07-20-at-12-09-23.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/JoelDeonDsouza/Incognito_Url_Maker_Frontend.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Test cases

**Tech used:** React, @testing-library/react, @testing-library/jest-dom.

## Test Overview

The test code included in this repository checks the behavior of the Main component under different scenarios. The test cases verify whether the component displays the correct error messages when the form is submitted with empty fields, an invalid origin URL, or an alias that is too short.

To run tests, run the following command

```bash
  npx jest
```

## Hosted link

Test the hosted project link below

```bash
   https://incognito-url.onrender.com/
```
