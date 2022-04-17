import React from "react";
import { useParams } from "react-router-dom";
import CategoryListHolder from "../components/categories/CategoryListHolder";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import FloatingButton from "../components/whatsappFloatingButton/FloatingButton";
import { Helmet } from "react-helmet"
function CategoryPage() {
  const { categoryId } = useParams();

  return (
    <React.Fragment>
      <Helmet>
        <title>Category - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <Layout>
        <CategoryListHolder categoryId={categoryId} />
      </Layout>
      <Footer />
      <FloatingButton />
    </React.Fragment>
  );
}

export default CategoryPage;
