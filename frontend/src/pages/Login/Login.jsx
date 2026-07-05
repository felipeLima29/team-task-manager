import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";

export default function Login() {
    return (
        <div className={styles.loginContainer}>

            <div className={styles.leftSide}>

            </div>


            <div className={styles.rightSide}>
                <div className={styles.loginForm}>
                    <h3 className={styles.title}>Welcome Back</h3>
                    <p className={styles.text}>Digite suas informações abaixo!</p>

                    <form className={styles.inputs}>
                        <Input
                            label="E-mail"
                            name="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                        />

                        <Input
                            label="Senha"
                            name="password"
                            type="password"
                            placeholder="Digite seu password"
                        />

                        <Button type="submit">
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}