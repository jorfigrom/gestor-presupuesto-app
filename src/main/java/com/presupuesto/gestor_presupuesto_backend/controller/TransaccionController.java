package com.presupuesto.gestor_presupuesto_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.presupuesto.gestor_presupuesto_backend.model.Transaccion;
import com.presupuesto.gestor_presupuesto_backend.service.TransaccionService;



@RestController
@RequestMapping("/api/transacciones") // Ruta base para todas las peticiones de este controlador

/*
 * IMPORTANTE: La anotación @CrossOrigin es crucial para permitir que el frontend (React)
 * pueda comunicarse con este backend durante el desarrollo, ya que React suele correr en
 * http://localhost:3000 y el backend en http://localhost:8080, lo que genera problemas de CORS.
 */
@CrossOrigin(origins = "http://localhost:3000") // Permitir CORS para el frontend en desarrollo


public class TransaccionController {

    // Inyección de dependencia del servicio
    private final TransaccionService transaccionService; 

    // Constructor para inyectar el servicio
    public TransaccionController(TransaccionService transaccionService) {
        this.transaccionService = transaccionService;
    }

    // Endpoint para obtener todas las transacciones (GET /api/transacciones)
    @GetMapping
    public List<Transaccion> getAllTransacciones() {
        return transaccionService.getAll();
    }

    // Endpoint para obtener una transacción por su ID (GET /api/transacciones/1)
    @GetMapping("/{id}")
    public ResponseEntity<Transaccion> getTransaccionById(@PathVariable Long id) {
        Transaccion transaccion = transaccionService.findById(id);
        if (transaccion != null) {
            return ResponseEntity.ok(transaccion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para crear una nueva transacción (POST /api/transacciones)
    @PostMapping
    public ResponseEntity<Transaccion> createTransaccion(@RequestBody Transaccion transaccion) {
        try {
            Transaccion nuevaTransaccion = transaccionService.save(transaccion);
            return new ResponseEntity<>(nuevaTransaccion, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Endpoint para actualizar una transacción (PUT /api/transacciones/1)
    @PutMapping("/{id}")
    public ResponseEntity<Transaccion> updateTransaccion(@PathVariable Long id, @RequestBody Transaccion transaccion) {
        try {
            Transaccion transaccionActualizada = transaccionService.update(id, transaccion);
            if (transaccionActualizada != null) {
                return ResponseEntity.ok(transaccionActualizada);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Endpoint para eliminar una transacción (DELETE /api/transacciones/1)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaccion(@PathVariable Long id) {
        transaccionService.delete(id);
        return ResponseEntity.noContent().build(); // Devuelve 204 No Content, estándar para deletes exitosos
    }

    
}