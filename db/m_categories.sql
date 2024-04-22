CREATE TABLE public.m_categories (
	id int4 NOT NULL,
	"name" varchar NOT NULL,
	create_by varchar NULL,
	create_date timestamp NULL,
	CONSTRAINT m_categories_pk PRIMARY KEY (id)
);

insert into m_categories (id, name, create_by, create_date) values (1, 'Farming', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (2, 'Biology', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (3, 'Boundaries', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (4, 'Gaming', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (5, 'Economy', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (6, 'Elevation', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (7, 'Environment', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (8, 'Finance', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (9, 'Chemistry', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (10, 'Engineering', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (11, 'Health', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (12, 'Society & Social', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (13, 'Space', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (14, 'Information Techonology', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (15, 'Travel', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (16, 'Music', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (17, 'Other', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (18, 'Disaster', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (19, 'Sports', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (20, 'Business', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (21, 'Investment', 'Admin', NOW());
insert into m_categories (id, name, create_by, create_date) values (22, 'Movie', 'Admin', NOW());