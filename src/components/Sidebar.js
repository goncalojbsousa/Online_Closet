import Image from "next/image";
import { BsPeople } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import { GiRibbonMedal } from "react-icons/gi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import { FaStore } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const sidebarItems = [
    {
        name: "Home",
        href: "/",
        icon: IoHomeOutline,},
    {
        name: "Utilizadores",
        href: "/admin/utilizadores",
        icon: BsPeople,
    },
    {
        name: "Marketplace",
        href: "/admin/marketplace",
        icon: FaStore,
    },
    {
        name: "Medalhas",
        href: "/admin/medalhas",
        icon: GiRibbonMedal,
    },
    {
        name: "Suporte",
        href: "/armario",
        icon: BiMessageAltDetail,
    },
];

const Sidebar = () => {
    const router = useRouter();
    const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

    return (
        <div className="sidebar__wrapper">
            <button className="btn" onClick={toggleSidebarcollapse}>
                {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed}>
                <div className="sidebar__top">
                    <Image
                        width={80}
                        height={80}
                        className="sidebar__logo"
                        src="/logo.png"
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">Online Closet</p>
                </div>
                <ul className="sidebar__list">
                    {sidebarItems.map(({ name, href, icon: Icon }) => (
                        <li className="sidebar__item" key={name}>
                            <Link
                                className={`sidebar__link ${
                                    router.pathname === href ? "sidebar__link--active" : ""
                                }`}
                                href={href}
                            >
                <span className="sidebar__icon">
                  <Icon />
                </span>
                                <span className="sidebar__name">{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="sidebar__bottom"> {/* Mantém o botão de logout no final */}
                    <ul className="sidebar__list">
                        <li className="sidebar__item" key="Logout">
                            <Link
                                className={`sidebar__link ${
                                    router.pathname === "/auth/login" ? "sidebar__link--active" : ""
                                }`}
                                href="/login"
                            >
                <span className="sidebar__icon">
                  <CiLogout />
                </span>
                                <span className="sidebar__name">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
