import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import apiConnecter from "../api/apiConnecter"; // Ensure the path is correct
import AddEmployeeForm from "./AddEmployeeForm";
import EditEmployeeForm from "./EditEmployeeForm";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch all employees from API
  const fetchAllEmployees = async () => {
    try {
      const response = await apiConnecter.fetchAllEmployees();
      if (response?.success) {
        setEmployees(response.employees || []); // Safely handle empty or null data
      } else {
        toast.error("Failed to fetch employees");
        console.error("API Response Error: ", response);
      }
    } catch (error) {
      toast.error("Error fetching employees");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  // Add a new employee to the list
  const handleAddEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  // Update an existing employee in the list
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      )
    );
  };

  // Delete an employee
  const handleDeleteEmployee = async (id) => {
    try {
      const response = await apiConnecter.deleteEmployee(id);
      if (response?.success) {
        toast.success("Employee deleted successfully!");
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
      } else {
        toast.error("Failed to delete employee");
      }
    } catch (error) {
      toast.error("Error deleting employee");
      console.error("Error:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Employee Management App
      </h1>

      {/* Add Employee Button and Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg"
        >
          Add Employee
        </button>
        <input
          type="text"
          placeholder="Search Employees..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm w-1/3"
        />
      </div>

      {/* Employee Table */}
      <table className="w-full bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 text-left">Sr No. </th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={employee?._id || index} className="border-b border-gray-200">
                <td className="p-3 text-gray-800">{index + 1}</td>
                <td className="p-3 text-gray-800">{employee?.name || "N/A"}</td>
                <td className="p-3 text-gray-800">{employee?.email || "N/A"}</td>
                <td className="p-3 text-gray-800">{employee?.phone || "N/A"}</td>
                <td className="p-3 text-gray-800">{employee?.salary || "N/A"}</td>
                <td className="p-3 text-gray-800">{employee?.department || "N/A"}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowEditForm(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    onClick={() => handleDeleteEmployee(employee?._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-3 text-center text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Employee Form */}
      {showAddForm && (
        <AddEmployeeForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddEmployee}
        />
      )}

      {/* Edit Employee Form */}
      {showEditForm && selectedEmployee && (
        <EditEmployeeForm
          employee={selectedEmployee}
          onClose={() => setShowEditForm(false)}
          onUpdate={handleUpdateEmployee}
        />
      )}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default EmployeeManagement;
