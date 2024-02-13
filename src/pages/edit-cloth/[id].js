import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/styles/stylesLogin.module.css";
import {Container, Col, Row} from "reactstrap";

export default function EditClothingPage() {
    const router = useRouter();
    const { id } = router.query;
    const [cloth, setCloth] = useState({
        marca: "",
        tecido: "",
        tamanho: "",
        categoria: "",
        cor: "",
        estacao: "",
        temperatura: "",
        // outros campos...
    });
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        // Fetch clothing data based on the ID from the query parameter
        const fetchClothData = async () => {
            try {
                // Fetch clothing details using an API endpoint (replace with your endpoint)
                const response = await fetch(`/api/cloth/${id}`);
                const data = await response.json();
                console.log("----Clothing Details---", data);
                setCloth(data.cloth);
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        };

        if (id) {
            fetchClothData();
        }
    }, [id]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Extract updated clothing data from the form
        const formData = new FormData(event.target);
        const updatedCloth = {
            marca: formData.get("marca"),
            tecido: formData.get("tecido"),
            tamanho: formData.get("tamanho"),
            categoria: formData.get("categoria"),
            cor: formData.get("cor"),
            estacao: formData.get("estacao"),
            temperatura: formData.get("temperatura"),
            // other fields...
        };

        try {
            // Send updated clothing data to the server for processing
            const response = await fetch(`/api/cloth/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCloth),
            });

            if (response.ok) {
                console.log("Roupa atualizada");
                router.push("/armario"); // Redirect to the wardrobe page
            } else {
                console.error("Atualização falhou");
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
        }
    };

    if (!cloth) {
        return <p>Carregando roupa...</p>;
    }

    return (
        <>
        <Navbar/>
            <div className='pt-14'></div>
            <Container className={styles.container}>

            <div className={styles.container}>
            {apiResponse && (
                <div className="alert alert-primary" role="alert">
                    {apiResponse}
                </div>
            )}
            <div className="d-flex justify-content-center">
                <div className="card w-50 bg-transparent">
                    <div className="card-body pt-5">
                            <div className={styles.titulo}>
                                <h1 className={styles.h1}>Editar peça de roupa</h1>
                            </div>
                        <form onSubmit={handleFormSubmit} className={styles.credenciais}>
                            <Row className={styles.row}>
                                <Col className={styles.inputs}>
                                    <input
                                        type="text"
                                        className={styles.conta}
                                        id="marca"
                                        name="marca"
                                        placeholder="Marca da roupa"
                                        value={cloth.marca}
                                        onChange={(e) =>
                                            setCloth({ ...cloth, marca: e.target.value })
                                        }
                                        required
                                    />
                                </Col>
                                <Col className={styles.inputs}>
                                    <input
                                        type="text"
                                        className={styles.conta}
                                        id="tecido"
                                        name="tecido"
                                        placeholder="Tecido da roupa"
                                        value={cloth.tecido}
                                        onChange={(e) =>
                                            setCloth({ ...cloth, tecido: e.target.value })
                                        }
                                        required
                                    />
                                </Col>
                                <Col className={styles.inputs}>
                                    <input
                                        type="text"
                                        className={styles.conta}
                                        id="tamanho"
                                        name="tamanho"
                                        placeholder="Tamanho da roupa"
                                        value={cloth.tamanho}
                                        onChange={(e) =>
                                            setCloth({ ...cloth, tamanho: e.target.value })
                                        }
                                        required
                                    />
                                </Col>
                                <Col className={styles.inputs}>
                                <input
                                    type="text"
                                    className={styles.conta}
                                    id="categoria"
                                    name="categoria"
                                    placeholder="Categoria da roupa"
                                    value={cloth.categoria}
                                    onChange={(e) =>
                                        setCloth({ ...cloth, categoria: e.target.value })
                                    }
                                    required
                                />
                                </Col>
                                <Col className={styles.inputs}>
                                    <input
                                        type="text"
                                        className={styles.conta}
                                        id="cor"
                                        name="cor"
                                        placeholder="Cor da roupa"
                                        value={cloth.cor}
                                        onChange={(e) =>
                                            setCloth({ ...cloth, cor: e.target.value })
                                        }
                                        required
                                    />
                                </Col>
                                <Col className={styles.inputs}>
                                    <input
                                        type="text"
                                        className={styles.conta}
                                        id="estacao"
                                        name="estacao"
                                        placeholder="Estacao"
                                        value={cloth.estacao}
                                        onChange={(e) =>
                                            setCloth({ ...cloth, estacao: e.target.value })
                                        }
                                        required
                                    />
                                </Col>
                                <Col className={styles.inputs}>
                                <input
                                    type="text"
                                    className={styles.conta}
                                    id="temperatura"
                                    name="temperatura"
                                    placeholder="Temperatura (em °C)"
                                    value={cloth.temperatura}
                                    onChange={(e) =>
                                        setCloth({ ...cloth, temperatura: e.target.value })
                                    }
                                    required
                                />
                                </Col>
                                <div className="invalid-feedback">{}</div>
                            </Row>
                            <Row className={styles.rowBtn}>
                                <Col>
                                    <button className={styles.btnLogin} type="submit">
                                        Atualizar
                                    </button>
                                </Col>
                                <Col>
                                    <button className={styles.criarBTN} href="/armario">
                                        Voltar
                                    </button>
                                </Col>
                            </Row>
                        </form>

                    </div>
                </div>
            </div>
        </div>
            </Container>
        </>
    );
}
