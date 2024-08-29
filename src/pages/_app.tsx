import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "@/components/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
			<Theme>
				<Component {...pageProps} />
			</Theme>
		</ThemeProvider>
	);
}
