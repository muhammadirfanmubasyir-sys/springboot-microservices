package com.irfan.microservices.inventory;

import io.opentelemetry.api.OpenTelemetry;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.InitializingBean;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory InstallOpenTelemetryAppender Unit Tests")
class InstallOpenTelemetryAppenderTest {

    @Mock
    private OpenTelemetry openTelemetry;

    @InjectMocks
    private InstallOpenTelemetryAppender appender;

    @Test
    @DisplayName("Should implement InitializingBean")
    void testImplementsInitializingBean() {
        assertTrue(appender instanceof InitializingBean);
    }

    @Test
    @DisplayName("Should call afterPropertiesSet without error")
    void testAfterPropertiesSet() {
        assertDoesNotThrow(() -> appender.afterPropertiesSet());
    }

    @Test
    @DisplayName("Should store openTelemetry reference via constructor")
    void testConstructorSetsField() throws NoSuchFieldException, IllegalAccessException {
        Field field = InstallOpenTelemetryAppender.class.getDeclaredField("openTelemetry");
        field.setAccessible(true);
        Object stored = field.get(appender);
        assertNotNull(stored);
        assertEquals(openTelemetry, stored);
    }
}
