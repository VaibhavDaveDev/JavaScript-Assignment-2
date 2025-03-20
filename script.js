let staff = []; 
let editIdx = null; // for tracking the edit employee

// Function to add a new employee
const addEmployee = () => {
  let empId = document.getElementById("empId").value.trim();
  let empName = document.getElementById("empName").value.trim();
  let empDesignation = document.getElementById("empDesignation").value.trim();
  let empSalary = document.getElementById("empSalary").value.trim();
  let empAddress = document.getElementById("empAddress").value.trim();

  if (!empId || !empName || !empDesignation || !empSalary || !empAddress) {
    alert("Please fill in all fields.");
    return;
  }

  empId = parseInt(empId);
  empSalary = parseFloat(empSalary).toFixed(2);

  if (isNaN(empId) || isNaN(empSalary)) {
    alert("ID and Salary must be numeric.");
    return;
  }

  if (editIdx !== null) {
    // Update existing employee
    staff[editIdx] = { id: empId, name: empName, designation: empDesignation, salary: empSalary, address: empAddress };
    editIdx = null;
    document.querySelector("button[onclick='addEmployee()']").innerText = "Add Employee";
    document.getElementById("Add_Update").innerText = "Add Employee Details";
  } else {
    // Check for duplicate ID
    if (staff.some((emp) => emp.id === empId)) {
      alert("Employee ID must be unique.");
      return;
    }
    // Add new employee
    staff.push({ id: empId, name: empName, designation: empDesignation, salary: empSalary, address: empAddress });
  }

  displayEmployees();
  document.getElementById("employeeForm").reset();
};

// Function to display employees
const displayEmployees = () => {
  let tableBody = document.getElementById("employeeList");
  tableBody.innerHTML = ""; // Clear existing data

  staff.forEach((emp, idx) => {
    let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.designation}</td>
                <td>${emp.salary}</td>
                <td>${emp.address}</td>
                <td>
                    <button onclick="editEmployee(${idx})">Edit</button>
                    <button onclick="deleteEmployee(${idx})">Delete</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
};
displayEmployees();

// Function to edit an employee
const editEmployee = (idx) => {
  let emp = staff[idx];

  document.getElementById("Add_Update").innerText = "Update Employee Details";
  document.getElementById("empId").value = emp.id;
  document.getElementById("empName").value = emp.name;
  document.getElementById("empDesignation").value = emp.designation;
  document.getElementById("empSalary").value = emp.salary;
  document.getElementById("empAddress").value = emp.address;

  editIdx = idx;
  document.querySelector("button[onclick='addEmployee()']").innerText = "Update Employee";
};

// Function to delete an employee
const deleteEmployee = (idx = null) => {
  let inputId = document.getElementById("searchIdToDelete")?.value.trim(); // Get input field value
  let empId = inputId ? parseInt(inputId, 10) : null;

  if (idx !== null) {
    // Delete by index (Delete button in table)
    if (confirm("Are you sure you want to delete this employee?")) {
      staff.splice(idx, 1);
      displayEmployees();
      alert("Employee deleted successfully.");
    }
    return;
  }

  // Delete by ID (From input field)
  if (isNaN(empId)) {
    alert("Please enter a valid Employee ID.");
    return;
  }

  let i = staff.findIndex((emp) => emp.id === empId);

  if (i === -1) {
    alert("Error: Employee with this ID does not exist.");
    return;
  }

  if (confirm("Are you sure you want to delete this employee?")) {
    staff.splice(i, 1);
    displayEmployees();
    alert("Employee deleted successfully.");
    document.getElementById("searchIdToDelete").value = "";
  }
};

// Function to find an employee by ID
const findEmployee = () => {
  let tableBody = document.getElementById("employeeList");
  tableBody.innerHTML = "";
  let searchId = parseInt(document.getElementById("searchId").value);
  if (isNaN(searchId)) {
    alert("Enter a valid ID");
    return;
  }

  let emp = staff.find((employee) => employee.id === searchId);
  if (emp) {
    let data = `   <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.designation}</td>
                <td>${emp.salary}</td>
                <td>${emp.address}</td>
                 <td>
                    <button onclick="editEmployee(${emp.id})">Edit</button>
                    <button onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;

    document.getElementById("searchId").value = "";
    tableBody.innerHTML += data;
  } else {
    // alert("Employee not found.");
    tableBody.innerHTML = "Employee not found.";
    tableBody.style = "text-align:center,width:100% , font-size:15px";
  }
};

// Function to filter employees by designation
const filterEmployees = () => {
  let designation = document.getElementById("filterDesignation").value;
  let filtered = staff.filter((emp) => emp.designation === designation);

  if (designation == "All") {
    filtered = staff;
  }

  let tableBody = document.getElementById("employeeList");
  tableBody.innerHTML = ""; // Clear existing data

  filtered.forEach((emp, idx) => {
    let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.designation}</td>
                <td>${emp.salary}</td>
                <td>${emp.address}</td>
                 <td>
                    <button onclick="editEmployee(${idx})">Edit</button>
                    <button onclick="deleteEmployee(${idx})">Delete</button>
                </td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
};

// Function to increase salaries by 10%
const increaseSalaries = () => {
  staff = staff.map((emp) => ({
    ...emp,
    salary: (emp.salary * 1.1).toFixed(2),
  }));
  displayEmployees();
};
