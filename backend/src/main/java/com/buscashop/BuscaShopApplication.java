package com.buscashop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@ComponentScan(basePackages = "com.buscashop")
public class BuscaShopApplication {
    
    @Autowired
    private RequestMappingHandlerMapping requestMappingHandlerMapping;
    
    public static void main(String[] args) {
        SpringApplication.run(BuscaShopApplication.class, args);
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void logMappings() {
        System.out.println("\n========== ROTAS REGISTRADAS ==========");
        requestMappingHandlerMapping.getHandlerMethods().forEach((key, value) -> {
            System.out.println(key);
        });
        System.out.println("========================================\n");
    }
}
