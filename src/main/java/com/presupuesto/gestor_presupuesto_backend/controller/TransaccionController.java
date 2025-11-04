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

import com.presupuesto.gestor_presupuesto_backend.dto.TransaccionRequest;
import com.presupuesto.gestor_presupuesto_backend.dto.TransaccionResponse;
import com.presupuesto.gestor_presupuesto_backend.mapper.TransaccionMapper;
import com.presupuesto.gestor_presupuesto_backend.model.Transaccion;
import com.presupuesto.gestor_presupuesto_backend.service.TransaccionService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/transacciones") // Ruta base para todas las peticiones de este controlador
@CrossOrigin(origins = "http://localhost:3000") // Permitir CORS para el frontend en desarrollo
public class TransaccionController {

    private final TransaccionService transaccionService; 

    public TransaccionController(TransaccionService transaccionService) {
        this.transaccionService = transaccionService;
    }

    @GetMapping
    public List<TransaccionResponse> getAllTransacciones() {
        List<Transaccion> list = transaccionService.getAll();
        return TransaccionMapper.toResponseList(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransaccionResponse> getTransaccionById(@PathVariable Long id) {
        Transaccion transaccion = transaccionService.findById(id);
        return ResponseEntity.ok(TransaccionMapper.toResponse(transaccion));
    }

    @PostMapping
    public ResponseEntity<TransaccionResponse> createTransaccion(@Valid @RequestBody TransaccionRequest transaccionReq) {
        Transaccion nuevaTransaccion = transaccionService.createFromDto(transaccionReq);
        return new ResponseEntity<>(TransaccionMapper.toResponse(nuevaTransaccion), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransaccionResponse> updateTransaccion(@PathVariable Long id, @Valid @RequestBody TransaccionRequest transaccionReq) {
        Transaccion updated = transaccionService.updateFromDto(id, transaccionReq);
        return ResponseEntity.ok(TransaccionMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaccion(@PathVariable Long id) {
        transaccionService.delete(id);
        return ResponseEntity.noContent().build();
    }

}