Финальный проект курса Otus React 2020


Прообраз заготовки:

https://next-auth.js.org/

https://github.com/nextauthjs/next-auth-example

github авторизация - получить token
https://github.com/settings/developers

При деплое не забудь обновить переменную:
NEXTAUTH_URL=https://next-auth-example-hazel.vercel.app

===========
работа с MySQL

https://vercel.com/guides/deploying-next-and-mysql-with-vercel?query=vercel%20clo

NOTE: Using sql-template-strings is strongly recommended to prevent attacks via SQL Injection by using parameterized queries.

sql-template-strings<br>
A simple yet powerful module to allow you to use ES6 tagged template strings for prepared/escaped statements.<br>
https://www.npmjs.com/package/sql-template-strings

// mysql:
<br>mysql.query('SELECT author FROM books WHERE name = ? AND author = ?', [book, author])
<br>// is equivalent to
<br>mysql.query(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`)
 
 ----
 const query = SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`
 query.append(SQL`AND genre = ${genre}`).append(' ORDER BY rating')
 
 const query = SQL`SELECT * FROM books`
 if (params.name) {
   query.append(SQL` WHERE name = ${params.name}`)
 }
 query.append(SQL` LIMIT 10 OFFSET ${params.offset || 0}`)
 
 ======================
 
 vercel secrets add secret1 "secret1"
 vercel -e MY_SECRET1=@secret1
 
 ===============
 EMOTION
 Добавил специальные версии emotion
   "@emotion/cache": "11.0.0-next.12",
     "@emotion/css": "11.0.0-next.12",
     "@emotion/react": "11.0.0-next.12",
     "@emotion/server": "11.0.0-next.12",
     "@emotion/styled": "11.0.0-next.12",