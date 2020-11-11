import * as mysql from "mysql";

const isLog = true;

// https://www.npmjs.com/package/mysql#escaping-query-values

function queryOneItem(itm: number) {
  /*
      var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : 'root',
          database : 'next_auth'
      });

   */

  const connection: mysql.Connection = mysql.createConnection(
    // "mysql://gayrat_next_auth:6UTBnVNn@gayrat.beget.tech:3306/gayrat_next_auth"
    process.env.DATABASE_URL
  );

  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }

    if (isLog) console.log("connected as id " + connection.threadId);
  });

  const resultPromice = new Promise((resolve, reject) => {
    connection.query(
      "select * from v_goods_list_client where id = ?",
      [itm],
      function (error, results, fields) {
        connection.end();
        if (error) throw error;

        const returnData = results[0] ? results[0] : { id: -1 };

        resolve(returnData);
      }
    );
  });

  return resultPromice;
}

// isolatedModules  требует чтобы был export
export { queryOneItem };
