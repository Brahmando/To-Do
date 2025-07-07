const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend port if different

export const getTasks = async () => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`) ;
    }
    
    console.log('Fetching tasks from:', response); // Debugging line to check the URL
    const data = await response.json();
    console.log('Fetched tasks:', data); // Debugging line to check fetched tasks
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Re-throw to be handled by the component
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const completeTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/complete`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Assuming the backend sends back the updated task or a success message
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Assuming the backend sends back a success message or the deleted task
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const undoTask= async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/undo`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Assuming the backend sends back the updated task or a success message
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error undoing task:', error);
    throw error;
  }
}