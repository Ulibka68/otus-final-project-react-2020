import Header from "components/header";
import Footer from "components/footer";

// eslint-disable-next-line no-restricted-syntax
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
