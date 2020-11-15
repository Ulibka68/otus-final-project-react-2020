import React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { wrapper } from "@redux/store";
import { Provider as Provider_auth } from "next-auth/client";

// eslint-disable-next-line no-restricted-syntax
/*
export default function App({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Component {...pageProps} />
		</Provider>
	);
}

 */

// AppInitialProps - server
class WrappedApp extends App<AppInitialProps> {
	// export declare type AppContext = AppContextType<Router>;
	// 	export declare type AppContextType<R extends NextRouter = NextRouter> = {
	// 	Component: NextComponentType<NextPageContext>;
	// 	AppTree: AppTreeType;
	// 	ctx: NextPageContext;
	// 	router: R;
	// };
	//
	// NextComponentType {getInitialProps }
	/*
	public static getInitialProps = async ({ Component, ctx }: AppContext) => {
		// Keep in mind that this will be called twice on server, one for page and second for error page
		ctx.store.dispatch({ type: "APP_gayrat_action", payload: "_app gayrat" });

		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
				// Some custom thing for all pages
				appProp: ctx.pathname,
			},
		};
	};

	 */

	public render() {
		const { Component, pageProps } = this.props;
		return (
			<Provider_auth session={pageProps.session}>
				<Component {...pageProps} />
			</Provider_auth>
		);
	}
}

// eslint-disable-next-line no-restricted-syntax
export default wrapper.withRedux(WrappedApp);
