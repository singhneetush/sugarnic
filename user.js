let allUsers = [];

// Fetch API users and combine with localStorage users
async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Network error");

    const apiUsers = await response.json();
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Convert local users to match API user format
    const formattedLocalUsers = localUsers.map((user, index) => ({
      id: `local-${index}`,
      name: `${user.fName} ${user.lName}`,
      lastName: user.lName,
      role: "Role",
      email: user.email,
      phone: user.phone,
    }));

    allUsers = [...formattedLocalUsers, ...apiUsers];
    renderTable(allUsers);
  } catch (error) {
    console.error("Error:", error);
  }
}

function renderTable(users) {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">${user.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">LastName</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Role</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${user.email}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${user.phone}</td>
      `;
    tableBody.appendChild(tr);
  });

  document.getElementById(
    "recordCount"
  ).textContent = `${users.length} Records`;
}

// Search functionality
document
  .getElementById("hs-table-search")
  .addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    const filteredUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredUsers);
  });

// Call on load
fetchUsers();
