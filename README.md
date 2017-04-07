# collectd-unifi

A collectd script to collect data from Unifi wifi equipment. It uses the Unifi
controller to get the data.

### Install

You'll need working NodeJS v7 and NPM.

Clone the repo:

```
git clone https://github.com/peckrob/collectd-unifi.git /opt/collectd-unifi
```

Install modules:

```
cd /opt/collectd-unifi
npm install
```

### Configure

```
cp unifi.conf.sample unifi.conf
vi unifi.conf
```

Fill in the various fields.

### Test

```
nodejs unifi.conf
```

If you get a lot of `PUTENV` lines, you're good to go!

### Configure collectd

```
LoadPlugin exec
<Plugin "exec">
	Interval 60
    Exec "daemon:daemon" "/usr/bin/nodejs" "/opt/collectd-unifi/unifi.js"
</Plugin>
```

Restart collectd. You should now have Unifi data!

## License

MIT
