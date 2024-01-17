package com.example.demo;

import com.example.demo.security.springjwt.controller.TestController;
import com.example.demo.security.springjwt.models.User;

import com.example.demo.security.springjwt.repository.UserRepository;
import com.example.demo.security.springjwt.security.jwt.services.UserService;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;


@RunWith(SpringRunner.class)
@SpringBootTest
public class DevoireApplicationTests {

	
    @Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;


	@Test
	@Transactional
	public void testFindAll() {
		
		List<User> result = userService.findAll();

		List<User> expected = new ArrayList<>();
		
		userRepository.saveAll(expected);
		assertEquals(4, result.size());
	}


	@Transactional
	public void testSave() {
		User user = new User();

		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password123");
		user.setUsername("reda33");
		User us = userService.save(user);
		User savedUser = userService.findById( us.getId());
		Assert.assertNotNull(savedUser);
	}

	@Test
	@Transactional
	public void testDeleteById() {
		User user = new User();
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password123");
		user.setUsername("reda333");
		userRepository.save(user);
		Long userId = (long) user.getId();

		userService.deleteById(userId);

		// Try to find the comment after deletion
		User deletedUser = userRepository.findById(userId).orElse(null);

		// Assert that the comment is deleted
		Assert.assertNull(deletedUser);
	}



	@Test
	@Transactional
	public void testFindById() {
		User user = new User();
		user.setFirstName("John");
		user.setLastName("Doe");
		user.setPassword("password123");
		user.setUsername("johndoe");
		userRepository.save(user);

		User result = userService.findById((long) user.getId());

		// Assert the results
		Assert.assertNotNull(result);
		// Add more assertions based on your actual data
	}

	@Autowired
	TestController testController;

	@Test
	public void testFindAll1() {

		// When
		List<User> users = testController.findAll();

		// Then
		Assert.assertNotNull(users);
		//assertEquals(11, users.size());


		// Additional tests as needed
}


}
