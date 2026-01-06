import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { BookOpen, Settings, Trophy, LayoutDashboard } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="container" style={{ position: 'relative', paddingBottom: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '2rem', paddingTop: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LayoutDashboard size={24} />
                    建設業経理士1級
                </h1>
            </header>

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '600px',
                backgroundColor: 'hsl(var(--card))',
                borderTop: '1px solid hsl(var(--border))',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-around',
                zIndex: 50,
                boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                <NavItem to="/" icon={<BookOpen size={24} />} label="学習" active={isActive('/')} />
                <NavItem to="/stats" icon={<Trophy size={24} />} label="成績" active={isActive('/stats')} />
                <NavItem to="/settings" icon={<Settings size={24} />} label="設定" active={isActive('/settings')} />
            </nav>
        </div>
    );
};

const NavItem = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
    <Link to={to} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        textDecoration: 'none',
        color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
        fontSize: '0.75rem',
        fontWeight: active ? 600 : 400,
        transition: 'color 0.2s'
    }}>
        {icon}
        <span>{label}</span>
    </Link>
);

export default Layout;
