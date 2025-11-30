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
        return addressRepository.findByUserId(userId);
    }
    
    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return addressRepository.save(address);
    }
    
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressRepository.deleteById(id);
    }
}
