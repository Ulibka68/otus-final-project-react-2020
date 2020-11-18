import Layout from "../components/layout";
import styles from "./data-static.module.css";
import Link from "next/link";

type tMenuListProps = { goodNum: string };
function MenuList({ goodNum }: tMenuListProps) {
	const URL = "/data-static/" + goodNum;
	return (
		<li>
			<Link href={URL}>
				<a>Товар {goodNum}</a>
			</Link>
		</li>
	);
}

// eslint-disable-next-line no-restricted-syntax
export default function Page() {
	return (
		<Layout>
			<h1>Перечень ссылок на товары </h1>
			<p>Первая группа товаров идет с id от 1 до 887</p>
			<p>Первая группа товаров идет с id от 15001 до 17807</p>
			<ul className={styles.navItems}>
				<li>
					<Link href="/data-static/1">
						<a>Товар 1</a>
					</Link>
				</li>
				<li>
					<Link href="/data-static/82">
						<a>Товар 82</a>
					</Link>
				</li>
				<li>
					<Link href="/data-static/15003">
						<a>Товар 15003</a>
					</Link>
				</li>
				<MenuList goodNum="15100" />
				<MenuList goodNum="15029" />
				<MenuList goodNum="15132" />
				<li>
					<Link href="/data-static/1000">
						<a>Товара нет</a>
					</Link>
				</li>
			</ul>
		</Layout>
	);
}
