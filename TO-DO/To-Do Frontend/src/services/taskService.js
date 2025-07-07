const API_BASE_URL = 'https://5000-firebase-to-do-app-1751809107240.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev'; // Replace with your backend port if different

export const getTasks = async () => {
  try {
    console.log('lets try')
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {

    console.log('ah,failed!!!')
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

export const undoTask = async (taskId) => { // taskId here is actually _id
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/undo`, { // Use taskId (_id) in the URL
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
};

export const completeTask = async (taskId) => { // taskId here is actually _id
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/complete`, { // Use taskId (_id) in the URL
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

export const deleteTask = async (taskId) => { // taskId here is actually _id
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, { // Use taskId (_id) in the URL
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