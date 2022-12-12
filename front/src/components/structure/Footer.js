

const Footer = () => {
    return (
        <footer className="site-footer">
			<ul className="site-footer-cgv">
				<li>
					<i className="fa-solid fa-lock" aria-hidden="true"></i>
					Paiement sécurisé
				</li>
				<li>
					<i className="fa-solid fa-truck" aria-hidden="true"></i>
					Ma livraison offerte
				</li>
				<li>
					<i className="fa-solid fa-money-bill" aria-hidden="true"></i>
					Carte de fidélité
				</li>
				<li>
					<i className="fa-solid fa-phone" aria-hidden="true"></i>
					Service client
				</li>
				<li>
					<i className="fa-solid fa-circle-check" aria-hidden="true"></i>
					Garantie qualité
				</li>
			</ul>
			<nav className="site-footer-navs">
				
				<section>
					<h2>Cup of Tea</h2>
					<ul>
						<li><a href="#">Notre histoire</a></li>
						<li><a href="#">Nos boutiques</a></li>
						<li><a href="#">Le Thé de A à Z</a></li>
						<li><a href="#">Espace clients professionnels</a></li>
						<li><a href="#">Recrutement</a></li>
						<li><a href="#">Contactez-nous !</a></li>
						<li><a href="#">L'École du Thé</a></li>
					</ul>
				</section>
				
				<section>
					<h2>Commandez en ligne</h2>
					<ul>
						<li><a href="#">Première visite</a></li>
						<li><a href="#">Aide - FAQ</a></li>
						<li><a href="#">Service client</a></li>
						<li><a href="#">Suivre ma commande</a></li>
						<li><a href="#">Conditions générales de vente</a></li>
						<li><a href="#">Informations légales</a></li>
					</ul>
				</section>
				
				<section>
					<h2>Suivez-nous !</h2>
					<ul>
						<li><a href="#">Notre histoire</a></li>
						<li><a href="#">Nos boutiques</a></li>
						<li><a href="#">Le Thé de A à Z</a></li>
						<li><a href="#">Espace clients professionnels</a></li>
					</ul>
				</section>
			</nav>
			<p className="site-footer-mentions" style={{ marginBottom: "0" }}>
				<a rel="license" href="https://3wa.fr/propriete-materiel-pedagogique/">
                    <img alt="Propriété de la 3W Academy" style={{ borderWidth: "0" }} src="https://3wa.fr/wp-content/themes/3wa2015/img/logos/big.png" width="50" />
                </a>
		 	</p>
		</footer>
    )
}
  
export {
    Footer
}