import { useEffect } from "react";
import { Wordmark } from "../landing/landing-page";
import policies from "./policies.json";
import "./legal.css";

export default function LegalPage({ kind }: { kind: keyof typeof policies }) {
	const policy = policies[kind];
	useEffect(() => {
		document.title = `${policy.title} — MovieNight`;
		document
			.querySelector('meta[name="description"]')
			?.setAttribute("content", policy.intro);
	}, [policy]);
	return (
		<div className="mn-landing mn-legal" id="top">
			<a className="mn-skip" href="#main">
				Skip to content
			</a>
			<header className="mn-header mn-container">
				<Wordmark />
				<a className="mn-nav-cta" href="/">
					Back to MovieNight
				</a>
			</header>
			<main className="mn-container mn-legal-layout" id="main">
				<div className="mn-legal-heading">
					<nav aria-label="Legal pages">
						<a
							href="/privacy"
							aria-current={kind === "privacy" ? "page" : undefined}>
							Privacy Policy
						</a>
						<a
							href="/terms"
							aria-current={kind === "terms" ? "page" : undefined}>
							Terms of Service
						</a>
					</nav>
					<h1>{policy.title}</h1>
					<p>{policy.intro}</p>
					<small>Last updated {policy.updated}</small>
				</div>
				<nav className="mn-legal-contents" aria-label="On this page">
					<h2>On this page</h2>
					{policy.sections.map((section) => (
						<a key={section.id} href={`#${section.id}`}>
							{section.title}
						</a>
					))}
				</nav>
				<article className="mn-legal-body">
					{policy.sections.map((section) => (
						<section id={section.id} key={section.id}>
							<h2>{section.title}</h2>
							{section.paragraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</section>
					))}
					<div className="mn-legal-contact">
						<h2>Need a hand?</h2>
						<a href="mailto:support@movienightapp.co.uk">
							support@movienightapp.co.uk
						</a>
						<p>
							<a href="https://myaccount.google.com/connections">
								Manage Google connections
							</a>{" "}
							· <a href="https://clerk.com/legal/privacy">Clerk privacy</a> ·{" "}
							<a href="https://policies.google.com/privacy">Google privacy</a> ·{" "}
							<a href="https://ico.org.uk/make-a-complaint/">Contact the ICO</a>
						</p>
					</div>
				</article>
			</main>
			<footer className="mn-footer mn-container">
				<Wordmark />
				<div className="mn-footer-links">
					<a href="/privacy">Privacy Policy</a>
					<a href="/terms">Terms of Service</a>
					<a href="mailto:support@movienightapp.co.uk">Contact us</a>
				</div>
			</footer>
		</div>
	);
}
