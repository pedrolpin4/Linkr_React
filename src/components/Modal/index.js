import { motion } from 'framer-motion';

import BackDrop from '../BackDrop/index.js';
import "./Modal.css";

export default function Modal({ children, handleClose }) {
    return (
        <BackDrop onClick={handleClose}>
            <motion.div
                className="modal"
                onClick={ e => e.stopPropagation() }
                variants={ dropIn }
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                { children }
                <button onClick={handleClose} className="close-button">Close</button>
            </motion.div>
        </BackDrop>
    )
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 80,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
}