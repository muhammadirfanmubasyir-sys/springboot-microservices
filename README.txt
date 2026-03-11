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