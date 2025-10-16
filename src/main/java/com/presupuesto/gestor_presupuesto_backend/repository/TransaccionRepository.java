package com.presupuesto.gestor_presupuesto_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.presupuesto.gestor_presupuesto_backend.model.Transaccion;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {
    
    // Spring Data JPA crea automáticamente la consulta para este método

    Optional<Transaccion> findByNombre(String nombre);

}
