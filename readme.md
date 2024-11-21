# Food App 🍔🍕🥗

A simple React-based food app where users can browse food items, add them to the cart, and proceed to checkout. The backend is powered by Node.js, storing order details in a JSON file and fetching food data from another JSON file.

## Features
- Browse a variety of food items.
- Add items to the cart.
- Checkout functionality to save the order.
- Backend support for handling orders and fetching food data.

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/jithu5/React-food.git
cd React-food
```
### 2. Install Dependencies

#### For React Frontend
``` bash
 npm install
 ```

#### For Node Backend
``` bash
 cd backend
 npm install
 ```

### 3. Run the Application

#### Start the React Frontend
``` bash
 npm run dev
```
#### Start the Node Backend
``` bash
 npm install -g nodemon
 ```
``` bash
 cd backend
 npm start
```

**If you don't have Nodemon or prefer not to use it, modify the start script in `backend/package.json`**
``` bash
 "start": "node app.js"
 ```
 **To Run**
 ``` bash
 npm start
 ```

---

## Acknowledgements
This project was created with the help of a React course on Udemy. The course provided valuable insights into building dynamic and responsive web applications using React.

Special thanks to the instructor **Maximilian Schwarzmüller** and the course content for guiding the development of this food app.

During this project, I also learned a lot about debugging and solving issues independently. It was a rewarding experience to troubleshoot problems, understand the underlying concepts, and implement additional features to enhance the app's functionality.

---