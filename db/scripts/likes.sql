CREATE TABLE public.likes (
	id int4 GENERATED ALWAYS AS IDENTITY NOT NULL,
	post_id int4 NOT NULL,
	user_email varchar NOT NULL,
	CONSTRAINT likes_pk PRIMARY KEY (id)
);