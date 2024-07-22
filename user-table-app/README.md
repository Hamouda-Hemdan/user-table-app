# Table User App

## Overview

Table User App is a React-based web application designed to display and manage user data. It includes features like search, sorting, and a modal for detailed user information.

## Features

- **Search**: Filter users by name, age, gender, or city., or you can search by key:value for example (firstname:Emily).
- **Sort**: Sort users by any column in ascending or descending order or without by clcik on the colume you want to sort it.
- **Resizable Columns**: Adjust the width of table columns, by click on the right black in colume you can move right and left.
- **User Modal**: View detailed information about a user in a modal, open by click on user.

## Project Structure

- `src/`
  - `App.jsx`: The main component of the application that manages state, handles user interactions, and renders child components. It is responsible for fetching user data, searching, sorting, and displaying the modal.
  - `components/`
    - `SearchInput.jsx`: A component for the search input field that allows users to input search queries and triggers a search action.
    - `Table.jsx`: A component that renders a table displaying user data. It supports sorting and column resizing functionality.
    - `UserModal.jsx`: A component that shows detailed information about a selected user in a modal window. It includes user details and a close button.
  - `App.scss`: The main stylesheet for the application, including global styles and layout adjustments.
  - `components/SearchInput.scss`: Styles specific to the `SearchInput` component, including the layout and appearance of the search field and button.
  - `components/Table.scss`: Styles specific to the `Table` component, including table layout, column headers, and resizer handles.
  - `components/UserModal.scss`: Styles specific to the `UserModal` component, including modal layout and content styling.

### Prerequisites

- npm

## cd user-table-app
