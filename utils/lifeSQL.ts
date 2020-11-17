// данный код выболняется на стороне сервера
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const mysql = require("serverless-mysql");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("./db");
import { SQL } from "sql-template-strings";

// https://www.npmjs.com/package/mysql#escaping-query-values
type tBase = { user: string };

async function saveLifeState<T extends tBase>(obj: T) {
  // SQL`select * from v_goods_list_client where id = ${itm}`
  const user: string = obj.user;
  const a = Object.assign({}, obj);
  delete a.user;
  const json_res = JSON.stringify(a);
  const results = await db.query(
    SQL`insert into life_states( user, state) values (${user},${json_res})`
  );
}

async function getLifeState(user: string) {
  // SQL`select * from v_goods_list_client where id = ${itm}`
  const results = await db.query(
    SQL`select id, user,
                 state->>'$.comment' comment,
                 insertDate
          from life_states
          where user = ${user}
          order by insertDate desc
          limit 10`
  );
  return results;
}

export { saveLifeState, getLifeState };
