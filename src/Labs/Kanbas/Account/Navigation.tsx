import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { pathname } = useLocation();
    const links = currentUser
        ? [{ label: "Profile", path: "/Kanbas/Account/Profile" }]
        : [
            { label: "Signin", path: "/Kanbas/Account/Signin" },
            { label: "Signup", path: "/Kanbas/Account/Signup" }
        ];
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    id={`wd-account-${link.label.toLowerCase()}-link`}
                    className={`list-group-item border border-0 ${
                        pathname.includes(link.label) ? "active text-black bg-white" : "text-danger"
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}