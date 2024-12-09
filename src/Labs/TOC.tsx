import { useLocation } from "react-router";
export default function TOC() {
    const { pathname } = useLocation();
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <a id="wd-k" href="#/Kanbas" className="nav-link">
                    Kanbas
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-github" href="https://github.com/nononoononon/kanbas-final-project-front-end"
                   className="nav-link">
                    GitHub for react
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-github" href="https://fianlprojectofwebdev.netlify.app" className="nav-link">
                    react server on Netlify
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-github" href="https://github.com/nononoononon/kanbas-node-server-app"
                   className="nav-link">
                    My GitHub for node server
                </a>
            </li>
            <li className="nav-item">
                <a id="wd-github" href="https://kanbas-final-project-f4da.onrender.com" className="nav-link">
                    Node server on Render
                </a>
            </li>

        </ul>
    );
}
