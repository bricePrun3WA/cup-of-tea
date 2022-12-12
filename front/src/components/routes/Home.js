const Home = () => {
    return (
        <>
            <header className="main-header">
                <h1>C'est noël chez Cup of Tea, profitez-en !</h1>
                <img src="/img/offre-noel.jpg" alt="Offre spéciale pour noel ! Dès 45€ d'achat, le photophore de noël vous sera offert. Et dès 85€ un thé vert au prune et coing de 100 gramme vous sera offert" />
                <p>Pour toute commande effectuée avant le 20 décembre</p>
            
                <div className="slider">
                    <figure className="slider-figure is-active">
                        <img src="/img/slider/1.jpg" alt="Retrouvez toute nos idées cadeaux pour les fêtes de noël" />
                    </figure>
                    <figure className="slider-figure">
                        <img src="/img/slider/2.jpg" alt="Thé 25" />
                    </figure>
                    <nav className="slider-nav">
                        <a href="#" rel="prev" className="slider-nav-link prev" aria-label="Précédente">
                            <i className="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>
                        </a>
                        <a href="#" rel="next" className="slider-nav-link next" aria-label="Suivante">
                            <i className="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>
                        </a>
                    </nav>
                </div>
            </header>
            <nav className="main-section products-nav">
                <h2 className="main-section-title"><span>Choisissez votre thé</span></h2><br/><br/>
                <a href="#">
                    <img src="/img/tea/1.jpg" alt="Tasse de thé noir" />
                    Thé noir
                </a>
                <a href="#">
                    <img src="/img/tea/2.jpg" alt="Tasse de thé vert" />
                    Thé vert
                </a>
                <a href="#">
                    <img src="/img/tea/3.jpg" alt="Tasse de oolong" />
                    Oolong
                </a>
                <a href="#">
                    <img src="/img/tea/4.jpg" alt="Tasse de thé blanc" />
                    Thé blanc
                </a>
                <a href="#">
                    <img src="/img/tea/5.jpg" alt="Tasse de rooibos" />
                    Rooibos
                </a>
            </nav>
            <div className="main-section feed">
                <article className="feed-article">
                    <header className="article-header">
                        <p className="main-section-title">
                            <span>Notre nouveauté</span>
                        </p>
                        <img src="/img/product/product1.jpg" alt="Thé du Hammam" />
                        <h2>Thé du hammam</h2>
                    </header>					
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>					
                    <p>À partir de <strong>8,50€</strong></p>					
                    <a className="article-link" href="#">Voir ce produit</a>
                </article>
                <article className="feed-article">
                    <header className="article-header">
                        <p className="main-section-title">
                            <span>Notre best-seller</span>
                        </p>
                        <img src="/img/product/product2.jpg" alt="Thé du Hammam" />
                        <h2>Thé du hammam</h2>
                    </header>					
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>					
                    <p>À partir de <strong>7,60€</strong></p>					
                    <a className="article-link" href="#">Voir ce produit</a>
                </article>
                <article className="feed-article">
                    <header className="article-header">
                        <p className="main-section-title">
                            <span>Notre coup de coeur</span>
                        </p>
                        <img src="/img/product/product3.jpg" alt="Thé du Hammam" />
                        <h2>Thé du hammam</h2>
                    </header>					
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>					
                    <p>À partir de <strong>9,00€</strong></p>					
                    <a className="article-link" href="#">Voir ce produit</a>
                </article>				
            </div>
        </>
    )
}

export {
    Home
}