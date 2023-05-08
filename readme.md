# Seminarios Backend

## Nodejs. Express.js. MySql
### Proyecto Seminarios: backend hecho para proyecto de gestión de pacientes

## Requisitos

- Node.js
- MySql

Asumo que ya se tienen las tablas para pacientes y signos vitales

> La tabla paciente tiene los campos codigo, nombre, apellido y fecha_nacimiento
> La tabla signos_vitales tiene los campos id, fecha, frecuencia, presion y el FK codigo paciente
> CREATE TABLE paciente (

    codigo int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL,
    apellido varchar(255),
    fecha_nacimiento Date,
    PRIMARY KEY (codigo)

);

> CREATE TABLE signos_vitales (

    id int NOT NULL AUTO_INCREMENT,
    fecha Date NOT NULL,
    frecuencia varchar(255),
    presion varchar(255),
    PRIMARY KEY (id)

);

## Instalación

El backend requiere [Node.js](https://nodejs.org/) v10+ para correr

Instalar dependecias

```sh
cd nombre_proyecto
npm i
node server.js
```
