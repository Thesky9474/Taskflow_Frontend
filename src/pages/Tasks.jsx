import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import { TaskCardSkeleton } from "../components/Skeleton";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask
} from "../api/taskApi";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadTasks = async () => {
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await getTasks(userId, 0, 50);
        setTasks(data.content || []);
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [userId]);

  const handleCreate = async (formData) => {
    const payload = {
      ...formData,
      userId: Number(userId)
    };

    try {
      const newTask = await createTask(payload);
      setTasks([newTask, ...tasks]);
      setIsModalOpen(false);
    } catch {
      setError("Failed to create task");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    } catch {
      setError("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      setError("Failed to delete task");
    }
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === "ALL" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Group tasks by status for Kanban view
  const groupedTasks = {
    OPEN: filteredTasks.filter(t => t.status === "OPEN"),
    IN_PROGRESS: filteredTasks.filter(t => t.status === "IN_PROGRESS"),
    DONE: filteredTasks.filter(t => t.status === "DONE")
  };

  const filterButtons = [
    { value: "ALL", label: "All Tasks" },
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "DONE", label: "Completed" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Header
        title="Tasks"
        subtitle={`${tasks.length} total tasks`}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </Header>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
          <button onClick={() => setError("")} className="ml-auto">×</button>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute right-4 top-0 h-full flex items-center pointer-events-none z-10">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="input-field pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg">
          {filterButtons.map(btn => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === btn.value
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:text-white"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board View */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="kanban-column p-4 space-y-4">
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Open Column */}
          <div className="kanban-column">
            <div className="kanban-header open">
              <h3 className="font-semibold text-white">
                Open
              </h3>
              <span className="text-sm text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {groupedTasks.OPEN.length}
              </span>
            </div>
            <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
              {groupedTasks.OPEN.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No open tasks</p>
              ) : (
                groupedTasks.OPEN.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="kanban-column">
            <div className="kanban-header in-progress">
              <h3 className="font-semibold text-white">
                In Progress
              </h3>
              <span className="text-sm text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {groupedTasks.IN_PROGRESS.length}
              </span>
            </div>
            <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
              {groupedTasks.IN_PROGRESS.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No tasks in progress</p>
              ) : (
                groupedTasks.IN_PROGRESS.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="kanban-column">
            <div className="kanban-header done">
              <h3 className="font-semibold text-white">
                Completed
              </h3>
              <span className="text-sm text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {groupedTasks.DONE.length}
              </span>
            </div>
            <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
              {groupedTasks.DONE.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No completed tasks</p>
              ) : (
                groupedTasks.DONE.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
