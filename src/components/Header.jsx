const Header = ({ title, subtitle, children }) => {
    return (
        <header className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">{title}</h1>
                    {subtitle && (
                        <p className="text-slate-400 mt-1">{subtitle}</p>
                    )}
                </div>
                {children && (
                    <div className="flex items-center gap-3">
                        {children}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
