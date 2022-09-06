import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getPostData } from "../lib/portfolio";
// import Link from "next/link";
import Date from "../components/date";
import Head from "next/head";

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

      <article>
        {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h1 className={utilStyles.headingXl}>{"Esunowba's Portfolio Page"}</h1> */}
        <div className={utilStyles.lightText}>
          Last Modified :&nbsp;
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// export default function Home({ allPostsData }) {
//   return (
//     <Layout home>
//       <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//         <h2 className={utilStyles.headingLg}>Blog</h2>
//         <ul className={utilStyles.list}>
//           {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//               {title}
//               <br />
//               {id}
//               <br />
//               {date}
//               <br />

//               {/* <Link href={`/posts/${id}`}> */}
//               <Link href={`/portfolio/${id}`}>
//                 <a>{title}</a>
//               </Link>
//               <br />
//               <small className={utilStyles.lightText}>
//                 <Date dateString={date} />
//               </small>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </Layout>
//   );
// }
