package com.presupuesto.gestor_presupuesto_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

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

    public Transaccion findById(Long Id){
        return transaccionRepository.findById(Id).orElse(null);
    }

    public Transaccion save(Transaccion transaccion){
        if (transaccion.getCantidad() < 0) {
            throw new IllegalArgumentException("La cantidad no puede ser negativa");
        }
        return transaccionRepository.save(transaccion);
    }

    public void delete(Long id) {
        if (transaccionRepository.existsById(id)) {
            transaccionRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Transacción no encontrada con ID: " + id);
        }
    }

    public Transaccion update(Long id, Transaccion transaccionActualizada) {
        return transaccionRepository.findById(id).map(transaccionExistente -> {
            transaccionExistente.setNombre(transaccionActualizada.getNombre());
            transaccionExistente.setCantidad(transaccionActualizada.getCantidad());
            transaccionExistente.setTipo(transaccionActualizada.getTipo());
            transaccionExistente.setFecha(transaccionActualizada.getFecha());
            transaccionExistente.setDescripcion(transaccionActualizada.getDescripcion());
            return transaccionRepository.save(transaccionExistente);
        }).orElse(null);
    }



}
