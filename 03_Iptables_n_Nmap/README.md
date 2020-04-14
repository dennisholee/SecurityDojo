
# NMAP status

A client (you) issues a SYN, if the server replies SYN/ACK : it means that the port is open !
```
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

You issue a SYN, if the server replies RST : it means that the port is close !

```
nmap -p 80 172.17.0.3
Starting Nmap 7.70 ( https://nmap.org ) at 2020-04-03 15:41 UTC
Nmap scan report for 172.17.0.3
Host is up (0.00012s latency).

PORT   STATE  SERVICE
80/tcp closed http
MAC Address: 02:42:AC:11:00:03 (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 0.72 seconds
```


You issue a SYN, if the server does not reply, or replies with ICMP error : it means that the port is filtered. Likely an IDS / statefull firewall block your request)
```sh
# Default deny for ingress 
iptables -P INPUT DROP
```


```sh
# Set firewall to pass through
iptables -P INPUT ACCEPT

iptables -t filter -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ssh

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source    
```

```
nmap -p 80 172.17.0.3      
Starting Nmap 7.70 ( https://nmap.org ) at 2020-04-03 15:07 UTC
Nmap scan report for 172.17.0.3
Host is up (0.000074s latency).

PORT   STATE    SERVICE
80/tcp filtered http
MAC Address: 02:42:AC:11:00:03 (Unknown)
```

```sh
tcpdump -i eth0 -nn
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes


16:38:03.759530 ARP, Request who-has 172.17.0.3 tell 172.17.0.2, length 28
16:38:03.759621 ARP, Reply 172.17.0.3 is-at 02:42:ac:11:00:03, length 28
16:38:03.972338 IP 172.17.0.2.55134 > 192.168.65.1.53: 12549+ PTR? 3.0.17.172.in-addr.arpa. (41)
16:38:03.991894 IP 192.168.65.1.53 > 172.17.0.2.55134: 12549 NXDomain 0/0/0 (41)
16:38:04.112661 IP 172.17.0.2.40726 > 172.17.0.3.80: Flags [S], seq 4112631732, win 1024, options [mss 1460], length 0
16:38:04.112787 IP 172.17.0.3.80 > 172.17.0.2.40726: Flags [R.], seq 0, ack 4112631733, win 0, length 0
16:38:04.213695 IP 172.17.0.2.40727 > 172.17.0.3.80: Flags [S], seq 4112566197, win 1024, options [mss 1460], length 0
16:38:04.213838 IP 172.17.0.3.80 > 172.17.0.2.40727: Flags [R.], seq 0, ack 4112566198, win 0, length 0
16:38:09.033850 ARP, Request who-has 172.17.0.1 tell 172.17.0.2, length 28
16:38:09.033884 ARP, Request who-has 172.17.0.2 tell 172.17.0.1, length 28
16:38:09.033901 ARP, Reply 172.17.0.2 is-at 02:42:ac:11:00:02, length 28
16:38:09.034210 ARP, Reply 172.17.0.1 is-at 02:42:c7:17:26:a2, length 28
16:38:09.193514 ARP, Request who-has 172.17.0.2 tell 172.17.0.3, length 28
16:38:09.193555 ARP, Reply 172.17.0.2 is-at 02:42:ac:11:00:02, length 28
```

| Value | Flag Type | Description |
|-------|-----------|-------------|
| S | SYN | Connection Start |
| F | FIN | Connection Finish |
| P | PUSH | Data push |
| R | RST | Connection reset |
| . | ACK | Acknowledgment |


## Web Server
```sh
ifconfig -a
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.3  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:03  txqueuelen 0  (Ethernet)
        RX packets 27809  bytes 7646598 (7.2 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2040  bytes 116027 (113.3 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```
iptables -P INPUT DROP
```

```
17:02:28.368287 ARP, Request who-has 172.17.0.3 tell 172.17.0.2, length 28
17:02:28.368374 ARP, Reply 172.17.0.3 is-at 02:42:ac:11:00:03, length 28
17:02:28.618220 IP 172.17.0.2.60481 > 192.168.65.1.53: 3505+ PTR? 3.0.17.172.in-addr.arpa. (41)
17:02:28.623168 IP 192.168.65.1.53 > 172.17.0.2.60481: 3505 NXDomain 0/0/0 (41)
17:02:28.716871 IP 172.17.0.2.51920 > 172.17.0.3.80: Flags [S], seq 1396932402, win 1024, options [mss 1460], length 0
17:02:28.817903 IP 172.17.0.2.51921 > 172.17.0.3.80: Flags [S], seq 1396866867, win 1024, options [mss 1460], length 0
17:02:33.594633 ARP, Request who-has 172.17.0.2 tell 172.17.0.1, length 28
17:02:33.594633 ARP, Request who-has 172.17.0.1 tell 172.17.0.2, length 28
17:02:33.594685 ARP, Reply 172.17.0.2 is-at 02:42:ac:11:00:02, length 28
17:02:33.594929 ARP, Reply 172.17.0.1 is-at 02:42:c7:17:26:a2, length 28
```
