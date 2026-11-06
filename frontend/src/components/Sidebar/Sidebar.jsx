import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (

        <aside className={styles.sidebar}>

            <div className={styles.logo}>

                Aplicação de Gestão de Tarefas

            </div>

            <nav className={styles.navigation}>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? styles.active : ''
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/tasks"
                    className={({ isActive }) => isActive ? styles.active : ''
                    }
                >
                    Tarefas
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => isActive ? styles.active : ''
                    }
                >
                    Perfil
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => isActive ? styles.active : ''
                    }
                >
                    Configurações
                </NavLink>

            </nav>

        </aside>


    )
}