'use strict';
window.HEX_NETWORK = {
  modules: [
    [0,'Network Lab Foundations','Start with what a network is, then build a disposable VM and a routed container lab. Follow packets, repair a route, and verify the result.','Lab Architect','Build the topology, diagnose a missing route, and verify both connectivity and isolation.'],
    [1,'Packets & Scapy','Dissect captures and construct packets with Python and Scapy.','Packet Crafter','Construct and inspect packets and explain each protocol layer.'],
    [2,'Ethernet & ARP','Operate a LAN and examine address resolution and trust at layer two.','Layer Two Operator','Diagnose an ARP exchange and verify a controlled mitigation.'],
    [3,'IPv4, ICMP & Routing','Trace packet forwarding, TTL, and routing decisions.','Packet Pathfinder','Repair a routed network and explain its ICMP capture.'],
    [4,'UDP & Network Services','Build a datagram client and server and handle loss and timeouts.','Datagram Engineer','Demonstrate a working UDP service and interpret its exchange.'],
    [5,'TCP Fundamentals','Build a stream service and observe connection setup, sequencing, and teardown.','Handshake Hacker','Build a TCP client/server and explain a captured handshake.'],
    [6,'TCP Security','Explore controlled SYN, reset, and sequence-number scenarios, then defend them.','TCP Analyst','Reproduce the assigned behavior, apply a defense, and retest.'],
    [7,'Firewalls, NAT & Stateful Filtering','Build a router policy that permits required traffic and rejects the rest.','Firewall Architect','Verify a default-deny stateful firewall against positive and negative tests.'],
    [8,'DNS Fundamentals','Configure authoritative DNS, zones, records, and a querying client.','DNS Operator','Deploy a zone and verify its records and resolution path.'],
    [9,'DNS Security','Investigate caching, forged responses, rebinding, DNSSEC, and encrypted DNS.','DNS Defender','Identify a manipulated exchange and verify the relevant protection.'],
    [10,'HTTP Protocol & Servers','Implement a small HTTP/1.1 server and study parsing and message framing.','Protocol Smith','Pass request, response, framing, and malformed-input checks.'],
    [11,'TLS, Certificates & HTTPS','Add HTTPS and verify trust chains and hostname validation.','TLS Operator','Serve HTTPS and demonstrate correct and rejected certificate validation.'],
    [12,'Proxies, Tunnels & VPNs','Trace encapsulation and build a protected tunnel using established cryptography.','Tunnel Engineer','Verify tunnel routing, protection, and failure behavior.'],
    [13,'Internet Routing & BGP','Operate multiple autonomous systems and investigate route announcements.','Route Keeper','Diagnose route manipulation and verify filtering in a miniature Internet.'],
    [14,'Network Monitoring & Detection','Turn packet captures and service logs into useful detections.','Network Sentinel','Detect assigned anomalies and check benign traffic for false alerts.'],
    [15,'Secure Network Capstone','Build a routed DNS/HTTPS network, investigate weaknesses, harden it, and retest.','Network Security Engineer','Complete the build, observation, attack, defense, and verification objectives.']
  ].map(([id,title,summary,badge,requirement])=>({id,title,summary,badge,requirement,available:id===0})),
  lessonOrder: ['foundations','0','1','2','3','4','5','defend','verify'],
  phases: ['learn','build','observe','break','defend','verify'],
  preparationKeys: ['net:0:read:foundations','net:0:read:0','net:0:read:1','net:0:read:2','net:0:read:3','net:0:read:4','net:0:read:5','net:0:read:defend','net:0:read:verify','net:0:check:0','net:0:check:1','net:0:check:2','net:0:check:3','net:0:check:4','net:0:check:5']
};
