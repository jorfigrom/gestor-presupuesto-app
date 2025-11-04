package com.presupuesto.gestor_presupuesto_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.presupuesto.gestor_presupuesto_backend.model.TipoTransaccion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransaccionResponse {

    private Long id;
    private String nombre;
    private TipoTransaccion tipo;
    private BigDecimal cantidad;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fecha;

    private String descripcion;

}
