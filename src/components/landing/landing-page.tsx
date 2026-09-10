import {
	ArrowUpRight,
	Check,
	Clapperboard,
	Heart,
	Play,
	RotateCcw,
	Shuffle,
	Users,
	X,
} from "lucide-react";
import { useState } from "react";
import "./landing.css";

const films = [
	{
		title: "Knives Out",
		image: "knives-out",
		year: "2019",
		detail: "A little mystery. A lot of suspects.",
	},
	{
		title: "The Grand Budapest Hotel",
		image: "grand-budapest",
		year: "2014",
		detail: "An adventure worth checking into.",
	},
	{
		title: "Everything Everywhere All at Once",
		image: "everything-everywhere",
		year: "2022",
		detail: "Something a little out of this world.",
	},
];

export function Wordmark() {
	return (
		<a className="mn-wordmark" href="/" aria-label="MovieNight home">
			<span className="mn-brand-icon">
				<Clapperboard size={23} aria-hidden="true" />
			</span>
			MovieNight<span className="mn-wordmark-dot">.</span>
		</a>
	);
}

function GroupDemo() {
	const [index, setIndex] = useState(0);
	const [matched, setMatched] = useState(false);
	const film = films[index];
	const next = () => {
		setMatched(false);
		setIndex((current) => (current + 1) % films.length);
	};
	return (
		<div
			className={`mn-demo ${matched ? "mn-demo-matched" : ""}`}
			id="demo"
			tabIndex={-1}
			aria-label="Interactive group movie-night preview">
			<div className="mn-demo-header">
				<div className="mn-group-name">
					<span>
						<Users size={18} aria-hidden="true" />
					</span>
					<div>
						Friday film club<small>Three friends. One good film.</small>
					</div>
				</div>
				<div className="mn-avatars" aria-label="You, Maya and Sam">
					<span className="mn-avatar mn-avatar-you">You</span>
					<span className="mn-avatar mn-avatar-maya">M</span>
					<span className="mn-avatar mn-avatar-sam">S</span>
				</div>
			</div>
			<div className="mn-poster-stage">
				<img
					className="mn-poster-wing mn-poster-left"
					src={`/images/landing/${films[(index + 1) % 3].image}.jpg`}
					alt=""
					width="500"
					height="750"
				/>
				<img
					className="mn-poster-wing mn-poster-right"
					src={`/images/landing/${films[(index + 2) % 3].image}.jpg`}
					alt=""
					width="500"
					height="750"
				/>
				<div className="mn-featured-poster">
					<img
						src={`/images/landing/${film.image}.jpg`}
						alt={`${film.title} poster`}
						width="500"
						height="750"
					/>
					<span className="mn-poster-votes">
						<Heart size={13} fill="currentColor" aria-hidden="true" />
						{matched ? "It's a match" : "Two friends are in"}
					</span>
				</div>
				{matched && (
					<span className="mn-match-seal">
						<Check size={28} strokeWidth={3} aria-hidden="true" />
					</span>
				)}
			</div>
			<div className="mn-demo-caption">
				<span>{film.year}</span>
				<h2>{film.title}</h2>
				<p>{film.detail}</p>
			</div>
			<div className="mn-demo-decision" aria-live="polite" aria-atomic="true">
				{matched ? (
					<>
						<span className="mn-decision-title">That's tonight sorted.</span>
						<span>You, Maya and Sam all want to watch.</span>
					</>
				) : (
					<>
						<span className="mn-decision-title">Maya and Sam are in.</span>
						<span>Your turn. Would you watch it?</span>
					</>
				)}
			</div>
			<div className="mn-demo-actions">
				<button type="button" className="mn-demo-next" onClick={next}>
					<span>{matched ? <RotateCcw size={18} /> : <X size={18} />}</span>
					{matched ? "Try another" : "Next film"}
				</button>
				<button
					type="button"
					className="mn-demo-like"
					onClick={() => setMatched(true)}
					disabled={matched}>
					<Check size={19} aria-hidden="true" />
					{matched ? "Everyone's in" : "I'm in"}
				</button>
			</div>
			<p className="mn-demo-note">A little preview of your next movie night.</p>
		</div>
	);
}

export default function LandingPage() {
	return (
		<div className="mn-landing" id="top">
			<a className="mn-skip" href="#main">
				Skip to content
			</a>
			<header className="mn-header mn-container">
				<Wordmark />
				<nav aria-label="Main navigation">
					<a href="#how-it-works">Why MovieNight?</a>
					<a className="mn-nav-cta" href="#release">
						Coming soon <ArrowUpRight size={16} aria-hidden="true" />
					</a>
				</nav>
			</header>
			<main id="main">
				<section className="mn-hero mn-container" aria-labelledby="hero-title">
					<div className="mn-hero-copy">
						<h1 id="hero-title">
							Less scrolling.
							<br />
							More movie
							<br className="mn-desktop-break" /> night.
						</h1>
						<p>
							Find a film you all want to watch.
							<br />
							With the people you want to watch it with.
						</p>
						<a className="mn-primary-cta" href="#demo">
							<Play size={17} fill="currentColor" aria-hidden="true" />
							Try a group pick
						</a>
						<span className="mn-hero-note">
							Made for date nights, sofa nights and “one more?” nights.
						</span>
						<div className="mn-hero-proof">
							<span className="mn-tiny-avatars" aria-hidden="true">
								<i>M</i>
								<i>S</i>
								<i>You</i>
							</span>
							<span>
								Different tastes.
								<br />
								<strong>One very good plan.</strong>
							</span>
						</div>
					</div>
					<GroupDemo />
				</section>
				<section
					className="mn-benefits mn-container"
					id="how-it-works"
					aria-labelledby="benefits-title">
					<div className="mn-section-intro">
						<h2 id="benefits-title">
							The best part?
							<br />
							You choose together.
						</h2>
						<p>
							From “what shall we watch?” <br />
							to pressing play.
						</p>
					</div>
					<div className="mn-benefit-list">
						<article>
							<span className="mn-benefit-icon mn-lilac">
								<Users size={24} aria-hidden="true" />
							</span>
							<div>
								<h3>Find your common ground.</h3>
								<p>
									Bring your friends, save your favourites and find the films
									you agree on.
								</p>
							</div>
						</article>
						<article>
							<span className="mn-benefit-icon mn-blue">
								<Shuffle size={24} aria-hidden="true" />
							</span>
							<div>
								<h3>Your taste. A few surprises.</h3>
								<p>
									Discover films you'll love, with room for something you
									wouldn't have picked yourself.
								</p>
							</div>
						</article>
						<article>
							<span className="mn-benefit-icon mn-mint">
								<Play size={23} aria-hidden="true" />
							</span>
							<div>
								<h3>A pick you can actually play.</h3>
								<p>
									Find films on your group's streaming services. Watching apart?
									Choose something everyone can access.
								</p>
							</div>
						</article>
					</div>
				</section>
				<section
					className="mn-release mn-container"
					id="release"
					aria-labelledby="release-title">
					<div className="mn-release-inner">
						<div>
							<span className="mn-release-status">
								<span />
								In the making
							</span>
							<h2 id="release-title">
								Make room for
								<br />a better movie night.
							</h2>
							<p>
								MovieNight is coming to iOS and Android.
								<br />
								We're putting the finishing touches on it.
							</p>
						</div>
						<div className="mn-release-action">
							<a href="#demo">
								<Play size={18} fill="currentColor" aria-hidden="true" />
								Explore the demo
							</a>
							<span>No download needed.</span>
						</div>
					</div>
				</section>
			</main>
			<footer className="mn-footer mn-container">
				<div>
					<Wordmark />
					<p>Good films. Better company.</p>
				</div>
				<div className="mn-footer-links">
					<a href="/privacy">Privacy policy</a>
					<a href="/terms">Terms of Service</a>
					<a href="mailto:support@movienightapp.co.uk">Contact us</a>
					<a
						href="https://www.themoviedb.org/"
						target="_blank"
						rel="noreferrer">
						Film artwork from TMDB <ArrowUpRight size={13} aria-hidden="true" />
					</a>
					<small>
						This product uses the TMDB API but is not endorsed or certified by
						TMDB.
					</small>
				</div>
			</footer>
		</div>
	);
}
