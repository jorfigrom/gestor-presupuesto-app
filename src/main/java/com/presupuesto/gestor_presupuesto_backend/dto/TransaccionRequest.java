package com.presupuesto.gestor_presupuesto_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.presupuesto.gestor_presupuesto_backend.model.TipoTransaccion;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransaccionRequest {

    @NotBlank
    private String nombre;

    @NotNull
    private TipoTransaccion tipo;

    @NotNull
    @Digits(integer = 12, fraction = 2)
    @PositiveOrZero
    private BigDecimal cantidad;

    @NotNull
    @PastOrPresent
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fecha;

    private String descripcion;

}
