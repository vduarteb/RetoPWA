import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

var md5 = require('md5');

const Personaje = () => {
    const [personaje, setPersonaje] = useState("");
    const PRIVATE_KEY_MARVEL = "3fc30a0165abc0463b1174a37079744d6e10f61c";
    const PUBLIC_KEY_MARVEL = "60d06daa6826137f712d80fc0f0b5d4c";
    const URL = "https://gateway.marvel.com/v1/public/characters";

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("personaje") === null) {
                console.log("No se pueden traer los elementos")
            } else {
                setPersonaje(JSON.parse(localStorage.getItem('personaje')));
            }
        } else {
            const ts = Number(new Date());
            const hash = md5(ts + PRIVATE_KEY_MARVEL + PUBLIC_KEY_MARVEL);
            fetch(URL + `?ts=${ts}&orderBy=name&limit=10&apikey=${PUBLIC_KEY_MARVEL}&hash=${hash}`)
            .then(res => res.json())
            .then(res => {
                setPersonaje(res.data.results);
                localStorage.setItem("personaje", JSON.stringify(res.data.results));
            });
        }
    }, []);

    return (
        <div className="container">
            <h1>
                Personajes de Marvel
            </h1>
            <Container>
                <Row>
                    {personaje && personaje.map(p => {
                        return (
                            <Col md={4}>
                                <Card>
                                    <Card.Img variant="top" src={p.thumbnail.path + `.${p.thumbnail.extension}`} />
                                    <Card.Body>
                                        <Card.Title>{p.name}</Card.Title>
                                        <Card.Text>{p.description}</Card.Text>
                                        <Button variant="primary" href={p.urls[0].url}>Mas Info</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default Personaje;