package com.buscashop.config;

import com.buscashop.model.Admin;
import com.buscashop.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Criar admin padrão se não existir
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setName("Admin");
            admin.setEmail("busca@shop.com");
            admin.setPassword("admin123");
            admin.setCreatedAt(LocalDateTime.now());
            
            adminRepository.save(admin);
            System.out.println("✅ Admin padrão criado: busca@shop.com / admin123");
        }
    }
}
