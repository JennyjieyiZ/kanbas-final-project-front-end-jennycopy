import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
export default function Labs() {
    return (
        <div className="container-fluid">
            <hr/>
            <TOC/>
            <Routes>
                <Route path="/" element={<Navigate to="Kanbas"/>}/>
            </Routes>
            <hr/>
            <h1>Group Project</h1>'
            <hr/>
            <h2>Team Members: </h2>
            <h3>Yuang Li </h3>
            <h3>Jiazuo Zhang </h3>
            <h3>Jingyi Huang </h3>
            <h3>Jieyi Zhou </h3>
        </div>
    );
}
