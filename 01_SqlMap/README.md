# Install MySQL on Debian
Get the latest mysql repository [https://dev.mysql.com/downloads/repo/apt/](https://dev.mysql.com/downloads/repo/apt/)

Update system's repository and install mysql-server
```sh
wget http://repo.mysql.com/mysql-apt-config_0.8.15-1_all.deb
apt install ./mysql-apt-config_0.8.15-1_all.deb 

apt update
apt-get install mysql-server
```

Add app db user
```
CREATE USER 'appuser'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON myapp.* to 'appuser'@'%'

create table foo( foo_id INT(11) NOT NULL AUTO_INCREMENT, first_name VARCHAR(25), CONSTRAINT foo_pk PRIMARY KEY (foo_id) );
```

# Install NodeJS
```sh
apt-get install -y nodejs npm
```

# sqlmap result

```javascript
connection.query('SELECT first_name FROM foo WHERE foo_id = ' + id, function (error, results, fields) { ... }
```

<details>
  <summary>Click to expand</summary>

sqlmap -u http://localhost:3000?id=1
        ___
       __H__
 ___ ___["]_____ ___ ___  {1.3.2#stable}
|_ -| . [,]     | .'| . |
|___|_  [(]_|_|_|__,|  _|
      |_|V...       |_|   http://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 16:33:35 /2020-03-02/

[16:33:35] [INFO] testing connection to the target URL
[16:33:35] [INFO] testing if the target URL content is stable
[16:33:36] [INFO] target URL content is stable
[16:33:36] [INFO] testing if GET parameter 'id' is dynamic
[16:33:36] [INFO] GET parameter 'id' appears to be dynamic
/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/Parser.js:437
      throw err; // Rethrow non-MySQL errors
      ^

Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '),().)'"),' at line 1
    at Query.Sequence._packetToError (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
    at Query.ErrorPacket (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/sequences/Query.js:79:18)
    at Protocol._parsePacket (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/Protocol.js:291:23)
    at Parser._parsePacket (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/Parser.js:433:10)
    at Parser.write (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/Parser.js:43:10)
    at Protocol.write (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/Protocol.js:38:16)
    at Socket.<anonymous> (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/Connection.js:88:28)
    at Socket.<anonymous> (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/Connection.js:526:10)
    at Socket.emit (events.js:189:13)
    at addChunk (_stream_readable.js:284:12)
    --------------------
    at Protocol._enqueue (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/protocol/Protocol.js:144:48)
    at Connection.query (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/mysql/lib/Connection.js:198:25)
    at app.get (/root/SecurityDojo/01_SqlMap/fooapp/index.js:22:14)
    at Layer.handle [as handle_request] (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/layer.js:95:5)
    at next (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/layer.js:95:5)
    at /root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/index.js:281:22
    at Function.process_params (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/index.js:335:12)
    at next (/root/SecurityDojo/01_SqlMap/fooapp/node_modules/express/lib/router/index.js:275:10)
[16:33:36] [CRITICAL] connection dropped or unknown HTTP status code received. Try to force the HTTP User-Agent header with option '--user-agent' or switch '--random-agent'. sqlmap is going to retry the request(s)
[16:33:36] [WARNING] turning off pre-connect mechanism because of connection reset(s)
[16:33:36] [CRITICAL] unable to connect to the target URL ('Cannot assign requested address')
[16:33:36] [CRITICAL] unable to connect to the target URL ('Cannot assign requested address'). sqlmap is going to retry the request(s)
[16:33:36] [CRITICAL] unable to connect to the target URL ('Cannot assign requested address')

[*] ending @ 16:33:36 /2020-03-02/
</details>


```javascript
connection.query('SELECT first_name FROM foo WHERE foo_id = ?', [id], function (error, results, fields) { ... }
```

<details>
  <summary>Click to expand</summary>

sqlmap -u http://localhost:3000?id=1
        ___
       __H__
 ___ ___[']_____ ___ ___  {1.3.2#stable}
|_ -| . [']     | .'| . |
|___|_  [']_|_|_|__,|  _|
      |_|V...       |_|   http://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 16:35:17 /2020-03-02/

[16:35:17] [INFO] testing connection to the target URL
[16:35:17] [INFO] testing if the target URL content is stable
[16:35:18] [INFO] target URL content is stable
[16:35:18] [INFO] testing if GET parameter 'id' is dynamic
[16:35:18] [INFO] GET parameter 'id' appears to be dynamic
[16:35:18] [WARNING] heuristic (basic) test shows that GET parameter 'id' might not be injectable
[16:35:18] [INFO] testing for SQL injection on GET parameter 'id'
[16:35:18] [INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'
[16:35:18] [INFO] testing 'Boolean-based blind - Parameter replace (original value)'
[16:35:18] [INFO] testing 'MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)'
[16:35:18] [INFO] testing 'PostgreSQL AND error-based - WHERE or HAVING clause'
[16:35:18] [INFO] testing 'Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause (IN)'
[16:35:18] [INFO] testing 'Oracle AND error-based - WHERE or HAVING clause (XMLType)'
[16:35:18] [INFO] testing 'MySQL >= 5.0 error-based - Parameter replace (FLOOR)'
[16:35:18] [INFO] testing 'MySQL inline queries'
[16:35:18] [INFO] testing 'PostgreSQL inline queries'
[16:35:18] [INFO] testing 'Microsoft SQL Server/Sybase inline queries'
[16:35:18] [INFO] testing 'PostgreSQL > 8.1 stacked queries (comment)'
[16:35:18] [INFO] testing 'Microsoft SQL Server/Sybase stacked queries (comment)'
[16:35:18] [INFO] testing 'Oracle stacked queries (DBMS_PIPE.RECEIVE_MESSAGE - comment)'
[16:35:18] [INFO] testing 'MySQL >= 5.0.12 AND time-based blind'
[16:35:18] [INFO] testing 'PostgreSQL > 8.1 AND time-based blind'
[16:35:18] [INFO] testing 'Microsoft SQL Server/Sybase time-based blind (IF)'
[16:35:18] [INFO] testing 'Oracle AND time-based blind'
[16:35:19] [INFO] testing 'Generic UNION query (NULL) - 1 to 10 columns'
[16:35:19] [WARNING] GET parameter 'id' does not seem to be injectable
[16:35:19] [CRITICAL] all tested parameters do not appear to be injectable. Try to increase values for '--level'/'--risk' options if you wish to perform more tests. If you suspect that there is some kind of protection mechanism involved (e.g. WAF) maybe you could try to use option '--tamper' (e.g. '--tamper=space2comment') and/or switch '--random-agent'

[*] ending @ 16:35:19 /2020-03-02/
</details>


