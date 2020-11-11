// eslint-disable-next-line @typescript-eslint/no-var-requires
var mysql = require("mysql");
/*
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'next_auth'
});

 */

var connection = mysql.createConnection(
    process.env.DATABASE_URL
);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

connection.query("call p_goods_test_select()", function (
  error,
  results,
  fields
) {
  if (error) throw error;

  var result_arr = results[0];

  for (var first_result of result_arr) {
    console.log("=======================================================");
    for (var key of Object.keys(first_result)) {
      if (key === "attributes") continue;
      console.log(key, " : ", first_result[key]);
    }

    console.log("-----");
    var enc = JSON.parse(first_result.attributes);
    // console.log(enc);

    for (var { name, category_name } of enc.attr_list) {
      console.log(category_name, " : ", name);
    }
    console.log("-----");
    var pict = enc.pict_list[0];
    console.log(pict);
    console.log("=======================================================");
  }
});

connection.end();
