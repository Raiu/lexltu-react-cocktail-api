import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
/*     NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem, */
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export function Header() {
    const handleClearCookies = () => {
        console.log("Clearing cookies");
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/;SameSite=None;Secure"
                );
        });
        localStorage.clear();
    };

    const handleClearSession = () => {
        console.log("Clearing session");
        sessionStorage.clear();
    };

    return (
        <div className="">
            <Navbar>
                <NavbarBrand>
                    <p>Cocktail</p>
                </NavbarBrand>
                <NavbarContent className="gap-4" justify="end">
                    <NavbarItem>
                        <NavLink to="/">Home</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to="/search">Search</NavLink>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent as="div" justify="end">
                    <Dropdown>
                        <DropdownTrigger>
                            <Avatar name="User" />
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="favorites">Favorites</DropdownItem>
                            <DropdownItem key="clearCookies" onClick={handleClearCookies}>
                                Clear cookies
                            </DropdownItem>
                            <DropdownItem key="clearSession" onClick={handleClearSession}>
                                Clear session
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div>
    );
}
