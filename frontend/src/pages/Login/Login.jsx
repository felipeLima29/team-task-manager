import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { useAuth } from "../../hooks/useAuth";



export default function Login() {

    const { login, user } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            
            await login({ email, password });
            console.log("Login bem-sucedido!", user.name);

        } catch (error) {

            const message = error.response?.data?.message || "Erro ao fazer login";
            setError(message);

            console.error("Erro ao fazer login:", message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className={styles.loginContainer}>

            <div className={styles.leftSide}>

            </div>


            <div className={styles.rightSide}>
                <div className={styles.loginForm}>
                    <h3 className={styles.title}>Welcome Back</h3>
                    <p className={styles.text}>Digite suas informações abaixo!</p>

                    <form className={styles.inputs} onSubmit={handleSubmit}>
                        <Input
                            label="E-mail"
                            name="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Senha"
                            name="password"
                            type="password"
                            placeholder="Digite seu password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit" disabled={loading}
                        >
                            {loading ? "Carregando..." : "Entrar"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}