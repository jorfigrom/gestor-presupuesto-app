package com.presupuesto.gestor_presupuesto_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.presupuesto.gestor_presupuesto_backend.dto.TransaccionRequest;
import com.presupuesto.gestor_presupuesto_backend.exception.ResourceNotFoundException;
import com.presupuesto.gestor_presupuesto_backend.mapper.TransaccionMapper;
import com.presupuesto.gestor_presupuesto_backend.model.Transaccion;
import com.presupuesto.gestor_presupuesto_backend.repository.TransaccionRepository;

@Service
public class TransaccionService {

    private final TransaccionRepository transaccionRepository;

    public TransaccionService(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    public List<Transaccion> getAll(){
        return transaccionRepository.findAll();
    }

    public Transaccion findById(Long id){
        return transaccionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transacción no encontrada con ID: " + id));
    }

    public Transaccion createFromDto(TransaccionRequest req){
        Transaccion t = TransaccionMapper.toEntity(req);
        if (t.getCantidad() != null && t.getCantidad().signum() < 0) {
            throw new IllegalArgumentException("La cantidad no puede ser negativa");
        }
        return transaccionRepository.save(t);
    }

    public Transaccion updateFromDto(Long id, TransaccionRequest req) {
        return transaccionRepository.findById(id).map(existing -> {
            existing.setNombre(req.getNombre());
            existing.setCantidad(req.getCantidad());
            existing.setTipo(req.getTipo());
            existing.setFecha(req.getFecha());
            existing.setDescripcion(req.getDescripcion());
            return transaccionRepository.save(existing);
        }).orElseThrow(() -> new ResourceNotFoundException("Transacción no encontrada con ID: " + id));
    }

    public void delete(Long id) {
        if (transaccionRepository.existsById(id)) {
            transaccionRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Transacción no encontrada con ID: " + id);
        }
    }

}
