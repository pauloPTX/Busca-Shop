package com.buscashop.service;

import com.buscashop.model.Admin;
import com.buscashop.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    
    public Admin login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        
        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Senha incorreta");
        }
        
        return admin;
    }
}
