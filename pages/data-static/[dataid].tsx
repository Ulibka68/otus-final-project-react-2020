import { useRouter } from "next/router";
import useSwr from "swr";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "components/layout";
import { queryOneItem } from "utils/sqlWorks";
import { log } from "util";
import Image from "next/image";
import { GoodsDescription } from "components/goods-description";

// https://nextjs.org/docs/basic-features/data-fetching#swr
// The team behind Next.js has created a React hook for data fetching called SWR.
// We highly recommend it if you’re fetching data on the client side.
// It handles caching, revalidation, focus tracking, refetching on interval, and more.
// And you can use it like so:

const fetcher = (url) => fetch(url).then((res) => res.json());

// https://nextjs.org/docs/routing/dynamic-routes
// eslint-disable-next-line no-restricted-syntax
export default function OneItem(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	// console.log("router.query : ", router.query);
	console.log("props : ", props);

	if (!props.post || !props.post.id) return <div>Загрузка</div>;

	let pictURL = null;

	if (props.post.id > -1) {
		if (props.post.pictures.pictures.length > 0) {
			pictURL = props.post.pictures.pictures[0];
			// console.log("pictURL :", pictURL);
		}
	}

	return (
		<Layout>
			<div>
				<h1>Динамический роутинг</h1>
				<p>Данные роутера: {router.query.dataid}</p>
			</div>

			{props.post.id === -1 && <p>Ошибка : {props.error}</p>}
			{props.post.id > -1 && (
				<>
					<div>
						<p>название : {props.post.название}</p>
						<p>цена : {props.post["розничная цена"]}</p>
						<div>
							<b>описание</b> :{/*{props.post.описание}*/}
							<GoodsDescription description={props.post.описание}></GoodsDescription>
						</div>
					</div>
					<div>
						{/*  картинка*  src={pictURL} */}
						{/*{pictURL && <Image src={pictURL} alt="Picture of the author" width={300} height={300} />}*/}
						{pictURL &&
							props.post.pictures.pictures.map((urlPict, index) => (
								<Image src={urlPict} alt={index} key={index} width={300} height={300} />
							))}
					</div>
				</>
			)}
		</Layout>
	);
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
// Note: You should not use fetch() to call an API route in your application. Instead, directly import the API route and call its function yourself. You may need to slightly refactor your code for this approach.
//     Fetching from an external API is fine!

// Incremental Static Regeneration
// https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
// revalidate: 1 или true
// This works perfectly with fallback: true.

// getStaticPaths (Static Generation)
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
// Next.js will statically pre-render all the paths specified by getStaticPaths.

export async function getStaticPaths() {
	return {
		paths: [{ params: { dataid: "1" } }],
		fallback: true,
	};
}

type GoodDescription = {
	id: number;
	название?: string;
	"розничная цена"?: number;
	описание?: string;
	"в комплект включено"?: string;
	валюта?: string;
	fk_Единица_измерения?: number;
	"единица измерения"?: string;
	attributes?: any;
	pictures?: any;
};

type GoodProps = { post?: GoodDescription; error?: string };

export const getStaticProps: GetStaticProps<GoodProps> = async (context) => {
	// console.log("context.params : ", context.params.dataid);
	const idGoodInRouter: number = Number.parseInt(context.params.dataid as string);
	let retData: GoodProps;
	// eslint-disable-next-line prefer-const
	retData = {};

	if (idGoodInRouter) {
		let data: GoodDescription = (await queryOneItem(idGoodInRouter)) as GoodDescription;

		if (data.id === -1) {
			retData.error = "По указанному id нет товара";
			retData.post = { id: -1 };
		} else {
			// data принимает таип RowDataSet, копирование свойств превращает его в обычный объект
			data = Object.assign({}, data);
			data.attributes = JSON.parse(data.attributes);

			data.pictures = data.pictures ? JSON.parse(data.pictures) : { pictures: [] };
			retData.post = data;
		}
	} else {
		retData.error = "Неверен URL запроса";
		retData.post = { id: -1 };
	}
	return { props: retData };
};
