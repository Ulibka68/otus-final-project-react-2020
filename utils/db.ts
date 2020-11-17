// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("serverless-mysql");
import { ServerlessMysql } from "serverless-mysql";

// добавил env на vercel
// https://vercel.com/guides/deploying-next-and-mysql-with-vercel

const db: ServerlessMysql = mysql({
  config: {
    host: "gayrat.beget.tech",
    database: "gayrat_next_auth",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

exports.query = async (query) => {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
};
