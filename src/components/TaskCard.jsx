const TaskCard = ({ task, onStatusChange, onDelete }) => {
    const statusClasses = {
        OPEN: "status-open",
        IN_PROGRESS: "status-in-progress",
        DONE: "status-done"
    };

    const priorityClasses = {
        HIGH: "priority-high",
        MEDIUM: "priority-medium",
        LOW: "priority-low"
    };

    const statusLabels = {
        OPEN: "Open",
        IN_PROGRESS: "In Progress",
        DONE: "Completed"
    };

    return (
        <div className="task-card animate-fade-in">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityClasses[task.priority] || priorityClasses.MEDIUM}`}>
                            {task.priority || "MEDIUM"}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusClasses[task.status]}`}>
                            {statusLabels[task.status]}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white truncate">{task.title}</h3>
                    {task.description && (
                        <p className="text-slate-400 text-sm mt-1 line-clamp-2">{task.description}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className="input-field text-sm py-1.5 px-2 w-auto min-w-[120px]"
                    >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="btn btn-danger text-sm py-1.5"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
