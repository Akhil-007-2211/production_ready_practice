package com.akhil.demo.repository;

import com.akhil.demo.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer> {

    public Users findUsersByUserName(String userName);
    public Users findUsersByUserEmail(String userEmail);
}
