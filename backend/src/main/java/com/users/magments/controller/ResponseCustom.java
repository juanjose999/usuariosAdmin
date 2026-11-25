package com.users.magments.controller;

import java.util.Map;

public record ResponseCustom(
        Boolean success,
        String message,
        Object data
) {
}
