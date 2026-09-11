import { lazy, StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./components/landing/landing-page";
import "./index.css";
import LegalPage from "./components/legal/legal-page";
const publicPath = window.location.pathname.replace(/\/$/, "") || "/";
const legalKind =
	publicPath === "/privacy" || publicPath === "/privacy-policy.txt"
		? "privacy"
		: publicPath === "/terms"
			? "terms"
			: null;

// The public page needs neither authentication nor the legacy web-app dependencies.
const AppClient = lazy(() => import("./app-client"));
ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{publicPath === "/" ? (
			<LandingPage />
		) : legalKind ? (
			<LegalPage kind={legalKind} />
		) : (
			<Suspense fallback={<p role="status">Loading MovieNight…</p>}>
				<AppClient />
			</Suspense>
		)}
	</StrictMode>,
);
