import React, { useState, useEffect } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Tooltip,
} from "@nextui-org/react";
import { Logo } from "@/components/Logo";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import { GoGear } from "react-icons/go";

const hrefRoutes = [
    {
        hrefArmario: "/armario",
    },
    {
        hrefOutfits: "/outfits",
    },
    {
        hrefPerfil: "/perfil",
    },
];

export default function CustomNavbar() {
    const router = useRouter();
    const [minTemperature, setMinTemperature] = useState(null);
    const [maxTemperature, setMaxTemperature] = useState(null);

    const [weatherIcon, setWeatherIcon] = useState(null);


    const getWeatherData = async () => {
        try {
            const response = await fetch(
                "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day0.json"
            );

            if (response.ok) {
                const data = await response.json();
                const locationData = data.data.find(entry => entry.latitude === "41.6952");

                if (locationData) {
                    setMinTemperature(locationData.tMin);
                    setMaxTemperature(locationData.tMax);
                    const idWeatherType = String(locationData.idWeatherType).padStart(2, '0'); // Adiciona zero à esquerda se necessário
                    console.log(idWeatherType);
                    setWeatherIcon(`/meteorologia/w_ic_d_${idWeatherType}.svg`);
                }
            } else {
                console.error("Failed to fetch weather data");
            }
        } catch (error) {
            console.error("An error occurred while fetching weather data:", error);
        }
    };

    useEffect(() => {
        getWeatherData();
    }, []);


    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (response.ok) {
                // apaga o token e manda para a pagina de login
                localStorage.removeItem("token");
                router.push("/auth/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <Navbar position="static sticky top-0" className="flex justify-between items-center">
            <NavbarBrand>
                <div className="mr-3">
                    <Logo />
                </div>
                <p className="font-bold text-inherit">Online Closet</p>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        color={router.pathname === hrefRoutes[0].hrefArmario ? "success" : "foreground"}
                        href={hrefRoutes[0].hrefArmario}
                    >
                        Armario
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color={router.pathname === hrefRoutes[1].hrefOutfits ? "success" : "foreground"}
                        href={hrefRoutes[1].hrefOutfits}
                    >
                        Outfits
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <div className="flex gap-4">
                    <span>
                         <img
                             src={weatherIcon}
                             width={50}
                             height={50}
                             alt="Simbolo termometro"
                         />
                    </span>
                     <span>

                        <h1>Min: {minTemperature}°C</h1>
                        <h1>Max: {maxTemperature}°C</h1>
                    </span>
                        <Tooltip content="Definições">
                            <span className="text-default-400 cursor-pointer active:opacity-50">
                                <Link href={hrefRoutes[2].hrefPerfil}>
                                    <Button isIconOnly href="#" color="success" variant="light">
                                    <GoGear style={{ fontSize: "1.5rem" }} />
                                </Button>
                                </Link>
                            </span>
                        </Tooltip>
                        <Tooltip content="Logout">
              <span className="text-default-400 cursor-pointer active:opacity-50">
                <Button
                    isIconOnly
                    onClick={handleLogout}
                    as={Link}
                    href="#"
                    color="danger"
                    variant="light"
                >
                  <CiLogout style={{ fontSize: "1.5rem" }} />
                </Button>
              </span>
                        </Tooltip>
                    </div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}