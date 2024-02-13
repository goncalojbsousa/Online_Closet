import React from 'react';
import styles from '../../styles/stylesLogin.module.css';
import {Container, Col, Row} from "reactstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [apiResponse, setApiResponse] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    // Redirect to the login page if token is not found
                    router.push("/auth/login");
                } else {
                    const response = await fetch("/api/auth/check-auth", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        // Redirect to the login page if the token is invalid
                        router.push("/auth/login");
                    } else {
                        router.push("/armario");
                    }
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        };
        checkAuthentication();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            const { token } = data;
            // Save the token to localStorage or a cookie
            localStorage.setItem("token", token);
            console.log("----Login API Response---\n", data);
            if (res.ok) {
                setApiResponse("Processando . . . .");
                console.log("login com sucesso...");
                router.push("/armario");
            } else {
                setApiResponse(data.message);
            }
        } catch (error) {
            setApiResponse("Erro de servidor");
        }
    };

    return (
        <div className={styles.caixa}>
            <Container className={styles.container}>
                <Col className={styles.col}>
                    <div className={styles.content}>
                        <img src="/logo.PNG" alt="Logo do Projeto de Gestão de Roupa" className={styles.imagem}/>
                    </div>
                </Col>
                <Col className={styles.col}>
                    <div className={styles.content}>
                        <div className={styles.titulo}>
                            <h1 className={styles.h1}>Bem-vindo!</h1>
                            <h2 className={styles.descricao}>Obrigado por nos vistar novamente!</h2>
                        </div>

                        <form onSubmit={handleSubmit}  className={styles.credenciais}>
                            {apiResponse && (
                                <div className="alert alert-danger" role="alert">
                                    {apiResponse}
                                </div>
                            )}

                            <Row className={styles.row}>
                                <Col className={styles.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                    </svg>
                                </Col>
                                <Col className={styles.inputs}>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Introduza o seu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.conta} required
                                    />
                                </Col>
                            </Row><Row className={styles.row}>
                            <Col className={styles.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                            </Col>
                            <Col className={styles.inputs}>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Introduza a sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.conta}
                                    required
                                />

                            </Col>
                        </Row>
                            <Row>
                                <Col>
                                    <a className={styles.esqueceu} href="">Esqueci-me da palavra-passe</a>
                                </Col>
                            </Row>

                            <div className={styles.botoes}>
                                <Row className={styles.rowBtn}>
                                    <Col>
                                        <button className={styles.btnLogin} type="submit">Login</button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                        <div className={styles.fim} >
                            <Row className={styles.rowFim}>
                                <Col>
                                    <p className="pt-14">Ainda não tem uma conta?</p>
                                </Col>
                                <Col>
                                    <Link href="/auth/signup" className={styles.criarBTN}>Criar Conta</Link>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Container>
        </div>
    );
};

export default Login;