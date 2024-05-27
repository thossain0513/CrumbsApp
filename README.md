# Lab 1: Containerizing a Basic API

## Overview 

Welcome to Crumbs, the AI-driven recipe recommendation tool. This is a React Native App run using expo. We use the following architectures to run the application:

- Supabase for database and authentication
- Twilio Verify to log in with phone number (also connected to the Supabase project for verification)
- Google Account Authentication (also connected to the Supabase project for verification)
- Email Login (connected to Supabase)


## Table of Contents

### Running the Application with Node Package Manager
- [Prerequisites](#node-package-manager-prerequisites)
- [How to Build the Application with Poetry](#how-to-build-the-application-with-poetry)
- [How to Run the Application with Poetry](#how-to-run-the-application-with-poetry)
- [How to Test the Application with Poetry](#how-to-test-the-application-with-poetry)

### Running the Application with Docker
- [Prerequisites](#docker-prerequisites)
- [How to Build the Application with Docker](#how-to-build-the-application-with-docker)
- [How to Run the Application with Docker](#how-to-run-the-application-with-docker)
- [How to Test the Application with Docker](#how-to-test-the-application-with-docker)

## Running the Application with Expo

### Prerequisites

Download node.js from the official website to be able to run npm commands on your terminal [here](https://nodejs.org/en)

Make sure you have the Expo Go app downloaded on your phone and make an account. Download it from the App store or the Play Store.

1. **If you don't have Expo or Node Package Manager**:
    ```bash
    npm install -g npm
    npm install expo-cli -g

2. **If you have permission issues, run with the following**:
    ```bash
    sudo npm install -g npm
    sudo npm install expo-cli -g

### How to Activate the API

1. **To install Poetry and Pipe it to Python**:
    ```bash
    curl -sSL https://install.python-poetry.org | python3 -


2. **Clone the API repository**:
    ```bash
    git clone https://github.com/thossain0513/crumbs-api.git
    cd api-code


3. **Run the Following**
    ```bash
    poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload


### How to Run the Application with npm

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/thossain0513/CrumbsApp.git

2. **Install Packages**:
    ```bash
    npm install

3. **To find your local IP address**:
    ```bash
    ipconfig getifaddr en0

Once you find your local IP address, navigate to the `helpers.js` file and then input that in for the appropriate IP address variable. Only after that can you run the following command.

4. **Build and Activate the Expo App**
   ```bash
   npx expo start

The pages are all in testing right now, so they're really disorganized. The Profile button navigates to the login page as of now. The Start Recording button is the main feature available on the
application as of now, where you speak to the app and list ingredients that you have available to you, and it will load 3 swipable recipe cards.