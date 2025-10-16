package com.presupuesto.gestor_presupuesto_backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Transaccion {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String tipo; //Ingreso o Gasto
    private String nombre;
    private Double cantidad;
    private Date fecha;
    private String descripcion; //Opcional

}
