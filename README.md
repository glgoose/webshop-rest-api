# Api Documentation

## User

#### **User Register**

Register new user and login directly.

##### URL: `https://webshop-rest-api.herokuapp.comhttps://webshop-rest-api.herokuapp.com/user/register`

##### Method: `POST`

#### Required fields: `firstName`, `lastName`, `email`, `password`

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
  "error": "ErrorMessage"
}
```

### **User Logout**

#### URL: `https://webshop-rest-api.herokuapp.com/user/logout`

#### Method: `GET`

#### Success Response `200`

```json
{
  "message": "User succesfully logged out!",
  "loggedOutUser": "John Doe"
}
```

#### Error Response `500`

```js
{
  "error": "ErrorMessage"
}
```

---

## Products

### Get all products

#### URL: `https://webshop-rest-api.herokuapp.com/products`

#### Method: `GET`

#### Success Response `200`

```json
{
  "message": "All products displayed correctly!",
  "products": [
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
}
```

#### Error Response `500`

```json
{
  "error": "ErrorMessage"
}
```

---

## Categories

### Get all categories

#### URL: `https://webshop-rest-api.herokuapp.com/categories`

#### Method: `GET`

#### Success Response `200`

```json
{
  "message": "All categories displayed correctly!",
  "categories": [
    {
      "_id": "CategoryId",
      "title": "String",
      "slug": "String"
    }
  ]
}
```

#### Error Response `500`

```js
{
  "error": "ErrorMessage"
}
```

---

## Basket

#### Display basket

#### URL: `https://webshop-rest-api.herokuapp.com/basket`

#### Method: `GET`

#### Success Response `200`

```json
{
  "message": "PBasket displayed succesfully!",
  "basket": {
    "totalQty": "Number",
    "totalCost": "Number",
    "_id": "String",
    "userId": "String",
    "products": []
  }
}
```

#### Error Response `500`

```js
{
  "error": "ErrorMessage"
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
  "error": "ErrorMessage"
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
  "error": "The product you are trying to delete does not exist!"
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
  "error": "The product you are trying to delete does not exist!"
}
```

### Checkout

#### URL: `https://webshop-rest-api.herokuapp.com/checkout`

#### Method: `POST`

#### Required field: `address`

#### Success Response `200`

```json
{
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
```

#### Error Response `400`

```js
{
  "error": ""Cannot proceed with checkout, your basket is empty!""
}
```

---

## Search and filter

### Search for products

#### URL: `https://webshop-rest-api.herokuapp.com/search?q=productToSearch`

#### Method: `GET`

#### Success Response `200`

```json
{
  "message": "Product searched correctly!",
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
  "error": "The product you are searching for does not exist!"
}
```

### Filter products by category

#### Category list

#### URL: `https://webshop-rest-api.herokuapp.com/category/:categoryId`

#### Method: `GET`

#### Success Response `200`

```json
{
  "filteredProducts": [
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
}
```

#### Error Response `500`

```js
{
  "error": "ErrorMessage"
}
```
