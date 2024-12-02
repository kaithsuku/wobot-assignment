Camera Management App

This is a React-based Camera Management App designed to manage cameras efficiently. It includes features such as sorting, searching, filtering, pagination, health status loaders, and actions like activating, deactivating, and deleting cameras.
Features

the app is available at https://wobot-assignment-gamma.vercel.app/

1. Camera Table

    Displays a list of cameras with the following columns:
        Name (with warning badges if applicable)
        Health (Cloud & Device health loaders)
        Location
        Recorder
        Tasks
        Status
        Actions (Activate/Deactivate/Delete buttons)

2. Filters

    Filter by:
        Location
        Status (Active/Inactive)

3. Search

    Search for cameras by name using a responsive search bar.

4. Pagination

    Supports rows-per-page selection (10, 25, 50, 100).
    Includes page navigation buttons for First, Previous, Next, and Last.

5. Responsive Design

    The app is fully responsive with:
        Scrollable table for smaller screens.
        Adjusted fonts, paddings, and layouts for tablets and mobiles.

6. Actions

    Activate/Deactivate: Update the camera's status.
    Delete: Remove a camera entry from the frontend.

Tech Stack
Frontend

    React.js: For building the UI.
    CSS: For styling and responsive design.

Backend Integration

    API Endpoints:
        Fetch cameras: GET https://api-app-staging.wobot.ai/app/v1/fetch/cameras
        Update camera status: PUT https://api-app-staging.wobot.ai/app/v1/update/camera/status
    Authentication:
        Bearer token: 4ApVMIn5sTxeW7GQ5VWeWiy (hardcoded in the app).

Installation
1. Prerequisites

    Node.js and npm installed on your system.


2. Clone the Repository

Clone the repository using the following command:

git clone https://github.com/kaithsuku/wobot-assignment.git
cd wobot-assignment

3. Install Dependencies

Install the necessary packages:

npm install

4. Run the App Locally

Start the development server:

npm run start

The app will be available at http://localhost:3000.

Usage Instructions
1. Search and Filters

    Use the search bar to find cameras by name.
    Apply filters to narrow down results by location or status.

2. Activate/Deactivate Cameras

    Click the Activate or Deactivate button in the Actions column to toggle the status.

3. Delete Cameras

    Click the Delete button in the Actions column to remove a camera from the table.

4. Pagination

    Navigate through pages using the pagination controls at the bottom of the table.
    Change the number of rows per page using the dropdown.


Key Components
1. CameraTable

Handles:

    Fetching camera data from the API.
    Displaying the table with search, filters, and actions.
    Pagination and responsiveness.



License

This project is licensed under the MIT License. See the LICENSE file for more details.