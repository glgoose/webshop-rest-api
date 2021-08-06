## **Register User**

Returns json data about a single user.

### **URL**

  /users/:id

### **Method**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  **Code:** `200` <br />
    **Content:** <br />
    ```js
    { id : 12, name : "Michael Bloom" }
    ```

- **Error Response:**

  - **Code:** `404` <br />
    **Content:** `{ error : "User doesn't exist" }`
