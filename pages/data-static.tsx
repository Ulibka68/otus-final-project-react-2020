import Layout from "../components/layout";
import styles from "./data-static.module.css";
import Link from "next/link";

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
        <li>
          <Link href="/data-static/15100">
            <a>Товар 15100</a>
          </Link>
        </li>
        <li>
          <Link href="/data-static/1000">
            <a>Товара нет</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
