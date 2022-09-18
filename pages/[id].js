import { getAllPostIds, getPostData } from "../lib/appInfo";
import Layout from "../components/layout";
import Head from "next/head";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import styles from "../components/layout.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} - Esunowba App Info Page</title>
      </Head>

      <header className={styles.header}>
        <p>{postData.title}</p>
      </header>

      <article>
        {/* <div className={utilStyles.title}>{postData.title}</div> */}
        <div className={utilStyles.lightText}>
          最終更新日 :&nbsp;
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
