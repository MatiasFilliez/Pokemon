import styles from "./index.module.css"
import { NavLink, Link } from "react-router-dom"
export default function Landing() {

    return (
        <div className={styles.container}>
            <div>
                <NavLink to="/home" className={styles.link}>
                    <div className={styles.pokeball}><button className={styles.pokeButtom}></button></div>
                </NavLink>
            </div>
        </div>
    )
}
