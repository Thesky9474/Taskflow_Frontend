import { useState } from "react";

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        priority: initialData?.priority || "MEDIUM",
        status: initialData?.status || "OPEN"
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Task Title *
                </label>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter task title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    autoFocus
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                </label>
                <textarea
                    className="input-field min-h-[100px] resize-none"
                    placeholder="Add a description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            {/* Priority & Status Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Priority
                    </label>
                    <select
                        className="input-field"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                        <option value="HIGH">🔴 High</option>
                        <option value="MEDIUM">🟡 Medium</option>
                        <option value="LOW">🟢 Low</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Status
                    </label>
                    <select
                        className="input-field"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Creating...
                        </>
                    ) : (
                        initialData ? "Update Task" : "Create Task"
                    )}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
