import api from "./axios";

// Create task
export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// Get all tasks for a user (with pagination)
export const getTasks = async (userId, page = 0, size = 20) => {
  const response = await api.get(`/tasks/user/${userId}`, {
    params: { page, size }
  });
  // Backend returns Page<TaskResponse>, extract content array
  return response.data;
};

// Update task status - using PATCH to match backend
export const updateTaskStatus = async (id, status) => {
  const response = await api.patch(`/tasks/${id}`, { status });
  return response.data;
};

// Delete task
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

// Get task statistics (for dashboard)
export const getTaskStats = async (userId) => {
  const tasks = await getTasks(userId, 0, 100);
  const content = tasks.content || [];

  return {
    total: tasks.totalElements || content.length,
    open: content.filter(t => t.status === "OPEN").length,
    inProgress: content.filter(t => t.status === "IN_PROGRESS").length,
    done: content.filter(t => t.status === "DONE").length
  };
};
