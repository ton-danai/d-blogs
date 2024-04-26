CREATE TABLE public.users (
	id int4 GENERATED ALWAYS AS IDENTITY NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	salt varchar NOT NULL,
	create_at timestamp DEFAULT now() NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);


insert into users (email,password,salt) values ('bwhyman0@engadget.com','hN0r?AJ3cH','#2a#04#m5uMXhWI4TbhlsBI0Xl8BuCap8n174x8kK9zwxGk4QgE1EDTIwtje');
insert into users (email,password,salt) values ('rthreadgill1@usda.gov','aV6.3uyX+I?s','#2a#04#nJSGiXqC8.ik5xuOXO0equqyz.u.6u3OQXPD8C.hD.dd6mkjmcGA.');
insert into users (email,password,salt) values ('wshalloo2@about.me','bQ8}%SA=egzD','#2a#04#34Ye2dqXYbsG6UqrWjXOzeE5GOqHq.nHtSlFhcQWeuxpC.VI72znq');
insert into users (email,password,salt) values ('chaburne3@google.es','yQ3\q12}&=\Qt','#2a#04#F2LQF2gDvSLHdYGT0PfGCu3VoE9ZmlddO7u7rGDVXrJO0pKtTaZly');
insert into users (email,password,salt) values ('bmayhead4@discovery.com','qT5.?5Ptta>|>','#2a#04#PnVdJA50w85RNOBPrl/NyuGQ1vIqkxTiPiDQy0KvI8rdVChVUWfSi');
insert into users (email,password,salt) values ('jmackettrick5@chronoengine.com','oG1.vQ?O','#2a#04#5vPC2zUiCiDFeh2P.pqJxuBK3z2o0HmFayCSXxmlidbk3qPNs2CRu');
insert into users (email,password,salt) values ('alarive6@pcworld.com','"xJ4(N~O@CQq""XU~R"','#2a#04#2tAXcCqWDvZJve1dqKywh.z5sMOUBgPD/kK85q18MS2IrukhgdOAG');
insert into users (email,password,salt) values ('jpallin7@nbcnews.com','"oL9&~2c*K|mm""c"','#2a#04#mhnkjkE.rnvmdSuEGFrmY.m7R8y4CL/sc.GWyZ5VFZO6AQOopi2Se');
insert into users (email,password,salt) values ('aferry8@latimes.com','tF2.i1B_uWC`/85','#2a#04#V9.jGdqTSRLx6CCqnXNuxe7GNMyjSMNDaZi34CHKwVDSD2mRA.G8y');
insert into users (email,password,salt) values ('kchritchley9@sogou.com','gB6>=\jB3@vj1','#2a#04#vfSXq.byGfNuUMB8AyyzoOL3WKtsZNJERT2Wvh1hZ5gUigjeKHTVK');
insert into users (email,password,salt) values ('bdallmana@last.fm','eW8%{XQa1SZ}1Q>','#2a#04#YMgYxAqLF6fino2zu3pQpu59DMPFefw9KqDCA41LSnC22/jjNPcwO');
insert into users (email,password,salt) values ('sgasconeb@google.co.jp','"kN9>""qaTR%pK"','#2a#04#h0CoJKUY2aiVbEzALdloSeHTZeCl4b8YngJD0ly4J0kFUhQYo6aGm');
insert into users (email,password,salt) values ('gpurdomc@usnews.com','eB1(21r.A0','#2a#04#2k5sZGl5GhbP/aMBjf4egOBH9E0YcnkP5Gek.JiqxTXNGI/FBYp7e');
insert into users (email,password,salt) values ('cchomleyd@istockphoto.com','gI9%>xP8f','#2a#04#et8gm0TLVsY9wJ1o2F0VJ.Aw7jRGPz/rYKntNOYXDERxvK.Y6YrUy');
insert into users (email,password,salt) values ('wwetherede@moonfruit.com','bG1>q)~rT','#2a#04#8Ge2WBk3o04lhuHoyxL3ju91ycwS86hfOVOFQiAImLiRGFNjU7ZAy');
insert into users (email,password,salt) values ('elongf@friendfeed.com','pV6~TGEZ','#2a#04#AdCY53l.GfpQtq5E0ydbFe5eNnpCYJeP2ZeJzOxvxfVXKfd2Dj.AK');
insert into users (email,password,salt) values ('amerkelg@deliciousdays.com','bV4(cxgWp>P1b','#2a#04#2YQPTE4Z0uilxCJntCyA0uBlKHDgxGN.LqGvELOSYTj623vp.43DW');
insert into users (email,password,salt) values ('asnowdenh@usgs.gov','eE2~zVQ}Q0QeKp','#2a#04#NCwewrKWfhzkzABXP97t4uy8ewRS1H4qrn3F4fWg8Bfbq1370NLZW');
insert into users (email,password,salt) values ('marnii@cbsnews.com','fL2*wdjV1','#2a#04#oOQapCohtOWAij3W3pVd1.WjKdLA6QGlvB55RpG0hv5HgU1dJ7za6');
insert into users (email,password,salt) values ('lverrillj@woothemes.com','aZ1&FVaS&','#2a#04#yv8XjL5Kn1WsOEkoFdwV.uMxMckzjJzR3KUqnd3bA5j9edB2V2rdm');