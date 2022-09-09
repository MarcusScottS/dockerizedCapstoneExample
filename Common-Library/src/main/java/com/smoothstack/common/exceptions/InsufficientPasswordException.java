package com.smoothstack.common.exceptions;

public class InsufficientPasswordException extends Exception {

    public InsufficientPasswordException() {}

    public InsufficientPasswordException(String message) {
        super(message);
    }

}
