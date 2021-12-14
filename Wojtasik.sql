--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: konten; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.konten (
    kartennummer bigint NOT NULL,
    iban character varying(30) NOT NULL,
    kontostand numeric(10,2) NOT NULL,
    konto_seit date DEFAULT now() NOT NULL,
    fk_kundennummer integer NOT NULL,
    CONSTRAINT checkdate CHECK ((konto_seit <= now()))
);


ALTER TABLE public.konten OWNER TO postgres;

--
-- Name: kunden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kunden (
    kundennummer integer NOT NULL,
    geburtsdatum date NOT NULL,
    adresse character varying(100) NOT NULL,
    vorname character varying(30) NOT NULL,
    nachname character varying(30) NOT NULL
);


ALTER TABLE public.kunden OWNER TO postgres;

--
-- Data for Name: konten; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.konten (kartennummer, iban, kontostand, konto_seit, fk_kundennummer) FROM stdin;
1117619796	AT38 ZPDW HSK9 Q57L 5GAL GZ91	6828.88	1981-09-06	447192024
8369764162	AT19187526389842	43988.00	2021-12-10	265759500
3693169916	AT19667078520210	430165.00	2021-12-10	265759500
8237017479	AT18978043412622	20.00	2021-12-10	216410622
2958384655	AT16868351112499	0.00	2021-12-10	531817102
5383940614	AT14164537545391	2000.00	2021-12-13	942933748
7615011418	AT94 4933 8648 3753 1985 2470	17527.13	1991-06-08	265000437
4868436406	AT30 HJQI 2148 5HJC ONOI OK8A	42230.35	1983-02-06	849291198
5625377952	AT32 9909 0848 6223 4850 2509	36616.76	2000-07-25	612598424
6436970371	AT88 8163 8525 5179 0702 9701	37533.97	1995-12-16	356248045
401748464	AT09 0588 8389 2802 6182 0834	43319.79	1987-01-26	262799031
2558744747	AT07 1348 8827 29J2 QAPV FHQF	23447.32	1994-10-20	910673150
6513051584	AT74 7268 8051 8727 6585 3273	22523.09	1981-07-19	397334107
3097268561	AT07 UUUE K3US YUKO KKLT K0UM	13222.00	1991-08-22	247067429
4735442225	AT19529914926957	149.00	2021-12-10	265759500
\.


--
-- Data for Name: kunden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kunden (kundennummer, geburtsdatum, adresse, vorname, nachname) FROM stdin;
265000437	1997-11-10	7968 Lake View Crossing	Nettie	Hedges
849291198	2000-10-27	1877 Canary Hill	Melisa	Heinreich
247067429	1982-09-27	59509 Lillian Street	Laure	MacVay
265759500	1992-01-05	715 Lotheville Place	Colline	Sunners
612598424	1986-02-12	588 Reindahl Avenue	Chantal	Brewitt
356248045	1990-12-23	1 Kipling Parkway	Eada	Yacobsohn
262799031	1996-12-18	69912 Florence Drive	Leanora	Snelling
910673150	1999-10-13	8 Express Road	Mignonne	Dawidowitsch
397334107	1989-08-24	99533 Dayton Road	Davin	Kagan
447192024	1994-01-13	89068 Hagan Lane	Binnie	Halhead
216410622	2003-01-21	Adressengasse 47	Filip	Wojtasik
531817102	2002-11-21	Mansourstraße 219	Mina	Mansour
942933748	2021-08-17	Kundenhausgasse	Felipe	Wojtasik
466774839	2021-10-06	aaaaa	aaa	aaaa
\.


--
-- Name: konten konten_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konten
    ADD CONSTRAINT konten_pk PRIMARY KEY (kartennummer);


--
-- Name: kunden kunden_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kunden
    ADD CONSTRAINT kunden_pk PRIMARY KEY (kundennummer);


--
-- Name: kunden_kundennummer_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX kunden_kundennummer_uindex ON public.kunden USING btree (kundennummer);


--
-- Name: konten konten_kunden_kundennummer_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konten
    ADD CONSTRAINT konten_kunden_kundennummer_fk FOREIGN KEY (fk_kundennummer) REFERENCES public.kunden(kundennummer) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

