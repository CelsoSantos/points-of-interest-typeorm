FROM postgres:14

ENV POSTGRES_PASSWORD=postgres
# init db sql
COPY init.sql /docker-entrypoint-initdb.d/
