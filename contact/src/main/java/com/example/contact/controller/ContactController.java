package com.example.contact.controller;
import com.example.contact.entity.Contact;
import com.example.contact.repo.ContactRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/contact")
    public String saveContact(@RequestBody Contact contact) {
        contactRepository.save(contact);
        return "Contact saved to MySQL!";
    }
    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

}

