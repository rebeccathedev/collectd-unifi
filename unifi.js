const networkUnifi = require('ubiquiti-unifi')
const fs = require('fs'),
      ini = require('ini');

const config = ini.parse(fs.readFileSync('./unifi.conf', 'utf-8'));

const options = {
    username: config.unifi.username,
    password: config.unifi.password,
    port: config.unifi.port || 8443,
    url: config.unifi.url || 'https://localhost',
    site: config.unifi.site || 'default',
    ignoreSsl: Boolean(config.unifi.ignoreSsl)
}

var interval = process.env.COLLECTD_INTERVAL || 60;

networkUnifi(options)
    .then(router =>
        Promise.all([router.getAccessPoints(), router.getClients()]))
    .then(([accessPoints, clients]) => {
        for (var i in accessPoints) {
            if (accessPoints.hasOwnProperty(i)) {
                var accessPoint = accessPoints[i];
                var hostname = accessPoint.hostname;

                for (var z in accessPoint.stat) {
                    if (accessPoint.stat.hasOwnProperty(z)) {
                        console.log("PUTVAL \"" + hostname + "/unifi/gauge-" + z + "\" interval=" + interval + " N:" + accessPoint.stat[z]);
                    }
                }
            }
        }

        console.log("PUTVAL \"Controller/unifi/gauge-total_clients\" interval=10 N:" + clients.length);
    });
