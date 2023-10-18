import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import './EmployeeList.scss';

/**
 *
 * This component renders a list of current employees in a tabular format.
 * The data for the employees is fetched from the Redux store.
 * The table supports features like pagination and dynamic page size.
 *
 * Features:
 * 1. Displays a list of employees with their detailed information.
 * 2. Provides a link to navigate back to the Home page.
 * 3. Utilizes the DataGrid component from the MUI library for tabular display.
 * 4. Supports pagination and allows the user to choose the number of rows per page.
 */

const EmployeeList = () => {
  // State for managing the number of rows displayed per page.
  const [pageSize, setPageSize] = useState(5);
  // Fetch the list of employees from the Redux store.
  const employees = useSelector((state) => state.employees);
  // Column configuration for the DataGrid component.
  const columns = [
    { headerName: 'First Name', field: 'firstName', minWidth: 50 },
    { headerName: 'Last Name', field: 'lastName', minWidth: 50 },
    { headerName: 'Start Date', field: 'startDate', minWidth: 150 },
    { headerName: 'Department', field: 'department', minWidth: 50 },
    { headerName: 'Street', field: 'street', minWidth: 200 },
    { headerName: 'City', field: 'city', minWidth: 50 },
    { headerName: 'State', field: 'state', minWidth: 50 },
    { headerName: 'Zip Code', field: 'zipCode', minWidth: 50 },
    {
      headerName: 'Date of Birth',
      field: 'dateOfBirth',
      minWidth: 150,
      flex: 1,
    },
  ];

  return (
    <main className="container">
      <h1>Current Employees</h1>
      {/* Navigation link to go back to the Home page */}
      <Link to="/" className="link">
        Home
      </Link>
      <div className="dataStyle">
        {/* DataGrid component for displaying employees' information in a table format */}
        <DataGrid
          autoHeight
          rows={employees}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          disableSelectionOnClick
        />
      </div>
    </main>
  );
};

export default EmployeeList;
