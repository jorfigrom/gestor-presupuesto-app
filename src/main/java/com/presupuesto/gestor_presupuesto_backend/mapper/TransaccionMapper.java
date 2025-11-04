package com.presupuesto.gestor_presupuesto_backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.presupuesto.gestor_presupuesto_backend.dto.TransaccionRequest;
import com.presupuesto.gestor_presupuesto_backend.dto.TransaccionResponse;
import com.presupuesto.gestor_presupuesto_backend.model.Transaccion;

public class TransaccionMapper {

    public static Transaccion toEntity(TransaccionRequest req) {
        Transaccion t = new Transaccion();
        t.setNombre(req.getNombre());
        t.setTipo(req.getTipo());
        t.setCantidad(req.getCantidad());
        t.setFecha(req.getFecha());
        t.setDescripcion(req.getDescripcion());
        return t;
    }

    public static TransaccionResponse toResponse(Transaccion t) {
        if (t == null) return null;
        TransaccionResponse r = new TransaccionResponse();
        r.setId(t.getId());
        r.setNombre(t.getNombre());
        r.setTipo(t.getTipo());
        r.setCantidad(t.getCantidad());
        r.setFecha(t.getFecha());
        r.setDescripcion(t.getDescripcion());
        return r;
    }

    public static List<TransaccionResponse> toResponseList(List<Transaccion> list) {
        return list.stream().map(TransaccionMapper::toResponse).collect(Collectors.toList());
    }

}
