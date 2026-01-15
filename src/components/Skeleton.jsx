const Skeleton = ({ className = "", variant = "text" }) => {
    const variants = {
        text: "h-4 w-3/4",
        title: "h-8 w-1/2",
        card: "h-32 w-full",
        avatar: "h-10 w-10 rounded-full",
        button: "h-10 w-24"
    };

    return (
        <div className={`skeleton ${variants[variant]} ${className}`} />
    );
};

// Stats Card Skeleton
export const StatsCardSkeleton = () => (
    <div className="stats-card">
        <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton variant="avatar" className="!rounded-lg" />
        </div>
    </div>
);

// Task Card Skeleton
export const TaskCardSkeleton = () => (
    <div className="task-card">
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-28" />
            </div>
        </div>
    </div>
);

export default Skeleton;
