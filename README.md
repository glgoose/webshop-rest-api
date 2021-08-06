# Api Documentation

## User

#### **User Register**

Register new user and login directly.

##### URL: `https://webshop-rest-api.herokuapp.comhttps://webshop-rest-api.herokuapp.com/user/register`

##### Method: `POST`

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

## Basket

#### Basket model

```json
{
  "_id": "String",
  "totalQty": "Number",
  "totalCost": "Number",
  "userId": "String",
  "products": [
    {
      "qty": "Number",
      "price": "Number",
      "_id": "String",
      "productId": "String",
      "title": "String"
    }
  ]
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

#### Error Response `500`

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

#### Error Response `500`

```js
{
  "error": "The product you are trying to delete does not exist!"
}
```

---

## Search and filter

### Search for a product

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

```json
[
  {
    "_id": "CategoryId",
    "title": "Shoes",
    "slug": "shoes"
  },
  {
    "_id": "CategoryId",
    "title": "Sweatshirts",
    "slug": "sweatshirts"
  },
  {
    "_id": "CategoryId",
    "title": "Backpacks",
    "slug": "backpacks"
  },
  {
    "_id": "CategoryId",
    "title": "Jackets",
    "slug": "jackets"
  },
  {
    "_id": "CategoryId",
    "title": "Jeans",
    "slug": "jeans"
  },
  {
    "_id": "CategoryId",
    "title": "Sandals",
    "slug": "sandals"
  }
]
```

#### URL: `https://webshop-rest-api.herokuapp.com/filter/:slug`

#### Method: `POST`

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
