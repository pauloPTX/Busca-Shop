package com.buscashop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
@ComponentScan(basePackages = "com.buscashop")
public class BuscaShopApplication {
    
    @Value("${server.port}")
    private String serverPort;
    
    public static void main(String[] args) {
        SpringApplication.run(BuscaShopApplication.class, args);
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        System.out.println("\nBackend rodando na porta: " + serverPort + "\n");
    }
}
