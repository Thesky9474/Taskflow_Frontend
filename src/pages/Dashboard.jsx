import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import { StatsCardSkeleton, TaskCardSkeleton } from "../components/Skeleton";
import { getTasks, getTaskStats } from "../api/taskApi";

// Icons
const TotalIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
);

const OpenIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
);

const InProgressIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
);

const DoneIcon = (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
);

const Dashboard = () => {
        const [stats, setStats] = useState(null);
        const [recentTasks, setRecentTasks] = useState([]);
        const [loading, setLoading] = useState(true);
        const userId = localStorage.getItem("userId");

        useEffect(() => {
                const fetchData = async () => {
                        if (!userId) return;

                        try {
                                const [statsData, tasksData] = await Promise.all([
                                        getTaskStats(userId),
                                        getTasks(userId, 0, 5)
                                ]);
                                setStats(statsData);
                                setRecentTasks(tasksData.content || []);
                        } catch (error) {
                                console.error("Failed to fetch dashboard data:", error);
                        } finally {
                                setLoading(false);
                        }
                };

                fetchData();
        }, [userId]);

        const statusLabels = {
                OPEN: "Open",
                IN_PROGRESS: "In Progress",
                DONE: "Completed"
        };

        const priorityColors = {
                HIGH: "text-rose-400",
                MEDIUM: "text-amber-400",
                LOW: "text-emerald-400"
        };

        return (
                <div className="space-y-8 animate-fade-in">
                        <Header
                                title="Dashboard"
                                subtitle="Welcome back! Here's your task overview."
                        >
                                <Link to="/tasks" className="btn btn-primary">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        New Task
                                </Link>
                        </Header>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {loading ? (
                                        <>
                                                <StatsCardSkeleton />
                                                <StatsCardSkeleton />
                                                <StatsCardSkeleton />
                                                <StatsCardSkeleton />
                                        </>
                                ) : (
                                        <>
                                                <StatsCard
                                                        title="Total Tasks"
                                                        value={stats?.total || 0}
                                                        icon={TotalIcon}
                                                        variant="primary"
                                                />
                                                <StatsCard
                                                        title="Open"
                                                        value={stats?.open || 0}
                                                        icon={OpenIcon}
                                                        variant="info"
                                                />
                                                <StatsCard
                                                        title="In Progress"
                                                        value={stats?.inProgress || 0}
                                                        icon={InProgressIcon}
                                                        variant="warning"
                                                />
                                                <StatsCard
                                                        title="Completed"
                                                        value={stats?.done || 0}
                                                        icon={DoneIcon}
                                                        variant="success"
                                                />
                                        </>
                                )}
                        </div>

                        {/* Recent Tasks */}
                        <div className="glass rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-white">Recent Tasks</h2>
                                        <Link to="/tasks" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                                                View all →
                                        </Link>
                                </div>

                                {loading ? (
                                        <div className="space-y-4">
                                                <TaskCardSkeleton />
                                                <TaskCardSkeleton />
                                                <TaskCardSkeleton />
                                        </div>
                                ) : recentTasks.length === 0 ? (
                                        <div className="text-center py-12">
                                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                </div>
                                                <p className="text-slate-400">No tasks yet. Create your first task!</p>
                                                <Link to="/tasks" className="btn btn-primary mt-4">
                                                        Create Task
                                                </Link>
                                        </div>
                                ) : (
                                        <div className="overflow-x-auto">
                                                <table className="w-full">
                                                        <thead>
                                                                <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                                                                        <th className="pb-3 font-medium">Task</th>
                                                                        <th className="pb-3 font-medium">Priority</th>
                                                                        <th className="pb-3 font-medium">Status</th>
                                                                </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-700/50">
                                                                {recentTasks.map((task) => (
                                                                        <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                                                                                <td className="py-4">
                                                                                        <p className="font-medium text-white">{task.title}</p>
                                                                                        {task.description && (
                                                                                                <p className="text-sm text-slate-400 truncate max-w-md">{task.description}</p>
                                                                                        )}
                                                                                </td>
                                                                                <td className="py-4">
                                                                                        <span className={`font-medium ${priorityColors[task.priority] || priorityColors.MEDIUM}`}>
                                                                                                {task.priority || "MEDIUM"}
                                                                                        </span>
                                                                                </td>
                                                                                <td className="py-4">
                                                                                        <span className={`px-2.5 py-1 rounded text-xs font-medium status-${task.status.toLowerCase().replace("_", "-")}`}>
                                                                                                {statusLabels[task.status]}
                                                                                        </span>
                                                                                </td>
                                                                        </tr>
                                                                ))}
                                                        </tbody>
                                                </table>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default Dashboard;
