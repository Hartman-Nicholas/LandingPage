package se.kth.sda.legalAliens.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FOUND)
public class NoDuplicateException extends RuntimeException {
}
