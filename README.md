# Gestor de presupuestos

> **Proof of Concept (PoC) / Laboratorio de aprendizaje** — API REST básica desarrollada con Spring Boot para afianzar conceptos clave del backend en Java: arquitectura en capas, persistencia con Spring Data JPA y validación de datos.

[![Java](https://img.shields.io/badge/Java-17%2B-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Build-Maven-C71A36.svg)](https://maven.apache.org/)

---

## 📌 Sobre el Proyecto

Este repositorio es un **proyecto personal de prueba y experimentación técnica**, no una aplicación lista para producción. El objetivo principal fue aprender y aplicar de forma práctica los patrones y buenas prácticas del ecosistema Spring:

* **Arquitectura desacoplada en capas:** Separación estricta de responsabilidades entre Controladores (`Controller`), Lógica de Negocio (`Service`), Acceso a Datos (`Repository`) y Entidades (`Model`).
* **Patrón DTO & Mappers:** Aislamiento de las entidades de base de datos respecto a los contratos de la API mediante objetos `TransaccionRequest` y `TransaccionResponse`.
* **Validación declarativa:** Validación de payloads en tiempo de entrada usando `jakarta.validation` (`@Valid`, `@NotBlank`, `@PositiveOrZero`, etc.).
* **Precisión numérica:** Modelado de importes con `BigDecimal` y restricciones de precisión decimal en base de datos.
* **Semántica REST:** Uso explícito de métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) y códigos de estado adecuados (`201 Created`, `204 No Content`, `200 OK`).

---

## 🛠️ Stack Técnico

* **Lenguaje:** Java 17+
* **Framework:** Spring Boot 3
* **Persistencia:** Spring Data JPA / Hibernate
* **Base de Datos:** H2 / PostgreSQL / MySQL (configurable en properties)
* **Utilidades:** Lombok, Jakarta Bean Validation

---

## 🔌 Endpoints de la API

Ruta base: `/api/transacciones`

| Método | Endpoint | Descripción | Código Éxito |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/transacciones` | Listar todas las transacciones | `200 OK` |
| `GET` | `/api/transacciones/{id}` | Obtener una transacción por ID | `200 OK` |
| `POST` | `/api/transacciones` | Crear una nueva transacción | `201 Created` |
| `PUT` | `/api/transacciones/{id}` | Actualizar una transacción existente | `200 OK` |
| `DELETE`| `/api/transacciones/{id}` | Eliminar una transacción | `204 No Content` |

### Ejemplo de Payload (POST / PUT)

```json
{
  "nombre": "Compra semanal",
  "tipo": "GASTO",
  "cantidad": 45.50,
  "fecha": "2026-03-15",
  "descripcion": "Supermercado local"
}
