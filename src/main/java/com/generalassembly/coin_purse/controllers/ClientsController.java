package com.generalassembly.coin_purse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@RestController
public class ClientsController {
	@Autowired
	private ClientRepository clientRepository;

	public static void main(String[] args) {
		SpringApplication.run(ClientsController.class, args);
	}

	@GetMapping("/clients")
	public Iterable<Client> index() {
		return clientRepository.findAll();
	}

	@PostMapping("/clients")
	public Iterable<Client> create (@RequestBody Client clientData) {
		clientRepository.save(clientData);
		return clientRepository.findAll();
	}

	@DeleteMapping("/clients/{id}")
	public Iterable<Client> delete(@PathVariable int id) {
		clientRepository.deleteById(id);
		return clientRepository.findAll();
	}

	@PutMapping("/clients/{id}")
	public Iterable<Client> update(@PathVariable int id, @RequestBody Client clientData) {
		clientData.setId(id);
		clientRepository.save(clientData);
		return clientRepository.findAll();
	}

}
