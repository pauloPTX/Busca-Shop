package com.buscashop.service;

import com.buscashop.model.User;
import com.buscashop.repository.UserRepository;
import com.buscashop.repository.OrderRepository;
import com.buscashop.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AddressRepository addressRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        return userRepository.save(user);
    }
    
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Senha incorreta");
        }
        
        return user;
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public User updateUser(Long id, User userData) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (userData.getName() != null) {
                existingUser.setName(userData.getName());
            }
            if (userData.getEmail() != null) {
                existingUser.setEmail(userData.getEmail());
            }
            // Só atualiza senha se for enviada
            if (userData.getPassword() != null && !userData.getPassword().isEmpty()) {
                existingUser.setPassword(userData.getPassword());
            }
            return userRepository.save(existingUser);
        }
        return null;
    }
    
    @Transactional
    public void deleteUser(Long id) {
        orderRepository.deleteByUserId(id);
        addressRepository.deleteByUserId(id);
        userRepository.deleteById(id);
    }
}
