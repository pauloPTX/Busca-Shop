package com.buscashop.controller;

import com.buscashop.service.EmailService;
import com.buscashop.repository.UserRepository;
import com.buscashop.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;
    
    private Map<String, String> resetCodes = new HashMap<>();
    
    @PostMapping("/reset-password/send-code")
    public ResponseEntity<?> sendResetCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email não encontrado"));
        }
        
        String code = String.format("%06d", new Random().nextInt(999999));
        resetCodes.put(email, code);
        
        emailService.sendResetPasswordEmail(email, code);
        
        return ResponseEntity.ok(Map.of("message", "Código enviado"));
    }
    
    @PostMapping("/reset-password/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        
        if (code.equals(resetCodes.get(email))) {
            return ResponseEntity.ok(Map.of("message", "Código válido"));
        }
        
        return ResponseEntity.badRequest().body(Map.of("error", "Código inválido"));
    }
    
    @PostMapping("/reset-password/confirm")
    public ResponseEntity<?> confirmReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        String newPassword = request.get("newPassword");
        
        if (!code.equals(resetCodes.get(email))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Código inválido"));
        }
        
        User user = userRepository.findByEmail(email).orElse(null);
        user.setPassword(newPassword);
        userRepository.save(user);
        
        resetCodes.remove(email);
        
        return ResponseEntity.ok(Map.of("message", "Senha alterada"));
    }
}
