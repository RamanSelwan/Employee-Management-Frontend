import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/employee";

// Function to handle API requests
const apiConnecter = {
  // Fetch all employees
  fetchAllEmployees: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // Fetch an employee by ID
  fetchEmployeeById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      throw error.response ? error.response.data : error;
    }
  },

  // Create a new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await axios.post(`${API_URL}`, employeeData);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error.response ? error.response.data : error;
    }
  },

  // Update an employee by ID
  updateEmployee: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error);
      throw error.response ? error.response.data : error;
    }
  },

  // Delete an employee by ID
  deleteEmployee: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      throw error.response ? error.response.data : error;
    }
  },
};

export default apiConnecter;
