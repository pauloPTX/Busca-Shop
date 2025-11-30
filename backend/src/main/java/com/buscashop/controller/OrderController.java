package com.buscashop.controller;

import com.buscashop.model.Order;
import com.buscashop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        System.out.println("[ORDER] Buscando pedidos do usuário: " + userId);
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
        System.out.println("[ORDER] Encontrados " + orders.size() + " pedidos");
        return orders;
    }
    
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        System.out.println("[ORDER] Criando pedido para usuário: " + order.getUserId());
        Order saved = orderRepository.save(order);
        System.out.println("[ORDER] Pedido salvo com ID: " + saved.getId());
        return saved;
    }
    
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        System.out.println("[ORDER] Deletando pedido ID: " + id);
        orderRepository.deleteById(id);
        System.out.println("[ORDER] Pedido deletado com sucesso");
    }
}
