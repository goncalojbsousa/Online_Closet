import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import styles from "@/styles/stylesLogin.module.css";
import { Container, Col, Row } from "reactstrap";

export default function EditOutfitPage() {
    const router = useRouter();
    const { id } = router.query;
    const [outfit, setOutfit] = useState({
        idTronco: "",
        idPernas: "",
        idPes: "",
        estacao: "",
        temperatura: "",
        image: null,
    });
    const [products, setProducts] = useState([]);
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await fetch(`/api/cloth/cloths?userId=${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.cloths) {
                        setProducts(data.cloths);
                        console.log("User's Products Received:", data.cloths);
                    } else {
                        console.log("No user products received or empty response.");
                    }
                } else {
                    throw new Error("Failed to get user products");
                }
            } catch (error) {
                console.error("An error occurred while fetching user products:", error);
            }
        };

        fetchUserProducts();
    }, []);

    useEffect(() => {
        const fetchOutfitData = async () => {
            try {
                const response = await fetch(`/api/outfit/${id}`);
                const data = await response.json();
                setOutfit(data.outfit);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        if (id) {
            fetchOutfitData();
        }
    }, [id]);

    const handleImageChange = (e) => {
        setOutfit({ ...outfit, image: e.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', outfit.image);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image URL:', data.imageUrl);
                const imageUrl = data.imageUrl || null;
                console.log(imageUrl);

                await updateOutfit(imageUrl);
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const updateOutfit = async (imageUrl) => {
        try {
            const response = await fetch(`/api/outfit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...outfit,
                    path: imageUrl,
                }),
            });

            if (response.ok) {
                console.log("Outfit updated");
                router.push("/outfits");
            } else {
                console.error("Update failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    if (!outfit) {
        return <p>Loading outfit...</p>;
    }

    return (
        <>
            <Navbar />
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
                                    <h1 className={styles.h1}>Editar outfit</h1>
                                </div>
                                <form onSubmit={handleSubmit} className={styles.credenciais}>
                                    <Row className={styles.row}>
                                        <Col className={styles.inputs}>
                                            <select
                                                value={outfit.idTronco}
                                                onChange={(e) => setOutfit({ ...outfit, idTronco: e.target.value })}
                                            >
                                                <option value="">Selecione a roupa do tronco</option>
                                                {products.map((cloth) => (
                                                    <option key={cloth.id} value={cloth.id}>
                                                        {cloth.marca} - {cloth.categoria}
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                        <Col className={styles.inputs}>
                                            <select
                                                value={outfit.idPernas}
                                                onChange={(e) => setOutfit({ ...outfit, idPernas: e.target.value })}
                                            >
                                                <option value="">Selecione a roupa das pernas</option>
                                                {products.map((cloth) => (
                                                    <option key={cloth.id} value={cloth.id}>
                                                        {cloth.marca} - {cloth.categoria}
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                        <Col className={styles.inputs}>
                                            <select
                                                value={outfit.idPes}
                                                onChange={(e) => setOutfit({ ...outfit, idPes: e.target.value })}
                                            >
                                                <option value="">Selecione a roupa dos pés</option>
                                                {products.map((cloth) => (
                                                    <option key={cloth.id} value={cloth.id}>
                                                        {cloth.marca} - {cloth.categoria}
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row className={styles.row}>
                                        <Col className={styles.inputs}>
                                            <input
                                                isRequired
                                                variant="bordered"
                                                label="Estação do ano"
                                                placeholder="Introduza a estação do ano"
                                                className="max-w-lg"
                                                type="text"
                                                id="estacao"
                                                value={outfit.estacao}
                                                onChange={(e) => setOutfit({ ...outfit, estacao: e.target.value })}
                                            />
                                        </Col>
                                        <Col className={styles.inputs}>
                                            <input
                                                isRequired
                                                variant="bordered"
                                                label="Temperatura"
                                                placeholder="Introduza a temperatura"
                                                className="max-w-lg"
                                                type="text"
                                                id="temperatura"
                                                value={outfit.temperatura}
                                                onChange={(e) => setOutfit({ ...outfit, temperatura: e.target.value })}
                                            />
                                        </Col>
                                        <Col className={styles.inputs}>
                                            <input
                                                isRequired
                                                type="file"
                                                accept="image/*"
                                                variant="bordered"
                                                name="image"
                                                id="image"
                                                onChange={handleImageChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={styles.rowBtn}>
                                        <Col>
                                            <button className={styles.btnLogin} type="submit">
                                                Atualizar
                                            </button>
                                        </Col>
                                        <Col>
                                            <button className={styles.criarBTN} href="/outfits">
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
