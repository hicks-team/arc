package com.hicksteam.arc;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class JSONutil
{
    final static ObjectMapper objectMapper = new ObjectMapper();
}
