import StatCard from '../../components/StatCard/StatCard';
import Input from '../../components/Input/Input';
import styles from './Dashboard.module.css';

export default function Dashboard() {


    return (

        <div className={styles.dashboard}>

            <div className={styles.search}>

                <Input
                    label="Pesquisar Tarefas"
                    type="text"
                    placeholder="Digite o nome da tarefa"
                />

            </div>

            <main className={styles.content}>

                <div className={styles.statCard}>

                    <StatCard
                        tittle="Projeto ativos"
                    />

                    <StatCard
                        tittle="Projetos finalizados"
                    />

                    <StatCard
                        tittle="Tarefas pendentes"
                    />

                    <StatCard
                        tittle="Tarefas atrasados"
                    />
                    
                </div>



            </main>

        </div>

    )

}