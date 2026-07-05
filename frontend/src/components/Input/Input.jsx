import styles from "./Input.module.css";

export default function Input({
    label,
    type = "text",
    placeholder,
    name,
    value,
    onChange,
}) {

    return (
        <div className={styles.inputGroup}>
            <label htmlFor={name}>
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
            />

        </div>
    )
}