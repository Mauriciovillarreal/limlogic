import React from 'react'
import "./Footer.css"
import { Container } from 'react-bootstrap'
export const Footer = () => {
    return (
        <footer>
            <Container >

            <div className="footer">
                <h1>
                    <div>
                        LIM
                    </div>
                    <div className='logoAzul'>
                        LOGIC
                    </div>
                </h1>
            </div>

            <div className='content'>
                <a href="https://www.instagram.com" target='_blanck'>

            <img src="./img/isnta.png" alt="" />
                </a>

            <h6>Copyright Lim Logic - 2025. Todos los derechos reservados</h6>
            </div>
            </Container>
        </footer>
    )
}
