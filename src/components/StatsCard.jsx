const StatsCard = ({ title, value, icon: Icon, variant = "primary", trend }) => {
    const variants = {
        primary: "primary",
        success: "success",
        warning: "warning",
        info: "info"
    };

    return (
        <div className={`stats-card ${variants[variant]}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-400 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-2 ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 rounded-lg bg-slate-800/50">
                        <Icon className="w-6 h-6 text-slate-400" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
