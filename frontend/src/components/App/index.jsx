import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'


export default function App() {
    return (
        <>

            <Routes>
                <Route path="/" element={<HomePage />} />
                
            </Routes>
        </>
    );
}
