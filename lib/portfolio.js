import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkImages from "remark-images";
import remarkGfm from "remark-gfm";

// postsディレクトリの絶対パスを求める
const postsDirectory = path.join(process.cwd(), "data");

// postsデータのソート
export function getSortedPostsData() {
  // postsディレクトリ以下のファイル名を読み込む
  const fileNames = fs.readdirSync(postsDirectory);

  /// ファイル名称に.mdがある場合のみ
  const fileNamesFix = fileNames.filter((fileName) => {
    if (fileName.indexOf(".md") >= 0) {
      return fileName;
    }
  });

  // ファイル名のidとmarkdownのメタデータを読み込む
  // const allPostsData = fileNames.map((fileName) => {
  return fileNamesFix.map((fileName) => {
    // ファイル名から'.md'を削除し、変数idに書き込む
    const id = fileName.replace(/\.md$/, "");

    // ファイル名の絶対パスを求める
    const fullPath = path.join(postsDirectory, fileName);

    // ファイルを読み込む
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matterを使ってmarkdownファイルのメタデータを読み込む
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // 日付順にソート
  // return allPostsData.sort(({ date: a }, { date: b }) => {
  //   console.log(a);
  //   console.log(b);
  //   if (a < b) {
  //     return 1;
  //   } else if (a > b) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // });
}

// postsディレクトリ以下のidを出力
export function getAllPostIds() {
  // postsディレクトリ以下のファイル名を読み込む
  const fileNames = fs.readdirSync(postsDirectory);

  /// ファイル名称に.mdがある場合のみ抽出
  const fileNamesFix = fileNames.filter((fileName) => {
    if (fileName.indexOf(".md") >= 0) {
      return fileName;
    }
  });

  // ファイル名から'.md'を削除
  // return fileNames.map((fileName) => {
  return fileNamesFix.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// データを出力
export async function getPostData(id) {
  // ファイル名の絶対パスを求める
  const fullPath = path.join(postsDirectory, `${id}.md`);

  // ファイルを読み込む
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matterを使ってmarkdownファイルのメタデータを読み込む
  const matterResult = matter(fileContents);

  // remarkを使ってmarkdownファイルをパースする
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .use(remarkImages)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
