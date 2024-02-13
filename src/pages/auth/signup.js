import React from 'react';
import styles from '@/styles/stylesRegistar.module.css';
import {Container, Col, Row} from "reactstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();
  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Por favor, insira seu nome");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!/^[a-zA-Z\s]*$/.test(name)) {
      setNameError("O seu nome apenas pode conter letras e espaços");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Por favor insira a sua senha");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!/(?=.*\d)(?=.*[A-Z]).{6,}/.test(password)) {
      setPasswordError(
          "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula e um número"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Por favor insira um e-mail válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    /*
        console.log("----- Form Submitted ------");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
    */
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log("---- Signup API Response ---");
    console.log(data);
    if (res.ok) {
      // registro feito
      const { token } = data;
      // armazenar o token
      localStorage.setItem('token', token);

      // Redirecionar para dashboard
      router.push('/auth/login');
    } else {
      // registro falhow, adicionar aviso **********************
      console.error(data.message);
      setApiResponse(data.message);
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
                <h1 className={styles.h1}>Bem vindo!</h1>
                <h2 className={styles.descricao}>Regista-te no nosso website!</h2>
              </div>
              <div className={styles.credenciais}>
                <form onSubmit={handleSubmit} className="was-validated">
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
                          type="text"
                          className={styles.conta}
                          id="name"
                          placeholder="Introduza o seu nome"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                      {nameError && <div className="invalid-feedback">{nameError}</div>}
                    </Col>
                  </Row>
                  <Row className={styles.row}>
                    <Col className={styles.icon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                      </svg>
                    </Col>
                    <Col className={styles.inputs}>
                      <input
                          type="email"
                          className={styles.conta}
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                      {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </Col>
                  </Row>
                  <Row className={styles.row}>
                    <Col className={styles.icon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                      </svg>
                    </Col>
                    <Col className={styles.inputs}>
                      <input
                          type="password"
                          className={styles.conta}
                          id="password"
                          placeholder="Introduza a senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                      {passwordError && (
                          <div className="invalid-feedback">{passwordError}</div>
                      )}
                    </Col>
                  </Row>
                  <Row className={styles.row}>
                    <Col className={styles.icon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                      </svg>
                    </Col>
                    <Col className={styles.inputs}>
                      <input
                          type="password"
                          className={styles.conta}
                          id="confirmPassword"
                          placeholder="Confirme sua senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                      />
                      {confirmPasswordError && (
                          <div className="invalid-feedback">{confirmPasswordError}</div>
                      )}
                    </Col>
                  </Row>
                  <div className={styles.botoes}>
                    <Row>
                      <Col>
                        <button className={styles.btnLogin} type="submit">Criar Conta</button>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.fim}>
                    <Row className={styles.rowFim}>
                      <Col>
                        <p>Já tem uma conta?</p>
                      </Col>
                      <Col>
                        <Link href="/auth/login" className={styles.criarBTN}>Iniciar sessão</Link>
                      </Col>
                    </Row>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Container>
      </div>
  );
};

export default Signup;