import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getPostData } from "../lib/appInfo";
// import Link from "next/link";
import Date from "../components/date";
import Head from "next/head";
import styles from "../components/layout.module.css";

export async function getStaticProps() {
  const postData = await getPostData("index");
  return {
    props: {
      postData,
    },
  };
}

export default function Home({ postData }) {
  return (
    <Layout home>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <header className={styles.header}>
        <p>Esunowbaのアプリ情報サイト</p>
      </header>

      <article>
        <div className={utilStyles.lightText}>
          最終更新日 :&nbsp;
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
