package com.buscashop.service;

import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;
import io.github.cdimascio.dotenv.Dotenv;

@Service
public class EmailService {
    
    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    private static final String SMTP_HOST = "smtp-relay.brevo.com";
    private static final String SMTP_PORT = "587";
    private static final String SMTP_USER = dotenv.get("SMTP_USER");
    private static final String SMTP_PASSWORD = dotenv.get("SMTP_PASSWORD");
    private static final String SMTP_FROM_EMAIL = dotenv.get("SMTP_FROM_EMAIL");
    
    public void sendWelcomeEmail(String toEmail, String userName) {
        String subject = "Bem-vindo à Busca Shop!";
        String htmlContent = "<html><body>" +
            "<h1>Olá " + userName + "!</h1>" +
            "<p>Bem-vindo à Busca Shop! Estamos felizes em ter você conosco.</p>" +
            "<p>Aproveite nossas ofertas e produtos incríveis!</p>" +
            "</body></html>";
        
        sendEmail(toEmail, subject, htmlContent);
    }
    
    public void sendResetPasswordEmail(String toEmail, String code) {
        String subject = "Código de Recuperação de Senha - Busca Shop";
        String htmlContent = "<html><body>" +
            "<h1>Recuperação de Senha</h1>" +
            "<p>Seu código de verificação é:</p>" +
            "<h2 style='color: #e63946; font-size: 32px;'>" + code + "</h2>" +
            "<p>Este código expira em 15 minutos.</p>" +
            "<p>Se você não solicitou esta recuperação, ignore este email.</p>" +
            "</body></html>";
        
        sendEmail(toEmail, subject, htmlContent);
    }
    
    private void sendEmail(String toEmail, String subject, String htmlContent) {
        try {
            Properties props = new Properties();
            props.put("mail.smtp.host", SMTP_HOST);
            props.put("mail.smtp.port", SMTP_PORT);
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.starttls.required", "true");
            props.put("mail.smtp.ssl.protocols", "TLSv1.2");
            
            Session session = Session.getInstance(props, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(SMTP_USER, SMTP_PASSWORD);
                }
            });
            
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(SMTP_FROM_EMAIL != null ? SMTP_FROM_EMAIL : "noreply@buscashop.com", "Busca Shoping"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            message.setContent(htmlContent, "text/html; charset=utf-8");
            
            Transport.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
        }
    }
}
