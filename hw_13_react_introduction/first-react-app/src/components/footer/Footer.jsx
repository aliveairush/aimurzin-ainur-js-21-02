import React from 'react'

import './Footer.css'

export class Footer extends React.Component {
    render() {
        return <footer className="page-footer page-footer_dark">
            <h4 className="page-footer__contacts">Контакты</h4>
            <h4 className="page-footer__owner">© 2021 ИП Рыбов О.А.</h4>
        </footer>
    }
}