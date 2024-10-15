# Io-connecT
The number one IoT device management system.

## Features
- [x] User management
- [x] Device management
- [x] Device control
- [x] Device Communication
- [x] Device data storage

- [x] Device monitoring
- [x] Device data analysis
- [x] Device data visualization

## Installation
## Usage
```
$ npm install
$ npm start
```

## License

## Structure

<pre>
io-connect-app/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── auth.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── deviceController.js
│   │   ├── dataController.js
│   │   ├── commandController.js
│   │   └── alertController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Device.js
│   │   ├── Data.js
│   │   ├── Command.js
│   │   └── Alert.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── deviceRoutes.js
│   │   ├── dataRoutes.js
│   │   ├── commandRoutes.js
│   │   └── alertRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── deviceService.js
│   │   ├── dataProcessingService.js
│   │   └── notificationService.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── validators.js
│   ├── views/  # For template engine (e.g., EJS, Pug)
│   │   ├── layouts/
│   │   │   └── main.ejs
│   │   ├── pages/
│   │   │   ├── dashboard.ejs
│   │   │   ├── deviceManagement.ejs
│   │   │   ├── dataAnalysis.ejs
│   │   │   └── userProfile.ejs
│   │   └── partials/
│   │       ├── header.ejs
│   │       └── footer.ejs
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   └── app.js
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── scripts/
│   ├── seed.js
│   └── deploy.sh
│
├── docs/
│   ├── API.md
│   └── SETUP.md
│
├── .gitignore
├── .env
├── package.json
└── README.md
</pre>