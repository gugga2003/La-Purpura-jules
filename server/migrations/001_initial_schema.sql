-- 001_initial_schema.sql

-- Habilitar UUID si no está habilitado
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Ramas (Branches)
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- Tabla de Roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'INVITED', -- INVITED, ACTIVE, SUSPENDED, REVOKED, LOCKED
    mfa_enabled BOOLEAN DEFAULT FALSE,
    role_id UUID REFERENCES roles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- Tabla de Jerarquía Territorial
CREATE TABLE territories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- Nación, Provincia, Municipio, etc.
    parent_id UUID REFERENCES territories(id), -- Relación jerárquica
    active BOOLEAN DEFAULT TRUE
);

-- Tablas de Unión (Muchos a Muchos)

-- Relación Usuario-Rama
CREATE TABLE user_branches (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, branch_id)
);

-- Relación Usuario-Territorio
CREATE TABLE user_territories (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    territory_id UUID REFERENCES territories(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, territory_id)
);

-- Insertar datos iniciales
INSERT INTO branches (code, name) VALUES
    ('MADRE', 'Institucional General'),
    ('PYME', 'PyME'),
    ('DEPORTES', 'Deportes'),
    ('PROFESIONAL', 'Profesional');

INSERT INTO roles (name) VALUES
    ('SuperAdminNacional'),
    ('AdminNacional'),
    ('AdminProvincial'),
    ('AdminMunicipal'),
    ('Colaborador'),
    ('Referente'),
    ('AuditorLectura');
