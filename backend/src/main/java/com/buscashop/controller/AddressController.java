package com.buscashop.controller;

import com.buscashop.model.Address;
import com.buscashop.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {
    
    @Autowired
    private AddressRepository addressRepository;
    
    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUser(@PathVariable Long userId) {
        System.out.println("[ADDRESS] Buscando endereços do usuário: " + userId);
        List<Address> addresses = addressRepository.findByUserId(userId);
        System.out.println("[ADDRESS] Encontrados " + addresses.size() + " endereços");
        return addresses;
    }
    
    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        System.out.println("[ADDRESS] Criando endereço para usuário: " + address.getUserId());
        System.out.println("[ADDRESS] Dados: " + address.getLabel() + ", " + address.getStreet());
        Address saved = addressRepository.save(address);
        System.out.println("[ADDRESS] Endereço salvo com ID: " + saved.getId());
        return saved;
    }
    
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        System.out.println("[ADDRESS] Deletando endereço ID: " + id);
        addressRepository.deleteById(id);
        System.out.println("[ADDRESS] Endereço deletado com sucesso");
    }
}
