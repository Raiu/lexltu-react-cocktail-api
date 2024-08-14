import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <div>
            <Navbar>
                <NavbarBrand>
                    <p>Cocktail</p>
                </NavbarBrand>
                <NavbarContent>
                    <NavbarItem>
                        <NavLink to="/">Home</NavLink>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    );
}
