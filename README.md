# Api Documentation

## User

#### **User Register**

Register new user and login directly.

##### URL: `https://webshop-rest-api.herokuapp.com/user/register`

##### Method: `POST`

#### Required fields: `firstName`, `lastName`, `email`, `password`

#### Notes: email has to be a valid email and password has to be min 6 and max 15 alphanumeric characters

##### Success Response `201`

```json
{
  "message": "User succesfully registered!",
  "registeredUser": "John Doe"
}
```

#### Error Response `409`

```js
{
  error: "User already exists!";
}
```

### **User Login**

#### URL: `https://webshop-rest-api.herokuapp.com/user/login`

#### Method: `POST`

#### Required fields: `email`, `password`

#### Success Response `200`

```json
{
  "message": "Logged in succesfully",
  "loggedInUser": "John Doe"
}
```

#### Error Response `500`

```js
{
  "message": "ErrorMessage"
}
```

### **User Logout**

#### URL: `https://webshop-rest-api.herokuapp.com/user/logout`

#### Method: `GET`

#### Success Response `200`

```json
{
  "message": "User succesfully logged out!"
}
```

#### Error Response `500`

```js
{
  "message": "ErrorMessage"
}
```

---

## Products

### Get all products

#### URL: `https://webshop-rest-api.herokuapp.com/products`

#### Method: `GET`

#### Success Response `200`

```json
[
  {
    "_id": "String",
    "title": "String",
    "image": "String",
    "description": "String",
    "category": "String (Category Id)",
    "price": "Number",
    "createdAt": "Date"
  }
]
```

#### Error Response `500`

```json
{
  "message": "ErrorMessage"
}
```

---

## Categories

### Get all categories

#### URL: `https://webshop-rest-api.herokuapp.com/categories`

#### Method: `GET`

#### Success Response `200`

```json
[
  {
    "_id": "CategoryId",
    "title": "String",
    "slug": "String"
  }
]
```

#### Error Response `500`

```js
{
  "message": "ErrorMessage"
}
```

---

## Basket

### Display basket

#### URL: `https://webshop-rest-api.herokuapp.com/basket`

#### Method: `GET`

#### Success Response `200`

```json
{
  "totalQty": "Number",
  "totalCost": "Number",
  "_id": "String",
  "userId": "String",
  "products": []
}
```

#### Error Response `500`

```js
{
  "message": "ErrorMessage"
}
```

### Add product to basket

#### URL: `https://webshop-rest-api.herokuapp.com/basket/:productId`

#### Method: `POST`

#### Success Response `200`

```json
{
  "message": "Product added to basket!",
  "product": {
    "_id": "String",
    "title": "String",
    "image": "String",
    "description": "String",
    "category": "String (Category Id)",
    "price": "Number",
    "createdAt": "Date"
  }
}
```

#### Error Response `500`

```js
{
  "message": "ErrorMessage"
}
```

### Remove one instance of product from basket

#### URL: `https://webshop-rest-api.herokuapp.com/basket/:productId`

#### Method: `PUT`

#### Success Response `200`

```json
{
  "message": "Instance of product removed from basket!",
  "product": {
    "_id": "String",
    "title": "String",
    "image": "String",
    "description": "String",
    "category": "String (Category Id)",
    "price": "Number",
    "createdAt": "Date"
  }
}
```

#### Error Response `404`

```js
{
  "message": "The product you are trying to delete does not exist!"
}
```

### Remove all instances of product from basket

#### URL: `https://webshop-rest-api.herokuapp.com/basket/:productId`

#### Method: `DELETE`

#### Success Response `200`

```json
{
  "message": "All instances of product removed from basket!",
  "product": {
    "_id": "String",
    "title": "String",
    "image": "String",
    "description": "String",
    "category": "String (Category Id)",
    "price": "Number",
    "createdAt": "Date"
  }
}
```

#### Error Response `404`

```js
{
  "message": "The product you are trying to delete does not exist!"
}
```

### Checkout

#### URL: `https://webshop-rest-api.herokuapp.com/checkout`

#### Method: `POST`

#### Required field: `address`

#### Success Response `200`

```json
{
  "message": "Successfully purchased!",
  "order": {
    "basket": {
      "totalQty": "Number",
      "totalCost": "Number",
      "products": [
        {
          "qty": "Number",
          "price": "Number",
          "_id": "String",
          "productId": "String",
          "title": "String"
        }
      ]
    },
    "_id": "String",
    "address": "String",
    "createdAt": "Date"
  }
}
```

#### Error Response `400`

```js
{
  "message": "Cannot proceed with checkout, your basket is empty!"
}
```

---

## Search and filter

### Search for products

#### URL: `https://webshop-rest-api.herokuapp.com/search?q=productToSearch`

#### Method: `GET`

#### Success Response `200`

```json
[
  {
    "_id": "String",
    "title": "String",
    "image": "String",
    "description": "String",
    "category": "String (Category Id)",
    "price": "Number",
    "createdAt": "Date"
  }
]
```

#### Error Response `404`

```js
{
  "message": "The product you are searching for does not exist!"
}
```

### Filter products by category

#### URL: `https://webshop-rest-api.herokuapp.com/category/:categoryId`

#### Method: `GET`

#### Success Response `200`

```json
[
  {
    "_id": "String",
    "title": "String",
    "image": "String",
    "description": "String",
    "category": "String (Category Id)",
    "price": "Number",
    "createdAt": "Date"
  }
]
```

#### Error Response `500`

```js
{
  "message": "ErrorMessage"
}
```
