import LandingPage from "@/components/landing/landing-page";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({ component: LandingPage });
