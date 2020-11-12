// данный код выболняется на стороне сервера
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("serverless-mysql");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const escape = require("sql-template-strings");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("./db");

// https://www.npmjs.com/package/mysql#escaping-query-values

async function queryOneItem(itm: number) {
  const results = await db.query(
    escape`select * from v_goods_list_client where id = ${itm}`
  );

  // console.log(results);
  return results[0] ? results[0] : { id: -1 };
}

// isolatedModules  требует чтобы был export
export { queryOneItem };
