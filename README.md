# TeleDoc

<div align="center">
<h1><a href="https://www.teledoc.tech/login" target="_blank">TeleDoc App</a></h1>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/-NextJS-000000?logo=nextdotjs">
  <img src="https://img.shields.io/badge/-ReactJS-61DAFB?logo=react&logoColor=black">
</div>

<br>
<div align="center">
<img width="80%" alt="App screenshot" src="/assets/teledoc.png">
</div>
<br>
<br>

<p align="center"><strong>Teledoc App</strong> is a mobile web based app built using <strong>Next Js, Typescript, and Tailwind CSS</strong>.</p>

## Table of Contents

- [About](#about)
- [UI UX Design](#ui-ux-design)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Live Demo](#live-demo)
- [Endpoints](#endpoints)
- [Author](#author)

## About

**_Teledoc_** has a user-friendly interface that allows **_users to make appointments with doctors_** and **_there is also a doctor search feature which aims to make it easier for us to find a doctor_**.

Overall, the app provides a seamless and intuitive experience for users to book appointments and search for doctor data. Its fast performance, responsive design, reusable components, and efficient search and browsing features make it a showcase for the power and flexibility of the **_Next.js_** framework.

## UI UX Design

View Design UI/UX with : [Figma](https://www.figma.com/file/pmSQlFUXeCbQ2Y5o932KvS/TeleDoc?type=design&node-id=0-1&mode=design&t=08SagvxvrnAnfcXL-0)

## Technologies Used

- Frontend Framework : Next Js App Router
- Backend : Next Js
- Database : PostgreSQL, Prisma ORM
- Styling : Tailwind CSS,
- App Deployment : Vercel
- Database Deployment : Railway
- Date Picker : react-date-picker

## Features

- Can log in using a Google account
- has a search feature to find a doctor
- Responsive design for seamless use on any device

## Installation

To run Media Maven on your local machine, follow these steps:

1. Clone the project repository:

   ```bash
   git clone https://github.com/Teledoc-App/teledoc-app
   ```

2. Navigate to the project directory:

   ```bash
   cd teledoc-app
   ```

3. Install project dependencies using [NPM](https://www.npmjs.com/):

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will launch the application in watch mode, allowing you to view it in your web browser at `http://localhost:3000`.

## Live Demo

![Vercel](https://vercelbadge.vercel.app/api/StarSheriff2/nextjs-pokemon-search-app)

- Deployed to Vercel: [Live Demo](https://www.teledoc.tech/login)

## Endpoints

**Authentication**

| Method | Endpoint           | Description         | Auth |
| :----- | :----------------- | :------------------ | ---- |
| 'POST' | '/api/auth/signup' | Register a new user |      |
| 'POST' | '/api/auth/signin' | Login user          |      |
| 'POST' | '/api/auth/logout' | Logout a user       | 🔑⚿  |

**Users**

| Method  | Endpoint          | Description       | Auth |
| :------ | :---------------- | :---------------- | ---- |
| 'GET'   | '/api/users'      | Get all users     |      |
| 'GET'   | '/api/users/{id}' | Get user by id    |      |
| 'GET'   | '/api/users/me'   | Get my account    | 🔑 ⚿ |
| 'PATCH' | '/api/users/me'   | Update my account | 🔑 ⚿ |

**Doctor**

| Method  | Endpoint           | Description            | Auth |
| :------ | :----------------- | :--------------------- | ---- |
| 'GET'   | '/api/doctor       | Get all doctors        |      |
| 'GET'   | '/api/doctor/{id}' | Get doctors by id      |      |
| 'PATCH' | '/api/doctor/{id}' | Update doctors profile | ⚿    |

**Specialist**

| Method   | Endpoint               | Description           | Auth |
| :------- | :--------------------- | :-------------------- | ---- |
| 'GET'    | '/api/specialist       | Get all Specialist    |      |
| 'GET'    | '/api/specialist/{id}' | Get Specialist by id  |      |
| 'POST'   | '/api/specialist       | Post a new specialist | ⚿    |
| 'PATCH'  | '/api/specialist/{id}' | Update Specialist     | ⚿    |
| 'DELETE' | '/api/specialist/{id}' | Delete Specialist     | ⚿    |

**Appointments**

| Method   | Endpoint                 | Description             | Auth |
| :------- | :----------------------- | :---------------------- | ---- |
| 'GET'    | '/api/Appointments       | Get all Appointments    |      |
| 'GET'    | '/api/Appointments/{id}' | Get Appointments by id  |      |
| 'POST'   | '/api/Appointments       | Post a new Appointments | 🔑⚿  |
| 'PATCH'  | '/api/Appointments/{id}' | Update Appointments     | 🔑⚿  |
| 'DELETE' | '/api/Appointments/{id}' | Delete Appointments     | 🔑⚿  |

**TimeSlot**

| Method   | Endpoint             | Description            | Auth |
| :------- | :------------------- | :--------------------- | ---- |
| 'GET'    | '/api/TimeSlot       | Get all TimeSlot       |      |
| 'GET'    | '/api/TimeSlot/{id}' | Get all TimeSlot by id | 🔑 ⚿ |
| 'POST'   | '/api/TimeSlot'      | Post a new TimeSlot    | 🔑 ⚿ |
| 'PATCH'  | '/api/TimeSlot/{id}' | Update a TimeSlot      | ⚿ ⚿  |
| 'DELETE' | '/api/TimeSlot/{id}' | Delete a TimeSlot      | ⚿ ⚿  |

**Status**

| Method   | Endpoint           | Description          | Auth |
| :------- | :----------------- | :------------------- | ---- |
| 'GET'    | '/api/status       | Get all Status       |      |
| 'GET'    | '/api/status/{id}' | Get all Status by id | 🔑⚿  |
| 'POST'   | '/api/status'      | Post a new Status    | 🔑 ⚿ |
| 'PATCH'  | '/api/status/{id}' | Update a Status      | 🔑 ⚿ |
| 'DELETE' | '/api/status/{id}' | Delete a Status      | 🔑 ⚿ |

## Validation

- 🔑= User
- ⚿ = Admin/Doctor

## Author

👤 **Nofrialdi**

- Github: [Nofrialdi](https://github.com/nofrialdi)
- Linkedin: [Nofrialdi](https://linkedin.com/in/nofrialdi)

👤 **Mesel ghea**

- Github: [Mesel ghea](https://github.com/meselghea)
- Linkedin: [Mesel ghea](https://www.linkedin.com/in/mesel-ghea/)

👤 **Niko Setiawan P**

- Github: [Niko Setiawan P](https://github.com/nikosetiawanp)
- Linkedin: [Niko Setiawan P](https://www.linkedin.com/in/nikosetiawanp/)

👤 **Gary Cruise**

- Github: [Gary Cruise](https://github.com/Garycruisee)
- Linkedin: [Gary Cruise](https://www.linkedin.com/in/garycruise/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show your support

Give a ⭐️ if you like this project!
