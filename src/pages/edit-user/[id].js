import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/auth/${id}`);
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Ocurreu um erro:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setApiResponse("As senhas não coincidem");
      return;
    }

    const formData = new FormData(event.target);
    const updatedUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    try {
      const response = await fetch(`/api/auth/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert("User updated successfully");
        router.push("/admin/utilizadores");
      } else {
        console.error("Update falhou");
      }
    } catch (error) {
      console.error("Ocurreu um erro:", error);
    }
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
      <div className="container mx-auto">
        {apiResponse && (
            <div className="bg-blue-200 text-blue-900 p-4 rounded">
              {apiResponse}
            </div>
        )}
        <div className="flex justify-center">
          <div className="w-1/2 bg-white shadow-md rounded p-6">
            <h2 className="text-2xl mb-6">Atualizar perfil</h2>
            <form onSubmit={handleFormSubmit} className="w-full">
              <div className="mb-4">
                <input
                    type="text"
                    className="bg-gray-100 rounded border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="name"
                    name="name"
                    placeholder="Introduza o seu nome"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                />
              </div>
              <div className="mb-4">
                <input
                    type="email"
                    className="bg-gray-100 rounded border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled
                />
              </div>
              <div className="mb-4">
                <input
                    type="password"
                    className="bg-gray-100 rounded border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Atualizar senha"
                    required
                />
              </div>
              <div className="mb-4">
                <input
                    type="password"
                    className={`bg-gray-100 rounded border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        !passwordMatch ? "border-red-500" : "focus:border-blue-500"
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {!passwordMatch && (
                    <p className="text-red-500">Passwords do not match</p>
                )}
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Atualizar
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  <Link href="/admin/utilizadores">Cancelar</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
