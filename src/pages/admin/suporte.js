import BaseLayout from "@/components/BaseLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Suporte = () => {

  const router = useRouter();
  const [user, setUser] = useState(null);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // manda para a pagina de login quando nao tem token
        router.push("/auth/login");
      } else {
        const response = await fetch("/api/auth/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          // manda para o login se o token for invalido
          router.push("/auth/login");
        } else {
          // guarda os dados
          console.log("dados guardados")
          setUser(data.user);
        }
        if (data.user && !data.user.admin) {
          console.log("conta não admin");
          router.push("/armario");
        } else if (data.user && data.user.admin) {
          console.log("conta admin pode passar");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return <BaseLayout>Suporte Page</BaseLayout>;
};

export default Suporte;
