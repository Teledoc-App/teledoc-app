# TeleDoc

## RevouProject

### Status

Get All Status : http://localhost:3000/api/status
Get All Status by ID : http://localhost:3000/api/status/1

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
