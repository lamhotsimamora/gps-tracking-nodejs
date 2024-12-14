const { Routeros } = require("routeros-node");
const express = require("express");
const app = express();
const port = 8081;
var cors = require("cors");
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);

app.get("/", (req, res) => {
    return res.send('hello mikrotik');
});



app.post("/api-login-mikrotik", (req, res) => {
    const ip = req.body.ip;
    const username = req.body.username;
    const password = req.body.password;
    const port = req.body.port;
    const token = req.body._token;

    if (token === "912381237123jasjdasjdasdnsadnsad293123asdsad") {
        const routeros = new Routeros({
            host: ip,
            port: port,
            user: username,
            password: password,
        });

        routeros
            .connect()
            .then((conn) => res.send(true))
            .then((ipaddress) => {})
            .catch((error) => {
                res.send(true);
            })
            .finally(() => {
                routeros.destroy();
            });
    }
});

app.post("/api-load-interface", (req, res) => {
    const ip = req.body.ip;
    const username = req.body.username;
    const password = req.body.password;
    const port = req.body.port;
    const token = req.body._token;

    if (token === "912381237123jasjdasjdasdnsadnsad293123asdsad") {
        const routeros = new Routeros({
            host: ip,
            port: port,
            user: username,
            password: password,
        });

        routeros
            .connect()
            .then((conn) => conn.write(["/interface/print"]))
            .then((interfaceData) => {
                res.send(interfaceData);
            })
            .catch((error) => {
                console.log("error===>", error);
            })
            .finally(() => {
                routeros.destroy();
            });
    } else {
        res.send("invalid token");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});