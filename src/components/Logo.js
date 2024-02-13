import React from "react";
import Image from "next/image";
export const Logo = () => (
    <Image
        width={80}
        height={80}
        className="rounded-2xl"
        src="/logo.png"
        alt="logo"
    />
);
