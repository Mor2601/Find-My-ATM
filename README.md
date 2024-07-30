```markdown
# Find My ATM

This project is a web application built with React, TypeScript, and Vite. It helps users find ATMs in Israel using location-based and search functionalities, leveraging the [Government API](https://data.gov.il/he/dataset/automated-devices/resource/b9d690de-0a9c-45ef-9ced-3e5957776b26).

## Features

- **ATM Location Mapping**: View ATMs on a map based on user location and search criteria.
- **Search and Filter**: Find ATMs by city name in Hebrew or filter them by type and bank name.
- **Current Location**: Automatically focus on the user's current location or request location access if needed.
- **Responsive Design**: Seamlessly use the application on both desktop and mobile devices with a responsive design.

## Technologies

- **React**: For building the user interface.
- **TypeScript**: For adding static type definitions to JavaScript.
- **Vite**: For fast development and build tooling.
- **Material UI**: For styled components and icons.
- **Leaflet.js**: For interactive mapping and geolocation features.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Mor2601/Find-My-ATM.git
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Start the development server**:

   ```sh
   npm run dev
   ```

   The application will be available at [http://localhost:5173](http://localhost:5173).

## Building for Production

To create a production build, run:

```sh
npm run build
```
