--
-- PostgreSQL database dump
--

-- Dumped from database version 10.2
-- Dumped by pg_dump version 10.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

--CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

--COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: 
--

--CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

--COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET search_path = public, pg_catalog;

--
-- Name: impression_endpoint; Type: TYPE; Schema: public; Owner: homam
--

CREATE TYPE impression_endpoint AS ENUM (
    'Server',
    'Client'
);


--ALTER TYPE impression_endpoint OWNER TO homam;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: homam
--

CREATE TABLE campaigns (
    id integer NOT NULL,
    xcid character varying(7),
    page character varying(64) NOT NULL,
    country character(2) NOT NULL,
    source_id integer NOT NULL,
    comments text,
    date_created timestamp without time zone NOT NULL DEFAULT timezone('utc'::text, now())
);


--ALTER TABLE campaigns OWNER TO homam;

--
-- Name: campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: homam
--

CREATE SEQUENCE campaigns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE campaigns_id_seq OWNER TO homam;

--
-- Name: campaigns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: homam
--

ALTER SEQUENCE campaigns_id_seq OWNED BY campaigns.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: homam
--

CREATE TABLE events (
    id integer NOT NULL,
    impression_id integer NOT NULL,
    date_created timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    category character varying(16) NOT NULL,
    action character varying(32) NOT NULL,
    label character varying(64),
    value integer,
    args json,
    client_rel_time integer,
    view character varying(16) NOT NULL
);


--ALTER TABLE events OWNER TO homam;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: 

--

CREATE SEQUENCE events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE events_id_seq OWNER TO homam;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: homam
--

ALTER SEQUENCE events_id_seq OWNED BY events.id;


--
-- Name: impressions; Type: TABLE; Schema: public; Owner: homam
--

CREATE TABLE impressions (
    id integer NOT NULL,
    rockman_id uuid NOT NULL,
    campaign_id integer NOT NULL,
    ip inet,
    headers json,
    date_created timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    ip_country_alpha2 character(2),
    user_id uuid NOT NULL,
    original_url character varying(4096),
    page character varying(64),
    endpoint impression_endpoint NOT NULL,
    CONSTRAINT ip_country_alpha2_lowercase CHECK (((ip_country_alpha2)::text = lower((ip_country_alpha2)::text)))
);


--ALTER TABLE impressions OWNER TO homam;

--
-- Name: impressions_id_seq; Type: SEQUENCE; Schema: public; Owner: homam
--

CREATE SEQUENCE impressions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE impressions_id_seq OWNER TO homam;

--
-- Name: impressions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: homam
--

ALTER SEQUENCE impressions_id_seq OWNED BY impressions.id;


--
-- Name: sources; Type: TABLE; Schema: public; Owner: homam
--

CREATE TABLE sources (
    id integer NOT NULL,
    affiliate_id character varying(16) NOT NULL,
    offer_id integer NOT NULL
);


--ALTER TABLE sources OWNER TO homam;

--
-- Name: sources_id_seq; Type: SEQUENCE; Schema: public; Owner: homam
--

CREATE SEQUENCE sources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--ALTER TABLE sources_id_seq OWNER TO homam;

--
-- Name: sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: homam
--

ALTER SEQUENCE sources_id_seq OWNED BY sources.id;


--
-- Name: campaigns id; Type: DEFAULT; Schema: public; Owner: homam
--

ALTER TABLE ONLY campaigns ALTER COLUMN id SET DEFAULT nextval('campaigns_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: homam
--

ALTER TABLE ONLY events ALTER COLUMN id SET DEFAULT nextval('events_id_seq'::regclass);


--
-- Name: impressions id; Type: DEFAULT; Schema: public; Owner: homam
--

ALTER TABLE ONLY impressions ALTER COLUMN id SET DEFAULT nextval('impressions_id_seq'::regclass);


--
-- Name: sources id; Type: DEFAULT; Schema: public; Owner: homam
--

ALTER TABLE ONLY sources ALTER COLUMN id SET DEFAULT nextval('sources_id_seq'::regclass);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: impressions impressions_pkey; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY impressions
    ADD CONSTRAINT impressions_pkey PRIMARY KEY (id);


--
-- Name: impressions impressions_rockman_id_key; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY impressions
    ADD CONSTRAINT impressions_rockman_id_key UNIQUE (rockman_id);


--
-- Name: sources sources_affiliate_id_key; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY sources
    ADD CONSTRAINT sources_affiliate_id_key UNIQUE (affiliate_id);


--
-- Name: sources sources_offer_id_key; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY sources
    ADD CONSTRAINT sources_offer_id_key UNIQUE (offer_id);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: impressions_campaign_id_idx; Type: INDEX; Schema: public; Owner: homam
--

CREATE INDEX impressions_campaign_id_idx ON impressions USING btree (campaign_id);


--
-- Name: impressions_page_idx; Type: INDEX; Schema: public; Owner: homam
--

CREATE INDEX impressions_page_idx ON impressions USING btree (page);


--
-- Name: campaigns campaigns_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY campaigns
    ADD CONSTRAINT campaigns_source_id_fkey FOREIGN KEY (source_id) REFERENCES sources(id);


--
-- Name: events events_impression_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: homam
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_impression_id_fkey FOREIGN KEY (impression_id) REFERENCES impressions(id);


--
-- PostgreSQL database dump complete
--

