mvn clean package jib:build -DskipTests=true  -Djib.to.auth.username="irfanmubasyir96" -Djib.to.auth.password="Mubasy!r78"

settings.xml (c:\users\xxx\.m2)
============
  <servers>
    <server>
      <id>registry.hub.docker.com</id>
      <username>irfanmubasyir96</username>
      <password>Mubasy!r78</password>
    </server>
  </servers>

config.json (c:\users\xxx\.docker)
===========
  {
  	"auths": {
  		"https://index.docker.io/v1/": {}
  	},
  }

======
NOTES
======
docker compose up -d
docker compose up [SERVICE_NAME]

java -jar my-app.jar --spring.profiles.active=prod,mq

================== postgres =====================

ALTER USER postgres WITH PASSWORD 'new_password';

C:\>psql -U admin -p 5431 -d order-service
Password for user admin:
order-service=# \dt
                    List of tables
 Schema |             Name             | Type  | Owner
--------+------------------------------+-------+-------
 public | order_line_items             | table | admin
 public | orders                       | table | admin
 public | orders_order_line_items_list | table | admin
(3 rows)


C:\>psql -U admin -p 5433 -d product-service
Password for user admin:

product-service=# \dt
          List of tables
 Schema |  Name   | Type  | Owner
--------+---------+-------+-------
 public | product | table | admin
(1 row)


C:\>psql -U admin -p 5434 -d inventory-service
Password for user admin:

inventory-service=# \dt
           List of tables
 Schema |   Name    | Type  | Owner
--------+-----------+-------+-------
 public | inventory | table | admin
